//package com.example.demo.handler;
//
//import com.example.demo.service.JwtIssuer;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//
//@Component
//@RequiredArgsConstructor
//public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
//
//    private final JwtIssuer jwtIssuer;
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest req,
//                                        HttpServletResponse resp,
//                                        Authentication auth) throws IOException {
//        OAuth2User user = (OAuth2User) auth.getPrincipal();
//        String email = user.getAttribute("email");
//
//        // ออก JWT
//        String jwt = jwtIssuer.issue(email);
//
//        // URL ของ frontend หลังล็อกอินเสร็จ
//        String frontendUrl = "http://localhost:3000"; // 👉 เปลี่ยนเป็น domain จริงของคุณ
//
//        // redirect พร้อมแนบ token ไปกับ query string
//        String redirectUrl = frontendUrl + "?token=" + URLEncoder.encode(jwt, StandardCharsets.UTF_8);
//        resp.sendRedirect(redirectUrl);
//    }
//}

package com.example.demo.security;

import com.example.demo.entity.Users;
import com.example.demo.service.GoogleUserService;
import com.example.demo.utils.JwtUtil;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final OAuth2AuthorizedClientService clientService; // ใช้เฉพาะถ้าต้องการ access token
    private final GoogleUserService googleUserService;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // 1) เอา OIDC principal
        OidcUser oidc = (OidcUser) authentication.getPrincipal();

        // 2) upsert ผู้ใช้ใน DB ของเรา → ได้ Users entity แน่นอน
        Users user = googleUserService.upsertFromGoogle(oidc);

        // 3) ออก JWT (กัน email null ด้วย)
        Map<String, Object> claims = new HashMap<>();
        claims.put("uid", user.getUserID().toString());
        claims.put("role", user.getUserRole().name());
        claims.put("email", user.getUserEmail());

        // subject ใช้ email ถ้ามี ไม่งั้น fallback เป็น userID
        String subject = Optional.ofNullable(user.getUserEmail())
                .orElse(user.getUserID().toString());

        String appJwt = jwtUtil.generate(claims, subject);

        // 4) ตั้งคุกกี้แบบปลอดภัย (แนะนำใช้คุกกี้แทน query param)
//        Cookie cookie = new Cookie("app_token", appJwt);
//        cookie.setHttpOnly(true);
//        cookie.setPath("/");

        // ถ้า production/HTTPS ควรเปิด:
        // cookie.setSecure(true);

        // ถ้า FE คนละโดเมน/พอร์ต และต้องการส่งคุกกี้ข้ามไซต์ ให้ตั้ง SameSite=None ผ่าน header
        // (Servlet Cookie ไม่มี API ตั้ง SameSite; ใช้ header แทนได้ด้านล่าง)
//        response.addCookie(cookie);

        // ถ้าคุณต้องการ SameSite=None จริง ๆ (เช่น FE = http://localhost:3000), ให้ส่ง Set-Cookie เอง:
        // String setCookie = "app_token=" + appJwt + "; Path=/; HttpOnly; SameSite=None"; // + "; Secure" เมื่อเป็น HTTPS
        // response.addHeader("Set-Cookie", setCookie);

        // 5) (ไม่จำเป็น) ถ้าจะใช้ access token ของ Google ไปเรียก API อื่นต่อ
        // OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        // OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
        //        oauthToken.getAuthorizedClientRegistrationId(),
        //        oauthToken.getName()
        // );
        // String googleAccessToken = client.getAccessToken().getTokenValue();

        // 6) Redirect ไปหน้า FE (ไม่แนบ ?token ป้องกันหลุดในประวัติ/Log)
        // แก้ให้ตรงกับ FE ของคุณจริง ๆ
        response.sendRedirect("http://localhost:3000/");
    }
}

