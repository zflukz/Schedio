//package com.example.demo.config;
//
//import jakarta.validation.constraints.NotBlank;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.validation.annotation.Validated;
//
//import java.util.List;
//
//@Validated
//@ConfigurationProperties(prefix = "google.oauth")
//public class GoogleOAuthProperties {
//
//    @NotBlank
//    private String clientId;
//
//    @NotBlank
//    private String clientSecret;
//
//    @NotBlank
//    private String redirectUri;
//
//    private List<String> scopes;
//
//    public String getClientId() { return clientId; }
//    public void setClientId(String clientId) { this.clientId = clientId; }
//
//    public String getClientSecret() { return clientSecret; }
//    public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }
//
//    public String getRedirectUri() { return redirectUri; }
//    public void setRedirectUri(String redirectUri) { this.redirectUri = redirectUri; }
//
//    public List<String> getScopes() { return scopes; }
//    public void setScopes(List<String> scopes) { this.scopes = scopes; }
//}
