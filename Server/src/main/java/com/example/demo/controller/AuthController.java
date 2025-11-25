package com.example.demo.controller;



import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.LoginRequestDto;
import com.example.demo.controller.dto.LoginResponseDto;
import com.example.demo.controller.dto.RegisterRequestDto;
import com.example.demo.controller.dto.UserResponseDto;
import com.example.demo.controller.dto.ForgotPasswordDto;
import com.example.demo.controller.dto.ResetPasswordDto;
import com.example.demo.service.EmailService;
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
import java.time.LocalDateTime;
import java.util.UUID;


@RestController
public class AuthController {

    private final UserRepository _userRepository;
    private final PasswordEncoder _passwordEncoder;
    private final JwtUtil _jwtUtil;
    private final EmailService _emailService;

    AuthController(UserRepository _userRepository, PasswordEncoder _passwordEncoder, JwtUtil _jwtUtil, EmailService _emailService){
        this._userRepository = _userRepository;
        this._passwordEncoder = _passwordEncoder;
        this._jwtUtil = _jwtUtil;
        this._emailService = _emailService;
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
        user.setUserRole(com.example.demo.entity.enums.E_Role.ATTENDEE);
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

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordDto dto) {
        Users user = _userRepository.findByUserEmail(dto.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found"));

        String resetToken = UUID.randomUUID().toString();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        _userRepository.save(user);

        try {
            _emailService.sendPasswordResetEmail(user.getUserEmail(), resetToken);
            return ResponseEntity.ok(
                    ApiResponse.<String>builder()
                            .success(true)
                            .message("Password reset email sent successfully")
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    ApiResponse.<String>builder()
                            .success(false)
                            .message("Failed to send email")
                            .build()
            );
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordDto dto) {
        Users user = _userRepository.findByResetToken(dto.getToken())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid reset token"));

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reset token has expired");
        }

        user.setUserPassword(_passwordEncoder.encode(dto.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        _userRepository.save(user);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Password reset successfully")
                        .build()
        );
    }
}
