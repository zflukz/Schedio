package com.example.demo.interceptor;


import com.example.demo.utils.JwtUtil;

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

    public Authinterceptor(JwtUtil _jwtUtil){
        this._jwtUtil = _jwtUtil;
    }

    @Override
    public boolean preHandle(@NonNull HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer")){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized header");
        }

        String token = authHeader.substring(7);
        String pass = _jwtUtil.getUsernameFromToken(token);

        if(pass == null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized username");
        }
        request.setAttribute("username",pass);
        return true;
    }




}
