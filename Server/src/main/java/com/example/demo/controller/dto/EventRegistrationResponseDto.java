package com.example.demo.controller.dto;


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
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private Instant registeredAt;
}
