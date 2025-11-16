package com.example.demo.service;

import com.example.demo.controller.dto.CreateEventDto;
import com.example.demo.controller.dto.EventResponseDto;
import com.example.demo.controller.dto.UpdateEventDto;
import com.example.demo.entity.Approval;
import com.example.demo.entity.EventRegisters;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_EventCategory;
import com.example.demo.entity.enums.E_EventStatus;
import com.example.demo.entity.enums.E_Role;
import com.example.demo.repository.ApprovalRepository;
import com.example.demo.repository.EventRegisterRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final ApprovalRepository approvalRepository;
    private final EventRegisterRepository eventRegisterRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, 
                       ApprovalRepository approvalRepository,
                       EventRegisterRepository eventRegisterRepository,
                       UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.approvalRepository = approvalRepository;
        this.eventRegisterRepository = eventRegisterRepository;
        this.userRepository = userRepository;
    }

    // =============== CREATE EVENT ===============
    @Transactional
    public EventResponseDto createEvent(CreateEventDto dto, UUID organizerId) {
        // Validate dates
        if (dto.getEndsAt().isBefore(dto.getStartsAt())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time");
        }

        Users organizer = userRepository.findById(organizerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Organizer not found"));

        // Create event
        Events event = new Events();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setStartsAt(dto.getStartsAt());
        event.setEndsAt(dto.getEndsAt());
        event.setCapacity(dto.getCapacity());
        event.setLocation(dto.getLocation());
        event.setWalkIn(dto.getWalkIn());
        event.setActivityHour(dto.getActivityHour());
        event.setCategorySet(dto.getCategories());
        event.setEventBy(dto.getEventBy());
        event.setEventContactEmail(dto.getEventContactEmail());
        event.setEventContactPhone(dto.getEventContactPhone());
        event.setPoster(dto.getPoster());
        event.setFilePdf(dto.getFilePdf());
        event.setOrganizer(organizer);
        event.setEditRequested(false);
        event.setIsDeleted(false);
        event.setIsCancelled(false);

        Events savedEvent = eventRepository.save(event);

        // Create approval record (PENDING)
        Approval approval = Approval.builder()
                .event(savedEvent)
                .decision(E_EventStatus.PENDING)
                .build();
        approvalRepository.save(approval);

        return mapToResponseDto(savedEvent);
    }

    // =============== GET EVENTS ===============
    public EventResponseDto getEventById(UUID eventId) {
        Events event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));
        
        if (event.getIsDeleted()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Event has been deleted");
        }
        
        return mapToResponseDto(event);
    }

    public List<EventResponseDto> getMyEvents(UUID organizerId) {
        return eventRepository.findAll().stream()
                .filter(e -> e.getOrganizer() != null && e.getOrganizer().getUserID().equals(organizerId))
                .filter(e -> !e.getIsDeleted())
                .map(this::mapToResponseDto)
                .toList();
    }

    public List<EventResponseDto> getApprovedEvents() {
        Set<UUID> approvedEventIds = approvalRepository.findAll().stream()
                .filter(a -> a.getDecision() == E_EventStatus.APPROVED)
                .map(a -> a.getEvent().getEventId())
                .collect(Collectors.toSet());

        return eventRepository.findAll().stream()
                .filter(e -> approvedEventIds.contains(e.getEventId()))
                .filter(e -> !e.getIsDeleted())
                .filter(e -> !e.getIsCancelled())
                .map(this::mapToResponseDto)
                .toList();
    }

    // =============== UPDATE EVENT ===============
    @Transactional
    public EventResponseDto updateEvent(UUID eventId, UpdateEventDto dto, UUID userId, E_Role userRole) {
        Events event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (event.getIsDeleted()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update deleted event");
        }

        // Check permissions
        boolean isOrganizer = event.getOrganizer() != null && 
                             event.getOrganizer().getUserID().equals(userId);
        boolean isAdmin = userRole == E_Role.ADMIN;

        if (!isOrganizer && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to update this event");
        }

        // Update fields (only non-null values)
        if (dto.getTitle() != null) event.setTitle(dto.getTitle());
        if (dto.getDescription() != null) event.setDescription(dto.getDescription());
        if (dto.getStartsAt() != null) event.setStartsAt(dto.getStartsAt());
        if (dto.getEndsAt() != null) event.setEndsAt(dto.getEndsAt());
        if (dto.getCapacity() != null) event.setCapacity(dto.getCapacity());
        if (dto.getLocation() != null) event.setLocation(dto.getLocation());
        if (dto.getWalkIn() != null) event.setWalkIn(dto.getWalkIn());
        if (dto.getActivityHour() != null) event.setActivityHour(dto.getActivityHour());
        if (dto.getCategories() != null) event.setCategorySet(dto.getCategories());
        if (dto.getEventBy() != null) event.setEventBy(dto.getEventBy());
        if (dto.getEventContactEmail() != null) event.setEventContactEmail(dto.getEventContactEmail());
        if (dto.getEventContactPhone() != null) event.setEventContactPhone(dto.getEventContactPhone());
        if (dto.getPoster() != null) event.setPoster(dto.getPoster());
        if (dto.getFilePdf() != null) event.setFilePdf(dto.getFilePdf());

        // Validate dates if both are present
        if (event.getEndsAt().isBefore(event.getStartsAt())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End time must be after start time");
        }

        event.setUpdatedAt(Instant.now());
        
        // Check if event was approved - mark as edit requested
        Approval approval = approvalRepository.findAll().stream()
                .filter(a -> a.getEvent().getEventId().equals(eventId))
                .findFirst()
                .orElse(null);
        
        if (approval != null && approval.getDecision() == E_EventStatus.APPROVED) {
            event.setEditRequested(true);
            // Could create new approval request here if needed
        }

        Events updatedEvent = eventRepository.save(event);
        return mapToResponseDto(updatedEvent);
    }

    // =============== CANCEL EVENT ===============
    @Transactional
    public void cancelEvent(UUID eventId, UUID userId, E_Role userRole) {
        Events event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        if (event.getIsCancelled()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event is already cancelled");
        }

        // Check permissions
        boolean isOrganizer = event.getOrganizer() != null && 
                             event.getOrganizer().getUserID().equals(userId);
        boolean isAdmin = userRole == E_Role.ADMIN;

        if (!isOrganizer && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to cancel this event");
        }

        event.setIsCancelled(true);
        event.setUpdatedAt(Instant.now());
        eventRepository.save(event);
    }

    // =============== DELETE EVENT (SOFT DELETE) ===============
    @Transactional
    public void deleteEvent(UUID eventId, UUID userId, E_Role userRole) {
        Events event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        // Only admin or organizer can delete
        boolean isOrganizer = event.getOrganizer() != null && 
                             event.getOrganizer().getUserID().equals(userId);
        boolean isAdmin = userRole == E_Role.ADMIN;

        if (!isOrganizer && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You don't have permission to delete this event");
        }

        event.setIsDeleted(true);
        event.setUpdatedAt(Instant.now());
        eventRepository.save(event);
    }

    // =============== FILTER EVENTS (PUBLIC) ===============
    public List<Events> getFilteredEvents(String search, List<E_EventCategory> category, Instant startDate, Instant endDate) {
        // Get approved event IDs
        Set<String> approvedEventIds = approvalRepository.findAll().stream()
                .filter(a -> a.getDecision() == E_EventStatus.APPROVED)
                .map(a -> a.getEvent().getEventId().toString())
                .collect(Collectors.toSet());
        
        return eventRepository.findAll().stream()
                .filter(e -> approvedEventIds.contains(e.getEventId().toString())) // Only approved events
                .filter(e -> !e.getIsDeleted() && !e.getIsCancelled()) // Not deleted or cancelled
                .filter(e -> startDate == null || !e.getStartsAt().isBefore(startDate))
                .filter(e -> endDate == null || !e.getStartsAt().isAfter(endDate))
                .filter(e -> category == null || category.isEmpty() || matchesCategory(e, category))
                .filter(e -> search == null || search.trim().isEmpty() || matchesSearch(e, search.toLowerCase()))
                .toList();
    }

    // =============== HELPER METHODS ===============
    private EventResponseDto mapToResponseDto(Events event) {
        // Count registrations
        long registeredCount = eventRegisterRepository.findAll().stream()
                .filter(r -> r.getEvent().getEventId().equals(event.getEventId()))
                .count();

        Integer availableSlots = null;
        if (event.getCapacity() != null && event.getCapacity() > 0) {
            availableSlots = event.getCapacity() - (int) registeredCount;
            if (availableSlots < 0) availableSlots = 0;
        }

        return EventResponseDto.builder()
                .eventId(event.getEventId())
                .title(event.getTitle())
                .description(event.getDescription())
                .startsAt(event.getStartsAt())
                .endsAt(event.getEndsAt())
                .capacity(event.getCapacity())
                .location(event.getLocation())
                .walkIn(event.getWalkIn())
                .activityHour(event.getActivityHour())
                .categories(event.getCategorySet())
                .eventBy(event.getEventBy())
                .eventContactEmail(event.getEventContactEmail())
                .eventContactPhone(event.getEventContactPhone())
                .poster(event.getPoster())
                .filePdf(event.getFilePdf())
                .organizerId(event.getOrganizer() != null ? event.getOrganizer().getUserID() : null)
                .organizerName(event.getOrganizer() != null ? event.getOrganizer().getUserName() : null)
                .organizerEmail(event.getOrganizer() != null ? event.getOrganizer().getUserEmail() : null)
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .editRequested(event.getEditRequested())
                .isDeleted(event.getIsDeleted())
                .isCancelled(event.getIsCancelled())
                .registeredCount((int) registeredCount)
                .availableSlots(availableSlots)
                .build();
    }

    private boolean matchesCategory(Events event, List<E_EventCategory> category) {
        return event.getCategorySet().stream().anyMatch(category::contains);
    }

    private boolean matchesSearch(Events event, String searchLower) {
        return (event.getTitle() != null && event.getTitle().toLowerCase().contains(searchLower)) ||
               (event.getLocation() != null && event.getLocation().toLowerCase().contains(searchLower)) ||
               (event.getEventBy() != null && event.getEventBy().toLowerCase().contains(searchLower));
    }
}