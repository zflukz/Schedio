package com.example.demo.config;


import com.example.demo.interceptor.Authinterceptor;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer
{

    private final Authinterceptor authinterceptor;

    public WebConfig(Authinterceptor authinterceptor){
        this.authinterceptor = authinterceptor;
    }

    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry){
        registry.addInterceptor(authinterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/login", "/register", "/forgot-password", "/reset-password", "/api/events/filter", "/api/events/**", "/api/auth/**", "/api/public/**", "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**");
    }


}
