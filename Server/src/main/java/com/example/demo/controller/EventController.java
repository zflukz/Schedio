package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.controller.dto.UpdateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.interfaces.IEventService;
//import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/events")
public class EventController {
    
    private final IEventService _eventService;
    private final UserRepository  _userRepository;
    private final JwtUtil  _jwtUtil;


    public EventController(IEventService eventService, UserRepository _userRepository, JwtUtil  _jwtUtil) {
        this._eventService = eventService;
        this._userRepository = _userRepository;
        this._jwtUtil = _jwtUtil;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<ApiResponse<List<Events>>> getAll() {
        List<Events> events = _eventService.getAll();
        return ResponseEntity.ok(
                ApiResponse.<List<Events>>builder()
                        .success(true)
                        .message("Fetch events success")
                        .data(events)
                        .build()
        );
    }

    // Creating Event ONLY Organizer
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Events>> createEvent(
            @Valid @RequestBody CreateEventDto dto,
            HttpServletRequest request
    ) {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization Header");
        }

        String token = authHeader.substring(7);
        String username = _jwtUtil.getUsernameFromToken(token);

        Users currentUser = _userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        Events newEvent = _eventService.createEvent(dto, currentUser);

        return ResponseEntity.ok(
                ApiResponse.<Events>builder()
                        .success(true)
                        .message("Event created successfully")
                        .data(newEvent)
                        .build()
        );
    }

    // Edit & Updating ONLY Admin
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Events>> updateEvent(
            HttpServletRequest request,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEventDto dto
    ) {
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
        }

        String token = header.substring(7);
        String username = _jwtUtil.getUsernameFromToken(token);

        Users currentUser = _userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        Events updatedEvent = _eventService.updateEventByID(id, dto, currentUser);

        return ResponseEntity.ok(
                ApiResponse.<Events>builder()
                        .success(true)
                        .message("Event updated successfully")
                        .data(updatedEvent)
                        .build()
        );
    }
}
