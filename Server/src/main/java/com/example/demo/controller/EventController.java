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

    public EventController(EventService eventService) {
        this.eventService = eventService;
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
}