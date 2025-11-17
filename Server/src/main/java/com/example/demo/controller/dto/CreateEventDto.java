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
public class CreateEventDto {
    
    @NotBlank(message = "Title is required")
    @Size(max = 500, message = "Title cannot exceed 500 characters")
    private String title;
    
    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;
    
    @NotNull(message = "Start time is required")
    private Instant startsAt;
    
    @NotNull(message = "End time is required")
    private Instant endsAt;
    
    @Min(value = 0, message = "Capacity must be at least 0")
    private Integer capacity; // 0 or null = unlimited
    
    @NotBlank(message = "Location is required")
    @Size(max = 500, message = "Location cannot exceed 500 characters")
    private String location;
    
    @NotNull(message = "Walk-in status is required")
    private Boolean walkIn;
    
    @Min(value = 0, message = "Activity hours must be at least 0")
    private Integer activityHour;
    
    @NotEmpty(message = "At least one category is required")
    private Set<E_EventCategory> categories;
    
    @Size(max = 100, message = "Event organizer name cannot exceed 100 characters")
    private String eventBy;
    
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Contact email cannot exceed 100 characters")
    private String eventContactEmail;
    
    @Size(max = 20, message = "Contact phone cannot exceed 20 characters")
    private String eventContactPhone;
    
    private String poster; // URL or base64
    
    private String filePdf; // URL or base64
}
