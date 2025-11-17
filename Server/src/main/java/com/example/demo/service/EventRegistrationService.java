package com.example.demo.service;

import com.example.demo.controller.dto.EventRegistrationResponseDto;
import com.example.demo.entity.EventRegisters;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.repository.EventRegisterRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventRegistrationService {

    private final EventRegisterRepository eventRegisterRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Transactional
    public EventRegistrationResponseDto registerForEvent(UUID userId, UUID eventId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Events event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (eventRegisterRepository.existsByUser_UserIDAndEvent_EventId(userId, eventId)) {
            throw new RuntimeException("Already registered for this event");
        }

        if (event.getCapacity() != null && event.getCapacity() > 0) {
            long currentRegistrations = eventRegisterRepository.findByEvent_EventId(eventId).size();
            if (currentRegistrations >= event.getCapacity()) {
                throw new RuntimeException("Event is full");
            }
        }

        EventRegisters registration = new EventRegisters();
        registration.setUser(user);
        registration.setEvent(event);
        
        EventRegisters saved = eventRegisterRepository.save(registration);
        
        return toDto(saved);
    }

    @Transactional
    public void unregisterFromEvent(UUID userId, UUID eventId) {
        EventRegisters registration = eventRegisterRepository
                .findByUser_UserIDAndEvent_EventId(userId, eventId)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
        
        eventRegisterRepository.delete(registration);
    }

    public List<EventRegistrationResponseDto> getUserRegistrations(UUID userId) {
        return eventRegisterRepository.findByUser_UserID(userId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<EventRegistrationResponseDto> getEventRegistrations(UUID eventId) {
        return eventRegisterRepository.findByEvent_EventId(eventId).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public boolean canViewEventRegistrations(UUID userId, UUID eventId, com.example.demo.entity.enums.E_Role role) {
        if (role == com.example.demo.entity.enums.E_Role.ADMIN) {
            return true;
        }
        
        Events event = eventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return false;
        }
        
        return event.getOrganizer() != null && event.getOrganizer().getUserID().equals(userId);
    }

    private EventRegistrationResponseDto toDto(EventRegisters registration) {
        Events event = registration.getEvent();
        return EventRegistrationResponseDto.builder()
                .regId(registration.getRegId())
                .userName(registration.getUser().getUserName())
                .firstName(registration.getUser().getFirstName())
                .lastName(registration.getUser().getLastName())
                .email(registration.getUser().getUserEmail())
                .registeredAt(registration.getRegisteredAt())
                .event(EventRegistrationResponseDto.EventInfo.builder()
                        .eventId(event.getEventId())
                        .title(event.getTitle())
                        .description(event.getDescription())
                        .location(event.getLocation())
                        .startsAt(event.getStartsAt())
                        .endsAt(event.getEndsAt())
                        .capacity(event.getCapacity())
                        .activityHour(event.getActivityHour())
                        .poster(event.getPoster())
                        .filePdf(event.getFilePdf())
                        .walkIn(event.getWalkIn())
                        .eventBy(event.getEventBy())
                        .eventContactPhone(event.getEventContactPhone())
                        .categorySet(event.getCategorySet() != null ? 
                                event.getCategorySet().stream()
                                        .map(Enum::name)
                                        .collect(java.util.stream.Collectors.toSet()) : null)
                        .build())
                .build();
    }
}
