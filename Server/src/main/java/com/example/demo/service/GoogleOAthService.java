package com.example.demo.service;

import com.example.demo.config.GoogleOAuthProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;
import java.net.URLEncoder;

@Service
public class GoogleOAuthService {

    private static final String AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
    private static final String TOKENINFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo";

    private static final List<String> VALID_ISS = List.of(
            "https://accounts.google.com",
            "accounts.google.com"
    );

    private final GoogleOAuthProperties props;
    private final ObjectMapper om;
    private final HttpClient http;

    public GoogleOAuthService(GoogleOAuthProperties props, ObjectMapper om) {
        this.props = props;
        this.om = om;
        this.http = HttpClient.newHttpClient();
    }

    public String buildAuthUrl(String state) {
        String scope = String.join(" ", props.getScopes());
        StringBuilder sb = new StringBuilder(AUTH_ENDPOINT);
        sb.append("?client_id=").append(url(props.getClientId()));
        sb.append("&redirect_uri=").append(url(props.getRedirectUri()));
        sb.append("&response_type=code");
        sb.append("&scope=").append(url(scope));
        sb.append("&state=").append(url(state));
        sb.append("&access_type=offline");
        sb.append("&include_granted_scopes=true");
        // ถ้าอยากใช้ prompt=consent ทุกครั้ง:
        // sb.append("&prompt=consent");
        return sb.toString();
    }

    public TokenResponse exchangeCodeForTokens(String code) throws Exception {
        String form = form(Map.of(
                "code", code,
                "client_id", props.getClientId(),
                "client_secret", props.getClientSecret(),
                "redirect_uri", props.getRedirectUri(),
                "grant_type", "authorization_code"
        ));

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(TOKEN_ENDPOINT))
                .header("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .POST(HttpRequest.BodyPublishers.ofString(form))
                .build();

        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() != 200) {
            throw new RuntimeException("Token exchange failed: " + res.statusCode() + " " + res.body());
        }
        JsonNode json = om.readTree(res.body());
        TokenResponse tr = new TokenResponse();
        tr.accessToken = str(json, "access_token");
        tr.refreshToken = str(json, "refresh_token");
        tr.idToken = str(json, "id_token");
        tr.expiresIn = json.has("expires_in") ? json.get("expires_in").asLong() : null;
        tr.scope = str(json, "scope");
        tr.tokenType = str(json, "token_type");
        return tr;
    }

    /** ตรวจสอบ id_token ผ่าน tokeninfo และเช็ก aud/iss/exp */
    public VerifiedIdToken verifyIdTokenViaTokenInfo(String idToken) throws Exception {
        String url = TOKENINFO_ENDPOINT + "?id_token=" + url(idToken);
        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();
        HttpResponse<String> res = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (res.statusCode() != 200) {
            throw new RuntimeException("tokeninfo failed: " + res.statusCode() + " " + res.body());
        }

        JsonNode node = om.readTree(res.body());

        String aud = str(node, "aud");
        String iss = str(node, "iss");
        long exp = node.has("exp") ? node.get("exp").asLong() : 0L;

        if (!props.getClientId().equals(aud)) {
            throw new RuntimeException("Invalid aud: " + aud);
        }
        if (!VALID_ISS.contains(iss)) {
            throw new RuntimeException("Invalid iss: " + iss);
        }
        if (Instant.now().getEpochSecond() >= exp) {
            throw new RuntimeException("Token expired at: " + exp);
        }

        VerifiedIdToken v = new VerifiedIdToken();
        v.issuer = iss;
        v.audience = aud;
        v.expiresAtEpochSec = exp;
        v.subject = str(node, "sub");
        v.email = str(node, "email");
        v.emailVerified = "true".equalsIgnoreCase(str(node, "email_verified")) || node.path("email_verified").asBoolean(false);
        v.name = str(node, "name");       // อาจว่าง ถ้า scope/consent ไม่อนุญาต
        v.picture = str(node, "picture"); // อาจว่าง
        return v;
    }

    private static String form(Map<String, String> kv) {
        StringJoiner sj = new StringJoiner("&");
        kv.forEach((k, v) -> sj.add(url(k) + "=" + url(v)));
        return sj.toString();
    }

    private static String url(String s) {
        try {
            return URLEncoder.encode(s, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static String str(JsonNode n, String field) {
        return n.has(field) && !n.get(field).isNull() ? n.get(field).asText() : null;
    }

    /** DTOs */
    public static class TokenResponse {
        public String accessToken;
        public String refreshToken;
        public String idToken;
        public Long expiresIn;
        public String scope;
        public String tokenType;
    }

    public static class VerifiedIdToken {
        public String issuer;
        public String audience;
        public long expiresAtEpochSec;
        public String subject; // Google user id
        public String email;
        public boolean emailVerified;
        public String name;
        public String picture;
    }
}
