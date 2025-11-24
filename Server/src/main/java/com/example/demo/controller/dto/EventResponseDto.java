package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_EventCategory;
import lombok.*;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventResponseDto {
    
    private UUID eventId;
    private String title;
    private String description;
    private Instant startsAt;
    private Instant endsAt;
    private Integer capacity;
    private String location;
    private Boolean walkIn;
    private Integer activityHour;
    private Set<E_EventCategory> categories;
    private String eventBy;
    private String eventContactEmail;
    private String eventContactPhone;
    private String poster;
    private String filePdf;
    
    // Organizer info
    private UUID organizerId;
    private String organizerName;
    private String organizerEmail;
    
    // Metadata
    private Instant createdAt;
    private Instant updatedAt;
    private Boolean editRequested;
    private Boolean isDeleted;
    private Boolean isCancelled;
    
    // Registration info
    private Integer registeredCount;
    private Integer availableSlots;
}
