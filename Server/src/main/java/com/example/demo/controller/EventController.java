package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.controller.dto.EventFilterDto;
import com.example.demo.controller.dto.EventResponseDto;
import com.example.demo.controller.dto.UpdateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EventService;
import jakarta.validation.Valid;
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
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final UserRepository userRepository;

    public EventController(EventService eventService, UserRepository userRepository) {
        this.eventService = eventService;
        this.userRepository = userRepository;
    }

    // =============== CREATE EVENT ===============
    @PostMapping("/create")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EventResponseDto>> createEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateEventDto dto) {
        try {
            Users user = userRepository.findByUserName(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

            EventResponseDto event = eventService.createEvent(dto, user.getUserID());
            
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    ApiResponse.<EventResponseDto>builder()
                            .success(true)
                            .message("Event created successfully. Pending approval.")
                            .data(event)
                            .build()
            );
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    ApiResponse.<EventResponseDto>builder()
                            .success(false)
                            .message(e.getReason())
                            .data(null)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.<EventResponseDto>builder()
                            .success(false)
                            .message(e.getMessage())
                            .data(null)
                            .build()
            );
        }
    }

    // =============== GET EVENT BY ID ===============
    @GetMapping("/{eventId}")
    public ResponseEntity<ApiResponse<EventResponseDto>> getEventById(@PathVariable UUID eventId) {
        try {
            EventResponseDto event = eventService.getEventById(eventId);
            return ResponseEntity.ok(
                    ApiResponse.<EventResponseDto>builder()
                            .success(true)
                            .message("Event retrieved successfully")
                            .data(event)
                            .build()
            );
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    ApiResponse.<EventResponseDto>builder()
                            .success(false)
                            .message(e.getReason())
                            .data(null)
                            .build()
            );
        }
    }

    // =============== GET MY EVENTS ===============
    @GetMapping("/my-events")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> getMyEvents(
            @AuthenticationPrincipal UserDetails userDetails) {
        Users user = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

        List<EventResponseDto> events = eventService.getMyEvents(user.getUserID());
        return ResponseEntity.ok(
                ApiResponse.<List<EventResponseDto>>builder()
                        .success(true)
                        .message("Your events retrieved successfully")
                        .data(events)
                        .build()
        );
    }

    // =============== GET APPROVED EVENTS ===============
    @GetMapping("/approved")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> getApprovedEvents() {
        List<EventResponseDto> events = eventService.getApprovedEvents();
        return ResponseEntity.ok(
                ApiResponse.<List<EventResponseDto>>builder()
                        .success(true)
                        .message("Approved events retrieved successfully")
                        .data(events)
                        .build()
        );
    }

    // =============== FILTER EVENTS (PUBLIC) ===============
    @PostMapping("/filter")
    public ResponseEntity<ApiResponse<List<Events>>> filterEvents(@RequestBody EventFilterDto filter) {
        List<Events> events = eventService.getFilteredEvents(
                filter.getSearch(),
                filter.getCategory(),
                filter.getStartDate(),
                filter.getEndDate()
        );

        return ResponseEntity.ok(
                ApiResponse.<List<Events>>builder()
                        .success(true)
                        .message("Filtered events retrieved successfully")
                        .data(events)
                        .build()
        );
    }

    // =============== UPDATE EVENT ===============
    @PutMapping("/update/{eventId}")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EventResponseDto>> updateEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody UpdateEventDto dto) {
        try {
            Users user = userRepository.findByUserName(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

            EventResponseDto event = eventService.updateEvent(eventId, dto, user.getUserID(), user.getUserRole());
            
            return ResponseEntity.ok(
                    ApiResponse.<EventResponseDto>builder()
                            .success(true)
                            .message("Event updated successfully")
                            .data(event)
                            .build()
            );
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    ApiResponse.<EventResponseDto>builder()
                            .success(false)
                            .message(e.getReason())
                            .data(null)
                            .build()
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.<EventResponseDto>builder()
                            .success(false)
                            .message(e.getMessage())
                            .data(null)
                            .build()
            );
        }
    }

    // =============== CANCEL EVENT ===============
    @PostMapping("/cancel/{eventId}")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> cancelEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        try {
            Users user = userRepository.findByUserName(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

            eventService.cancelEvent(eventId, user.getUserID(), user.getUserRole());
            
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .success(true)
                            .message("Event cancelled successfully")
                            .data(null)
                            .build()
            );
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    ApiResponse.<Void>builder()
                            .success(false)
                            .message(e.getReason())
                            .data(null)
                            .build()
            );
        }
    }

    // =============== DELETE EVENT ===============
    @DeleteMapping("/{eventId}")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId) {
        try {
            Users user = userRepository.findByUserName(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

            eventService.deleteEvent(eventId, user.getUserID(), user.getUserRole());
            
            return ResponseEntity.ok(
                    ApiResponse.<Void>builder()
                            .success(true)
                            .message("Event deleted successfully")
                            .data(null)
                            .build()
            );
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    ApiResponse.<Void>builder()
                            .success(false)
                            .message(e.getReason())
                            .data(null)
                            .build()
            );
        }
    }
}