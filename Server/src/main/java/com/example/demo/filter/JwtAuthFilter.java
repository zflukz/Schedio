package com.example.demo.filter;

import com.example.demo.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsService uds) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = uds;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        String method = request.getMethod();
        return HttpMethod.OPTIONS.matches(method) ||
               path.equals("/login") ||
               path.equals("/register") ||
               (path.equals("/api/events/filter") && HttpMethod.POST.matches(method)) ||
               (path.startsWith("/api/events/") && HttpMethod.GET.matches(method)) ||
               path.startsWith("/api/public/") ||
               path.startsWith("/api/auth/") ||
               path.startsWith("/swagger-ui") ||
               path.startsWith("/v3/api-docs");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String auth = req.getHeader("Authorization");

        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);
            try {
                String username = jwtUtil.getUsernameFromToken(token); // แนะนำให้ = email
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails ud = userDetailsService.loadUserByUsername(username);
                    if (jwtUtil.validateToken(token, ud)) {
                        UsernamePasswordAuthenticationToken at =
                                new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities());
                        at.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                        SecurityContextHolder.getContext().setAuthentication(at);
                    }

                }
            } catch (ExpiredJwtException e) {
                // token หมดอายุ ปล่อยไปให้ entry point จัดการเป็น 401
                SecurityContextHolder.clearContext();
            } catch (JwtException | IllegalArgumentException e) {
                // token ไม่ถูกต้อง
                SecurityContextHolder.clearContext();
            }
        }

        chain.doFilter(req, res);
    }
}
