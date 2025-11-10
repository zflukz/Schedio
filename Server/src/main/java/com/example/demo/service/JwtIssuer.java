package com.example.demo.service;

import com.example.demo.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtIssuer {

    private final JwtUtil jwtUtil;

    /** ออก JWT จาก username/email ตรง ๆ */
    public String issue(String usernameOrEmail) {
        return jwtUtil.generateToken(usernameOrEmail);
    }

    /** ออก JWT จาก UserDetails (เช่น หลังตรวจรหัสผ่านสำเร็จ) */
    public String issue(UserDetails userDetails) {
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}
