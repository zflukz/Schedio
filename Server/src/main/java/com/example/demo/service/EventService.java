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
}