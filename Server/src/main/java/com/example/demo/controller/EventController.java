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
import com.example.demo.service.VercelBlobService;
import com.example.demo.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final JwtUtil jwtUtil;
    private final VercelBlobService blobService;
    private final UserRepository userRepository;

    public EventController(EventService eventService, JwtUtil jwtUtil, VercelBlobService blobService, UserRepository userRepository) {
        this.eventService = eventService;
        this.jwtUtil = jwtUtil;
        this.blobService = blobService;
        this.userRepository = userRepository;
    }

    private Users getCurrentUser(HttpServletRequest request) {
        String token = jwtUtil.getTokenFromRequest(request);
        String username = jwtUtil.getUsernameFromToken(token);
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));
    }

    // =============== CREATE EVENT ===============
    @PostMapping("/create")
    @PreAuthorize("hasRole('ORGANIZER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EventResponseDto>> createEvent(
            @RequestParam("poster") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("location") String location,
            @RequestParam("description") String description,
            @RequestParam("startsAt") String startsAt,
            @RequestParam("endsAt") String endsAt,
            @RequestParam("eventCategory") List<String> eventCategories,
            @RequestParam("walkIn") Boolean walkIn,
            @RequestParam(value = "capacity", required = false) Integer capacity,
            @RequestParam(value = "activityHour", required = false) Integer activityHour,
            @RequestParam("eventBy") String eventBy,
            @RequestParam("eventContactEmail") String eventContactEmail,
            @RequestParam("eventContactPhone") String eventContactPhone,
            @RequestParam(value = "filePdf", required = false) MultipartFile pdfFile,
            HttpServletRequest request) {
        try {
            Users currentUser = getCurrentUser(request);
            
            // Upload poster to Vercel
            String posterUrl = blobService.uploadToBlob(file);
            
            // Validate and upload PDF (optional)
            String pdfUrl = null;
            if (pdfFile != null && !pdfFile.isEmpty()) {
                if (!"application/pdf".equals(pdfFile.getContentType())) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File must be PDF");
                }
                pdfUrl = blobService.uploadToBlob(pdfFile);
            }
            
            // Create DTO
            CreateEventDto dto = new CreateEventDto();
            dto.setTitle(title);
            dto.setLocation(location);
            dto.setDescription(description);
            dto.setStartsAt(java.time.Instant.parse(startsAt));
            dto.setEndsAt(java.time.Instant.parse(endsAt));
            Set<com.example.demo.entity.enums.E_EventCategory> categories = eventCategories.stream()
                    .map(com.example.demo.entity.enums.E_EventCategory::valueOf)
                    .collect(java.util.stream.Collectors.toSet());
            dto.setCategories(categories);
            dto.setWalkIn(walkIn);
            dto.setCapacity(capacity != null && capacity > 0 ? capacity : Integer.MAX_VALUE);
            dto.setActivityHour(activityHour);
            dto.setEventBy(eventBy);
            dto.setEventContactEmail(eventContactEmail);
            dto.setEventContactPhone(eventContactPhone);
            dto.setFilePdf(pdfUrl);
            dto.setPoster(posterUrl);
            
            // Save to database
            EventResponseDto event = eventService.createEvent(dto, currentUser.getUserID());
            
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

    
    // =============== GET Upcoming EVENTS ===============
    @GetMapping("/Upcoming-event")
    public ResponseEntity<ApiResponse<List<EventResponseDto>>> upcomingEvents() {
        List<EventResponseDto> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(
                ApiResponse.<List<EventResponseDto>>builder()
                        .success(true)
                        .message("Upcoming events retrieved successfully")
                        .data(events)
                        .build()
        );
    } 

}