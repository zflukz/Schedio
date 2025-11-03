package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.entity.Events;
import com.example.demo.interfaces.IEventService;
import com.example.demo.repository.EventRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {
    
    private final IEventService _eventService;
    private final EventRepository _eventRepository;

    public EventController(IEventService eventService, EventRepository eventRepository) {
        this._eventService = eventService;
        this._eventRepository = eventRepository;
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

        

}
