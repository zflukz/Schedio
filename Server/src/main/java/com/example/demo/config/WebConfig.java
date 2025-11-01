package com.example.demo.config;


import com.example.demo.interceptor.Authinterceptor;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private final Authinterceptor authInterceptor;

    public WebConfig(Authinterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .addPathPatterns("/api/**", "/admin/**", "/organizer/**") // ต้องมี JWT
                .excludePathPatterns(
                        "/auth/login",                 // login แบบรหัสผ่าน
                        "/auth/register",
                        "/oauth2/**", "/login/oauth2/**", // เส้นทางของ Google OAuth2
                        "/error", "/actuator/**",
                        "/swagger-ui/**", "/v3/api-docs/**",
                        "/public/**", "/health"
                );
    }
}

