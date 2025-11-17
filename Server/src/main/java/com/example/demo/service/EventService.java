package com.example.demo.service;

import com.example.demo.entity.Approval;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_EventCategory;
import com.example.demo.entity.enums.E_EventStatus;
import com.example.demo.repository.ApprovalRepository;
import com.example.demo.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final ApprovalRepository approvalRepository;

    public EventService(EventRepository eventRepository, ApprovalRepository approvalRepository) {
        this.eventRepository = eventRepository;
        this.approvalRepository = approvalRepository;
    }

    public List<Events> getFilteredEvents(String search, List<E_EventCategory> category, Instant startDate, Instant endDate) {
        // Get approved event IDs
        Set<String> approvedEventIds = approvalRepository.findAll().stream()
                .filter(a -> a.getDecision() == E_EventStatus.APPROVED)
                .map(a -> a.getEvent().getEventId().toString())
                .collect(Collectors.toSet());
        
        return eventRepository.findAll().stream()
                .filter(e -> approvedEventIds.contains(e.getEventId().toString())) // Only approved events
                .filter(e -> startDate == null || !e.getStartsAt().isBefore(startDate))
                .filter(e -> endDate == null || !e.getStartsAt().isAfter(endDate))
                .filter(e -> category == null || category.isEmpty() || matchesCategory(e, category))
                .filter(e -> search == null || search.trim().isEmpty() || matchesSearch(e, search.toLowerCase()))
                .toList();
    }

    private boolean matchesCategory(Events event, List<E_EventCategory> category) {
        return event.getCategorySet().stream().anyMatch(category::contains);
    }

    private boolean matchesSearch(Events event, String searchLower) {
        return (event.getTitle() != null && event.getTitle().toLowerCase().contains(searchLower)) ||
               (event.getLocation() != null && event.getLocation().toLowerCase().contains(searchLower)) ||
               (event.getEventBy() != null && event.getEventBy().toLowerCase().contains(searchLower));
    }
    @Autowired

    @Override
    @Transactional
    public Events createEvent(CreateEventDto body, Users currentUser) {

        boolean isOrganizer = currentUser.getUserRole() == E_Role.ORGANIZER;
        if (!isOrganizer) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only organizer can create events");
        }
        
        if (eventRepository.existsByTitle(body.getTitle())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event with this name already exists");
        }

        Events newEvent = new Events();

        newEvent.setTitle(body.getTitle());
        newEvent.setLocation(body.getLocation());
        newEvent.setEventBy(body.getEventBy());
        newEvent.setEventContactEmail(body.getEventContactEmail());
        newEvent.setEventContactPhone(body.getEventContactPhone());
        newEvent.setDescription(body.getDescription());
        newEvent.setStartsAt(body.getStartsAt());
        newEvent.setEndsAt(body.getEndsAt());
        newEvent.setEventCategory(body.getEventCategory());
        newEvent.setCapacity(body.getCapacity() != null ? body.getCapacity() : Integer.MAX_VALUE);
        newEvent.setWalkIn(body.getWalkIn());
        newEvent.setActivityHour(body.getActivityHour());
        newEvent.setPoster(body.getPoster());
        newEvent.setFilePdf(body.getFilePdf());
        newEvent.setStatus(body.getStatus());

        return eventRepository.save(newEvent);
    }
    @Override
    @Transactional
    public Events updateEventByID(UUID id, UpdateEventDto body, Users currentUser) {
        Events event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        boolean isAdmin = currentUser.getUserRole() == E_Role.ADMIN;
        boolean isOrganizer = currentUser.getUserRole() == E_Role.ORGANIZER;

        if(!isAdmin && !isOrganizer) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not allowed to edit events.");

        }

        if(isOrganizer) {
            event.setEditRequested(true);
            return eventRepository.save(event);
        }

        //Optional update
        if (body.getTitle() != null) event.setTitle(body.getTitle());
        if (body.getLocation() != null) event.setLocation(body.getLocation());
        if (body.getEventBy() != null) event.setEventBy(body.getEventBy());
        if (body.getEventContactEmail() != null) event.setEventContactEmail(body.getEventContactEmail());
        if (body.getEventContactPhone() != null) event.setEventContactPhone(body.getEventContactPhone());
        if (body.getDescription() != null) event.setDescription(body.getDescription());
        if (body.getStartsAt() != null) event.setStartsAt(body.getStartsAt());
        if (body.getEndsAt() != null) event.setEndsAt(body.getEndsAt());
        if (body.getEventCategory() != null) event.setEventCategory(body.getEventCategory());
        if (body.getCapacity() != null) event.setCapacity(body.getCapacity());
        if (body.getWalkIn() != null) event.setWalkIn(body.getWalkIn());
        if (body.getActivityHour() != null) event.setActivityHour(body.getActivityHour());
        if (body.getPoster() != null) event.setPoster(body.getPoster());
        if (body.getFilePdf() != null) event.setFilePdf(body.getFilePdf());
        if (body.getStatus() != null) event.setStatus(body.getStatus());

        //When admin edited
        event.setEditRequested(false);

        return eventRepository.save(event);
    }

    @Override
    @Transactional
    public void deleteEventByID(UUID id) {
        Events event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        eventRepository.delete(event);
    }

}