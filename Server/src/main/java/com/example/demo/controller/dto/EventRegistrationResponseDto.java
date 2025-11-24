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
    private EventInfo event;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventInfo {
        private UUID eventId;
        private String title;
        private String description;
        private String location;
        private java.time.Instant startsAt;
        private java.time.Instant endsAt;
        private Integer capacity;
        private Integer activityHour;
        private String poster;
        private String filePdf;
        private Boolean walkIn;
        private String eventBy;
        private String eventContactPhone;
        private java.util.Set<String> categorySet;
    }
}
