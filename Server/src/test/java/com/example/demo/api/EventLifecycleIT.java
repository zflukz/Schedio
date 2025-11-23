package com.example.demo.api;

import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.repository.ApprovalRepository;
import com.example.demo.repository.EventRegisterRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.VercelBlobService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("integration")
class EventLifecycleIT {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TestUserFactory users;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Autowired
    private EventRegisterRepository eventRegisterRepository;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private VercelBlobService blobService;

    @BeforeEach
    void cleanDb() {
        eventRegisterRepository.deleteAll();
        approvalRepository.deleteAll();
        eventRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    void organizerCreatesEvent_AdminApproves_AttendeeRegisters() throws Exception {
        // Arrange users and tokens
        Users organizer = users.createUser("org1", "password", "org1@example.com", E_Role.ORGANIZER);
        Users admin = users.createUser("boss1", "password", "boss1@example.com", E_Role.ADMIN);
        Users attendee = users.createUser("att1", "password", "att1@example.com", E_Role.ATTENDEE);
        String organizerToken = users.tokenFor(organizer);
        String adminToken = users.tokenFor(admin);
        String attendeeToken = users.tokenFor(attendee);

        Mockito.when(blobService.uploadToBlob(Mockito.any())).thenReturn("https://blob.test/file");

        // Create event as organizer
        Instant start = Instant.now().plusSeconds(3600);
        Instant end = start.plusSeconds(7200);

        MultiValueMap<String, Object> form = new LinkedMultiValueMap<>();
        form.add("poster", new ByteArrayResource("img".getBytes()) {
            @Override
            public String getFilename() {
                return "poster.png";
            }
        });
        form.add("title", "Integration Event");
        form.add("location", "Room 101");
        form.add("description", "An event for IT tests");
        form.add("startsAt", start.toString());
        form.add("endsAt", end.toString());
        form.add("eventCategory", "ACADEMIC");
        form.add("walkIn", "false");
        form.add("capacity", "50");
        form.add("activityHour", "2");
        form.add("eventBy", "QA Team");
        form.add("eventContactEmail", "qa@example.com");
        form.add("eventContactPhone", "0123456789");

        HttpHeaders createHeaders = new HttpHeaders();
        createHeaders.setBearerAuth(organizerToken);
        createHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);

        ResponseEntity<Map> createResponse = restTemplate.exchange(
                url("/api/events/create"),
                HttpMethod.POST,
                new HttpEntity<>(form, createHeaders),
                Map.class
        );

        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());
        assertNotNull(createResponse.getBody());
        Map<String, Object> createdData = (Map<String, Object>) createResponse.getBody().get("data");
        assertNotNull(createdData);
        String eventId = (String) createdData.get("eventId");
        assertNotNull(eventId);

        // Approve event as admin
        HttpHeaders approveHeaders = new HttpHeaders();
        approveHeaders.setBearerAuth(adminToken);
        approveHeaders.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> approveBody = Map.of(
                "decision", "APPROVED",
                "comment", "ok"
        );
        ResponseEntity<Map> approveResponse = restTemplate.exchange(
                url("/api/approval/approve/" + eventId),
                HttpMethod.POST,
                new HttpEntity<>(approveBody, approveHeaders),
                Map.class
        );
        assertEquals(HttpStatus.OK, approveResponse.getStatusCode());

        // Approved events should include the new event
        ResponseEntity<Map> approvedList = restTemplate.getForEntity(
                url("/api/events/approved"),
                Map.class
        );
        assertEquals(HttpStatus.OK, approvedList.getStatusCode());
        List<Map<String, Object>> approvedEvents = (List<Map<String, Object>>) approvedList.getBody().get("data");
        assertTrue(approvedEvents.stream().anyMatch(e -> eventId.equals(e.get("eventId").toString())));

        // Attendee registers
        HttpHeaders regHeaders = new HttpHeaders();
        regHeaders.setBearerAuth(attendeeToken);
        ResponseEntity<Map> registerResponse = restTemplate.exchange(
                url("/api/registrations/register/" + eventId),
                HttpMethod.POST,
                new HttpEntity<>(regHeaders),
                Map.class
        );
        assertEquals(HttpStatus.OK, registerResponse.getStatusCode());
        assertEquals(true, registerResponse.getBody().get("success"));

        // My registrations contains the event
        ResponseEntity<Map> myRegs = restTemplate.exchange(
                url("/api/registrations/my-registrations"),
                HttpMethod.GET,
                new HttpEntity<>(regHeaders),
                Map.class
        );
        assertEquals(HttpStatus.OK, myRegs.getStatusCode());
        List<Map<String, Object>> regs = (List<Map<String, Object>>) myRegs.getBody().get("data");
        assertTrue(regs.stream().anyMatch(r -> eventId.equals(((Map<?, ?>) r.get("event")).get("eventId").toString())));
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }
}
