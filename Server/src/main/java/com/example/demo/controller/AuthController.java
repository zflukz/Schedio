package com.example.demo.controller;



import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.LoginRequestDto;
import com.example.demo.controller.dto.LoginResponseDto;
import com.example.demo.controller.dto.RegisterRequestDto;
import com.example.demo.controller.dto.UserResponseDto;
import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;


import com.example.demo.utils.JwtUtil;


@RestController
public class AuthController {

    private final UserRepository _userRepository;
    private final PasswordEncoder _passwordEncoder;
    private final JwtUtil _jwtUtil;

    AuthController(UserRepository _userRepository, PasswordEncoder _passwordEncoder, JwtUtil _jwtUtil){
        this._userRepository = _userRepository;
        this._passwordEncoder = _passwordEncoder;
        this._jwtUtil = _jwtUtil;
    }



    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Users>> register(@Valid @RequestBody RegisterRequestDto dto) {

        Users existingUser = _userRepository.findByUserEmail(dto.getEmail()).orElse(null);
        if (existingUser != null) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.<Users>builder()
                            .success(false)
                            .message("Email already exists")
                            .build()
            );
        }


        Users user = new Users(dto.getUserName(), _passwordEncoder.encode(dto.getUserPassword()), dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        _userRepository.save(user);


        return ResponseEntity.ok(
                ApiResponse.<Users>builder()
                        .success(true)
                        .message("User create success")
                        .data(user)
                        .build()
        );
    }


    @PostMapping("/login")
    public LoginResponseDto login(@Valid @RequestBody LoginRequestDto dto) {
        // Try to find user by username first, then by email
        Users user = _userRepository.findByUserName(dto.getUsernameOrEmail())
                .or(() -> _userRepository.findByUserEmail(dto.getUsernameOrEmail()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or email"));
        
        if(!_passwordEncoder.matches(dto.getUserPassword(), user.getUserPassword())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }
        
        String token = _jwtUtil.generateToken(user.getUserName());
        return new LoginResponseDto(token, user.getUserEmail(), "Login success" );
    }

    @GetMapping("/api/profile")
    public UserResponseDto profile(@AuthenticationPrincipal UserDetails ud) {
        String username = ud.getUsername(); // = userName จาก token
        Users user = _userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        return new UserResponseDto(
                user.getUserID(),
                user.getUserName(),
                user.getFirstName(),
                user.getLastName(),
                user.getUserEmail(),
                user.getUserPhone(),
                user.getUserRole()
        );
    }






}
