package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_EventStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRegistrationResponseDto {
    private UUID regId;
    private UUID userId;
    private UUID eventId;
    private String eventTitle;
    private E_EventStatus status;
    private Instant registeredAt;
}
