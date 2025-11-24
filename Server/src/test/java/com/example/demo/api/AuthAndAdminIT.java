package com.example.demo.api;

import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.service.VercelBlobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
class AuthAndAdminIT {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TestUserFactory users;

    @Autowired
    private com.example.demo.repository.EventRegisterRepository eventRegisterRepository;

    @Autowired
    private com.example.demo.repository.ApprovalRepository approvalRepository;

    @Autowired
    private com.example.demo.repository.EventRepository eventRepository;

    @Autowired
    private com.example.demo.repository.UserRepository userRepository;

    @MockBean
    private VercelBlobService blobService;

    @BeforeEach
    void cleanUsers() {
        eventRegisterRepository.deleteAll();
        approvalRepository.deleteAll();
        eventRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void loginAndProfileHappyPath() {
        Users attendee = users.createUser("alice", "password", "alice@example.com", E_Role.ATTENDEE);

        Map<String, String> loginBody = Map.of(
                "usernameOrEmail", attendee.getUserName(),
                "userPassword", "password"
        );
        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(
                url("/login"), loginBody, Map.class);

        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        assertNotNull(loginResponse.getBody());
        String token = (String) loginResponse.getBody().get("token");
        assertNotNull(token);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        ResponseEntity<Map> profileResponse = restTemplate.exchange(
                url("/api/profile"), HttpMethod.GET, new HttpEntity<>(headers), Map.class);

        assertEquals(HttpStatus.OK, profileResponse.getStatusCode());
        assertNotNull(profileResponse.getBody());
        assertEquals(attendee.getUserName(), profileResponse.getBody().get("userName"));
        assertEquals(attendee.getUserEmail(), profileResponse.getBody().get("userEmail"));
    }

    @Test
    void organizerCannotAccessAdminEndpoints() {
        Users organizer = users.createUser("org", "password", "org@example.com", E_Role.ORGANIZER);
        String token = users.tokenFor(organizer);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        ResponseEntity<String> response = restTemplate.exchange(
                url("/api/admin/getAll"), HttpMethod.GET, new HttpEntity<>(headers), String.class);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void adminCanAccessAdminEndpoints() {
        Users admin = users.createUser("boss", "password", "boss@example.com", E_Role.ADMIN);
        String token = users.tokenFor(admin);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        ResponseEntity<Map> response = restTemplate.exchange(
                url("/api/admin/getAll"), HttpMethod.GET, new HttpEntity<>(headers), Map.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(true, response.getBody().get("success"));
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }
}
