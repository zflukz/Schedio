package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.controller.dto.UpdateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.interfaces.IEventService;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.VercelBlobService;
import com.example.demo.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/events")
public class EventController {
    
    private final IEventService eventService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final VercelBlobService blobService;

    public EventController(IEventService eventService, UserRepository userRepository, 
                          JwtUtil jwtUtil, VercelBlobService blobService) {
        this.eventService = eventService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.blobService = blobService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Events>>> getAll() {
        List<Events> events = eventService.getAll();
        return ResponseEntity.ok(
                ApiResponse.<List<Events>>builder()
                        .success(true)
                        .message("Fetch events success")
                        .data(events)
                        .build()
        );
    }

    //Get Organizer info fore pre-filling the create event form
    @GetMapping("/create")
    public ResponseEntity<?> getCreateEventInfo(HttpServletRequest request) {
        Users currentUser = getCurrentUser(request);

        String fullName = (currentUser.getFirstName() != null ? currentUser.getFirstName() : "") +
                " " + (currentUser.getLastName() != null ? currentUser.getLastName() : "");

        Map<String, Object> response = new HashMap<>();
        response.put("organizerName", fullName.trim());
        response.put("organizerEmail", Optional.ofNullable(currentUser.getUserEmail()).orElse(""));
        response.put("organizerPhone", Optional.ofNullable(currentUser.getUserPhone()).orElse(""));

        return ResponseEntity.ok(response);
    }


    @PostMapping("/create")
    public ResponseEntity<ApiResponse<Events>> createEvent(
            @RequestParam("poster") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("startsAt") String startsAt,
            @RequestParam("endsAt") String endsAt,
            @RequestParam("eventCategory") String eventCategory,
            @RequestParam("walkIn") Boolean walkIn,
            @RequestParam(value = "capacity", required = false) Integer capacity,
            @RequestParam(value = "activityHour", required = false) Integer activityHour,
            @RequestParam(value = "eventBy") String eventBy,
            @RequestParam(value = "eventContactEmail") String eventContactEmail,
            @RequestParam(value = "eventContactPhone") String eventContactPhone,
            @RequestParam(value = "filePdf") String filePdf,
            HttpServletRequest request
    ) {
        Users currentUser = getCurrentUser(request);
        
        CreateEventDto dto = new CreateEventDto();
        dto.setTitle(title);
        dto.setLocation(location);
        dto.setDescription(description);
        dto.setStartsAt(java.time.Instant.parse(startsAt));
        dto.setEndsAt(java.time.Instant.parse(endsAt));
        dto.setEventCategory(com.example.demo.entity.enums.E_EventCategory.valueOf(eventCategory));
        dto.setWalkIn(walkIn);
        dto.setCapacity(capacity);
        dto.setActivityHour(activityHour);
        dto.setEventBy(eventBy);
        dto.setEventContactEmail(eventContactEmail);
        dto.setEventContactPhone(eventContactPhone);
        dto.setFilePdf(filePdf);
        
        Events newEvent = eventService.createEvent(dto, currentUser);
        String poster = uploadEventImage(newEvent, file);
        if (poster != null) {
            dto.setPoster(poster);
        }
        else return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(
                ApiResponse.<Events>builder()
                        .success(true)
                        .message("Event created successfully")
                        .data(newEvent)
                        .build()
        );
    }
    
    @PostMapping("/create-json")
    public ResponseEntity<ApiResponse<Events>> createEventJson(
            @Valid @RequestBody CreateEventDto dto,
            HttpServletRequest request
    ) {
        Users currentUser = getCurrentUser(request);
        Events newEvent = eventService.createEvent(dto, currentUser);
        return ResponseEntity.ok(
                ApiResponse.<Events>builder()
                        .success(true)
                        .message("Event created successfully")
                        .data(newEvent)
                        .build()
        );
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Events>> updateEvent(
            HttpServletRequest request,
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEventDto dto
    ) {
        Users currentUser = getCurrentUser(request);
        Events updatedEvent = eventService.updateEventByID(id, dto, currentUser);

        return ResponseEntity.ok(
                ApiResponse.<Events>builder()
                        .success(true)
                        .message("Event updated successfully")
                        .data(updatedEvent)
                        .build()
        );
    }

    private String uploadEventImage(Events event, MultipartFile file) {
        try {
            String imageUrl = blobService.uploadToBlob(file);
            event.setPoster(imageUrl);
            return imageUrl;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                    "Failed to upload image: " + e.getMessage());
        }
    }

    private Users getCurrentUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String username = jwtUtil.getUsernameFromToken(token);

        return userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }
}
