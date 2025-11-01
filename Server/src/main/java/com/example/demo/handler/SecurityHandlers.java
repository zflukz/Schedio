package com.example.demo.handler;

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

@Configuration
@RequiredArgsConstructor
public class SecurityHandlers {

    private final JwtIssuer jwtIssuer;

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
        return new OAuth2SuccessHandler(jwtIssuer, frontendHomeUrl);
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
        private final String frontendHomeUrl;

        OAuth2SuccessHandler(JwtIssuer jwtIssuer, String frontendHomeUrl) {
            this.jwtIssuer = jwtIssuer;
            this.frontendHomeUrl = frontendHomeUrl;
        }

        @Override
        public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse resp, Authentication auth) throws IOException {
            OAuth2User user = (OAuth2User) auth.getPrincipal();
            String email = user.getAttribute("email");
            String jwt = jwtIssuer.issue(email);

            // --- วิธี A: redirect + query ?token=... (ง่ายสุด) ---
            String redirect = frontendHomeUrl + "?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8);
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
