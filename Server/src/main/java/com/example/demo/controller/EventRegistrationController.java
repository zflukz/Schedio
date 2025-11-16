package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.EventRegistrationDto;
import com.example.demo.controller.dto.EventRegistrationResponseDto;
import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EventRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
public class EventRegistrationController {

    private final EventRegistrationService registrationService;
    private final UserRepository userRepository;

    @PostMapping("/register/{eventId}")
    public ResponseEntity<ApiResponse<EventRegistrationResponseDto>> registerForEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        try {
                Users user = userRepository.findByUserName(userDetails.getUsername())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
                
                EventRegistrationResponseDto registration = registrationService.registerForEvent(user.getUserID(), eventId);
                return ResponseEntity.ok(
                        ApiResponse.<EventRegistrationResponseDto>builder()
                                .success(true)
                                .message("Successfully registered for event")
                                .data(registration)
                                .build()
                );
        } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(
                        ApiResponse.<EventRegistrationResponseDto>builder()
                                .success(false)
                                .message(e.getMessage())
                                .data(null)
                                .build()
                );
        }
        }


    @DeleteMapping("/unregister/{eventId}")
    public ResponseEntity<ApiResponse<Void>> unregisterFromEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        try {
            Users user = userRepository.findByUserName(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
            
            registrationService.unregisterFromEvent(user.getUserID(), eventId);
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .success(true)
                            .message("Successfully unregistered from event")
                            .data(null)
                            .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.<Void>builder()
                            .success(false)
                            .message(e.getMessage())
                            .data(null)
                            .build()
            );
        }
    }

    @GetMapping("/my-registrations")
    public ResponseEntity<ApiResponse<List<EventRegistrationResponseDto>>> getMyRegistrations(
            @AuthenticationPrincipal UserDetails userDetails) {
        Users user = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
        
        List<EventRegistrationResponseDto> registrations = registrationService.getUserRegistrations(user.getUserID());
        return ResponseEntity.ok(
                ApiResponse.<List<EventRegistrationResponseDto>>builder()
                        .success(true)
                        .message("User registrations retrieved successfully")
                        .data(registrations)
                        .build()
        );
    }

    @GetMapping("/event/{eventId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ORGANIZER')")
    public ResponseEntity<ApiResponse<List<EventRegistrationResponseDto>>> getEventRegistrations(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        Users user = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
        
        if (!registrationService.canViewEventRegistrations(user.getUserID(), eventId, user.getUserRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    ApiResponse.<List<EventRegistrationResponseDto>>builder()
                            .success(false)
                            .message("Access denied")
                            .data(null)
                            .build()
            );
        }
        
        List<EventRegistrationResponseDto> registrations = registrationService.getEventRegistrations(eventId);
        return ResponseEntity.ok(
                ApiResponse.<List<EventRegistrationResponseDto>>builder()
                        .success(true)
                        .message("Event registrations retrieved successfully")
                        .data(registrations)
                        .build()
        );
    }
}
