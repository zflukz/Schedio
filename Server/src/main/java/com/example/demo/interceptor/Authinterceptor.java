package com.example.demo.interceptor;


import com.example.demo.utils.JwtUtil;
import com.example.demo.repository.UserRepository;
import com.example.demo.entity.Users;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class Authinterceptor implements HandlerInterceptor {

    private final JwtUtil _jwtUtil;
    private final UserRepository _userRepository;

    public Authinterceptor(JwtUtil _jwtUtil, UserRepository _userRepository){
        this._jwtUtil = _jwtUtil;
        this._userRepository = _userRepository;
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        String authHeader = request.getHeader("Authorization");
        
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized header");
        }

        String token = authHeader.substring(7);
        String username = _jwtUtil.getUsernameFromToken(token);

        if(username == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized username");
        }
        
        // Get user and check role-based access
        Users user = _userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        
        String requestPath = request.getRequestURI();
        String userRole = user.getUserRole().name();
        
        // Role-based access control
        if (requestPath.startsWith("/admin") && !"ADMIN".equals(userRole)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied: Admin role required");
        }
        
        if (requestPath.startsWith("/organizer") && !("ADMIN".equals(userRole) || "ORGANIZER".equals(userRole))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied: Organizer role required");
        }
        
        request.setAttribute("username", username);
        return true;
    }




}
