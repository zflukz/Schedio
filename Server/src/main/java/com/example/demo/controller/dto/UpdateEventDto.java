package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_EventCategory;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateEventDto {
    
    @Size(max = 500, message = "Title cannot exceed 500 characters")
    private String title;
    
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;
    
    private Instant startsAt;
    
    private Instant endsAt;
    
    @Min(value = 0, message = "Capacity must be at least 0")
    private Integer capacity;
    
    @Size(max = 500, message = "Location cannot exceed 500 characters")
    private String location;
    
    private Boolean walkIn;
    
    @Min(value = 0, message = "Activity hours must be at least 0")
    private Integer activityHour;
    
    private Set<E_EventCategory> categories;
    
    @Size(max = 100, message = "Event organizer name cannot exceed 100 characters")
    private String eventBy;
    
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Contact email cannot exceed 100 characters")
    private String eventContactEmail;
    
    @Size(max = 20, message = "Contact phone cannot exceed 20 characters")
    private String eventContactPhone;
    
    private String poster;
    
    private String filePdf;
}
