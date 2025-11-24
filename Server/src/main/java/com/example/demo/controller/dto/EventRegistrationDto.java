package com.example.demo.controller.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class EventRegistrationDto {
    @NotNull(message = "Event ID is required")
    private UUID eventId;
}
