package com.example.demo.api;

import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
class TestUserFactory {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    TestUserFactory(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    void clearAll() {
        userRepository.deleteAll();
    }

    Users createUser(String username, String password, String email, E_Role role) {
        Users user = new Users(username, passwordEncoder.encode(password), email);
        user.setUserRole(role);
        return userRepository.save(user);
    }

    String tokenFor(Users user) {
        return jwtUtil.generateToken(user.getUserName());
    }
}
