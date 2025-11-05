package com.example.demo.handler;

import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtIssuer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class SecurityHandlers {

    private final JwtIssuer jwtIssuer;
    private final UserRepository userRepository;

    /** เปลี่ยนเป็นโดเมน Frontend ของคุณได้ผ่าน application.yml */
    @Value("${app.frontend.home-url:http://localhost:3000/home}")
    private String frontendHomeUrl;

    /** 401 JSON สำหรับ API */
    @Bean
    public AuthenticationEntryPoint apiEntryPoint() {
        return new ApiEntryPoint();
    }

    /** 403 JSON สำหรับ API */
    @Bean
    public AccessDeniedHandler apiDeniedHandler() {
        return new ApiDeniedHandler();
    }

    /** OAuth2 success → ออก JWT แล้ว redirect กลับ FE */
    @Bean
    public AuthenticationSuccessHandler oauth2SuccessHandler() {
        return new OAuth2SuccessHandler(jwtIssuer, userRepository, frontendHomeUrl);
    }

    /** OAuth2 failure → ส่ง JSON กลับ */
    @Bean
    public AuthenticationFailureHandler oauth2FailureHandler() {
        return new OAuth2FailureHandler();
    }

    /* ----------------------- concrete handlers ----------------------- */

    /** 401: Unauthorized (API) */
    static final class ApiEntryPoint implements AuthenticationEntryPoint {
        @Override
        public void commence(HttpServletRequest req, HttpServletResponse resp, AuthenticationException ex) throws IOException {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\":\"unauthorized\",\"message\":\"Bearer token required\"}");
        }
    }

    /** 403: Forbidden (API) */
    static final class ApiDeniedHandler implements AccessDeniedHandler {
        @Override
        public void handle(HttpServletRequest req, HttpServletResponse resp, AccessDeniedException ex) throws IOException {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\":\"forbidden\"}");
        }
    }

    /**
     * OAuth2 Success:
     *  - ดึง email จาก Google
     *  - ออก JWT
     *  - Redirect กลับ FE พร้อมแนบ token ใน query (ง่ายสุดสำหรับแยกโดเมน)
     *
     * ถ้าต้องการส่งเป็น Cookie HttpOnly แทน ดูคอมเมนต์ด้านล่าง
     */
    static final class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
        private final JwtIssuer jwtIssuer;
        private final UserRepository userRepository;
        private final String frontendHomeUrl;

        OAuth2SuccessHandler(JwtIssuer jwtIssuer, UserRepository userRepository, String frontendHomeUrl) {
            this.jwtIssuer = jwtIssuer;
            this.userRepository = userRepository;
            this.frontendHomeUrl = frontendHomeUrl;
        }

        @Override
        public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse resp, Authentication auth) throws IOException {
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
            
            String jwt = jwtIssuer.issue(user.getUserName());
            System.out.println("Generated JWT: " + jwt.substring(0, Math.min(50, jwt.length())));

            // Redirect to callback instead of home
            String redirect = "http://localhost:3000/oauth2/callback?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8);
            System.out.println("Redirecting to: " + redirect);
            resp.sendRedirect(redirect);

            /* -------- วิธี B: ใช้ Cookie HttpOnly (ปลอดภัยกว่า) --------
            javax.servlet.http.Cookie cookie = new javax.servlet.http.Cookie("access_token", jwt);
            cookie.setHttpOnly(true);
            // ถ้า cross-site ต้อง SameSite=None และ https เท่านั้น
            cookie.setPath("/");
            // cookie.setSecure(true); // เปิดเมื่อเป็น https จริง
            cookie.setMaxAge(3600);
            // ตั้ง SameSite=None (Servlet มาตรฐานยังไม่มี setter ตรง ๆ)
            cookie.setAttribute("SameSite", "None");
            resp.addCookie(cookie);
            resp.sendRedirect(frontendHomeUrl);
            ------------------------------------------------------------ */
        }
    }

    /** OAuth2 Failure: 401 JSON */
    static final class OAuth2FailureHandler implements AuthenticationFailureHandler {
        @Override
        public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse resp, AuthenticationException ex) throws IOException {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.setContentType("application/json");
            String msg = ex.getMessage() == null ? "oauth2_failed" : ex.getMessage().replace("\"","\\\"");
            resp.getWriter().write("{\"success\":false,\"error\":\"oauth2_failed\",\"message\":\"" + msg + "\"}");
        }
    }
}
