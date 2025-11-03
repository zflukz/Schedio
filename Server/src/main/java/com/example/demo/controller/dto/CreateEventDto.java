package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_EventCategory;
import com.example.demo.entity.enums.E_EventStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;

@Data
public class CreateEventDto {
    
    @NotBlank(message = "Title is required")
    private String title;

    // @NotBlank(message = "Location is required")
    // private String location;

    private Integer activityHour;
    private String eventBy;
    private String eventContact;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Start date/time is required")
    private Instant startsAt;

    @NotNull(message = "End date/time is required")
    private Instant endsAt;

    @NotBlank(message = "Event category is required")
    private E_EventCategory eventCategory;

    @NotBlank(message = "Capacity is required")
    private Integer capacity;

    @NotBlank(message = "Walk-in status is required")
    private Boolean walkIn;

    private String poster;
    private String filePdf;

    private E_EventStatus status = E_EventStatus.PENDING;
}
