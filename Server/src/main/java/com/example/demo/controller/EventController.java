package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.EventFilterDto;
import com.example.demo.entity.Events;
import com.example.demo.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final JwtUtil jwtUtil;
    private final VercelBlobService blobService;


    public EventController(EventService eventServic,JwtUtil jwtUtil,VercelBlobService blobService) {
        this.eventService = eventService;
        this.jwtUtil = jwtUtil;
        this.blobService = blobService;
    }

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
            @RequestParam("filePdf") MultipartFile pdfFile,
            HttpServletRequest request
    ) {
        Users currentUser = getCurrentUser(request);
        
        String posterUrl;
        try {
            posterUrl = blobService.uploadToBlob(file);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                    "Failed to upload image: " + e.getMessage());
        }
        
        if (!"application/pdf".equals(pdfFile.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File must be PDF");
        }
        String pdfUrl;
        try {
            pdfUrl = blobService.uploadToBlob(pdfFile);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                    "Failed to upload PDF: " + e.getMessage());
        }
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
        dto.setFilePdf(pdfUrl);
        dto.setPoster(posterUrl);
        dto.setOrganizer_id(currentUser.getUSerID())
        Events newEvent = eventService.createEvent(dto, currentUser);
        return ResponseEntity.ok(
                ApiResponse.<Events>builder()
                        .success(true)
                        .message("Event created successfully")
                        .data(newEvent)
                        .build()
        );
    } 
}