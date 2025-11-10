package com.example.demo.handler;

import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtIssuer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtIssuer jwtIssuer;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req,
                                        HttpServletResponse resp,
                                        Authentication auth) throws IOException {
        System.out.println("OAuth2 Success Handler called!");
        
        OAuth2User oAuth2User = (OAuth2User) auth.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        System.out.println("Google user - Email: " + email + ", Name: " + name);

        // Find or create user
        Optional<Users> existingUser = userRepository.findByUserEmail(email);
        Users user;
        
        if (existingUser.isPresent()) {
            user = existingUser.get();
            System.out.println("Found existing user: " + user.getUserName());
        } else {
            // Create new user from Google OAuth2
            user = new Users();
            user.setUserName(name);
            user.setUserEmail(email);
            user.setUserPassword(""); // OAuth2 users don't need password
            user.setUserRole(E_Role.ATTENDEE);
            userRepository.save(user);
            System.out.println("Created new user: " + user.getUserName());
        }

        // Issue JWT with username
        String jwt = jwtIssuer.issue(user.getUserName());
        System.out.println("Generated JWT token (first 50 chars): " + jwt.substring(0, Math.min(50, jwt.length())));

        // Redirect to frontend OAuth2 callback
        String frontendUrl = "http://localhost:3000/oauth2/callback";
        String redirectUrl = frontendUrl + "?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8);
        System.out.println("Redirecting to: " + redirectUrl);
        resp.sendRedirect(redirectUrl);
    }
}
