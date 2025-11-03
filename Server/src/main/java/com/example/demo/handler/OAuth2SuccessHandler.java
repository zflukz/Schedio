package com.example.demo.handler;

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

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtIssuer jwtIssuer;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest req,
                                        HttpServletResponse resp,
                                        Authentication auth) throws IOException {
        OAuth2User user = (OAuth2User) auth.getPrincipal();
        String email = user.getAttribute("email");

        // ออก JWT
        String jwt = jwtIssuer.issue(email);

        // URL ของ frontend หลังล็อกอินเสร็จ
        String frontendUrl = "http://localhost:3000"; // 👉 เปลี่ยนเป็น domain จริงของคุณ

        // redirect พร้อมแนบ token ไปกับ query string
        String redirectUrl = frontendUrl + "?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8);
        resp.sendRedirect(redirectUrl);
    }
}
