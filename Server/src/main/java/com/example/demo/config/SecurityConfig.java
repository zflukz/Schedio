package com.example.demo.config;

import com.example.demo.filter.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    // ✅ ฉีดจากไฟล์ handler รวม (SecurityHandlers.java)
    private final AuthenticationEntryPoint apiEntryPoint;
    private final AccessDeniedHandler apiDeniedHandler;
    private final AuthenticationSuccessHandler oauth2SuccessHandler;
    private final AuthenticationFailureHandler oauth2FailureHandler;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter,
                          AuthenticationEntryPoint apiEntryPoint,
                          AccessDeniedHandler apiDeniedHandler,
                          AuthenticationSuccessHandler oauth2SuccessHandler,
                          AuthenticationFailureHandler oauth2FailureHandler) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.apiEntryPoint = apiEntryPoint;
        this.apiDeniedHandler = apiDeniedHandler;
        this.oauth2SuccessHandler = oauth2SuccessHandler;
        this.oauth2FailureHandler = oauth2FailureHandler;
    }

    @Bean
    @Order(1)
    SecurityFilterChain apiSecurity(HttpSecurity http) throws Exception {
        http
                // ครอบคลุมหลาย path ได้ด้วย varargs (ไม่ต้อง OrRequestMatcher/AntPathRequestMatcher)
                .securityMatcher("/api/**", "/profile/**", "/admin/**", "/organizer/**")
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(e -> e.authenticationEntryPoint(apiEntryPoint).accessDeniedHandler(apiDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/public/**",
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/login" // endpoint ที่ออก JWT
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(f -> f.disable()).httpBasic(b -> b.disable()).oauth2Login(o -> o.disable())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }



    @Bean @Order(2)
    SecurityFilterChain webSecurity(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/","/public/**","/error",
                                "/oauth2/**","/login/**",
                                "/v3/api-docs/**","/swagger-ui/**",
                                "/favicon.ico","/assets/**","/static/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(o -> o
                        .successHandler(oauth2SuccessHandler)
                        .failureHandler(oauth2FailureHandler)
                );
        return http.build();
    }
}
