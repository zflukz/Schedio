package com.example.demo.config;

import com.example.demo.filter.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;


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
                .securityMatcher("/api/**")
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(e -> e.authenticationEntryPoint(apiEntryPoint).accessDeniedHandler(apiDeniedHandler))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/events/filter").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/events/**").permitAll()
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/public/**",
                                "/login",
                                "/register"
                        ).permitAll()
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(f -> f.disable())
                .httpBasic(b -> b.disable())
                .oauth2Login(o -> o.disable())
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
                                "/oauth2/**","/login/**","/login","/register",
                                "/v3/api-docs/**","/swagger-ui/**","/swagger-ui.html",
                                "/swagger-ui/index.html","/swagger-resources/**","/webjars/**",
                                "/favicon.ico","/assets/**","/static/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(o -> o
                        .authorizationEndpoint(a -> a.baseUri("/oauth2/authorization"))
                        .successHandler(oauth2SuccessHandler)
                        .failureHandler(oauth2FailureHandler)
                );
        return http.build();
    }
}
