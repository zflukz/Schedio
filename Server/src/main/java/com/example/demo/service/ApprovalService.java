package com.example.demo.service;

import com.example.demo.entity.Approval;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_EventStatus;
import com.example.demo.repository.ApprovalRepository;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class ApprovalService {

    private final ApprovalRepository approvalRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public ApprovalService(ApprovalRepository approvalRepository,
                           EventRepository eventRepository,
                           UserRepository userRepository) {
        this.approvalRepository = approvalRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public Approval approveEvent(UUID eventID, String adminEmail, E_EventStatus decision, String comment) {
        Events event = eventRepository.findById(eventID)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Users admin = userRepository.findByUserEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // Find existing approval or create new one
        Approval approval = approvalRepository.findByEvent_EventId(eventID)
                .stream().findFirst().orElse(new Approval());
        
        approval.setEvent(event);
        approval.setAdmin(admin);
        approval.setDecision(decision);
        approval.setComment(comment);
        approval.setDecidedAt(Instant.now());

        return approvalRepository.save(approval);
    }

    public List<Approval> getFilteredApprovals(String search, List<E_EventStatus> decisions, Instant startDate, Instant endDate) {
        return approvalRepository.findAll().stream()
                .filter(a -> decisions == null || decisions.isEmpty() || decisions.contains(a.getDecision()))
                .filter(a -> startDate == null || !a.getDecidedAt().isBefore(startDate))
                .filter(a -> endDate == null || !a.getDecidedAt().isAfter(endDate))
                .filter(a -> search == null || search.trim().isEmpty() || matchesSearch(a, search.toLowerCase()))
                .toList();
    }

    public List<Approval> getFilteredApprovalsByOrganizer(UUID organizerId, String search, List<E_EventStatus> decisions, Instant startDate, Instant endDate) {
        return approvalRepository.findByOrganizer(organizerId).stream()
                .filter(a -> decisions == null || decisions.isEmpty() || decisions.contains(a.getDecision()))
                .filter(a -> startDate == null || !a.getDecidedAt().isBefore(startDate))
                .filter(a -> endDate == null || !a.getDecidedAt().isAfter(endDate))
                .filter(a -> search == null || search.trim().isEmpty() || matchesOrganizerSearch(a, search.toLowerCase()))
                .toList();
    }
    
    private boolean matchesSearch(Approval approval, String searchLower) {
        return (approval.getEvent().getTitle() != null && approval.getEvent().getTitle().toLowerCase().contains(searchLower)) ||
               (approval.getEvent().getEventBy() != null && approval.getEvent().getEventBy().toLowerCase().contains(searchLower)) ||
               (approval.getEvent().getLocation() != null && approval.getEvent().getLocation().toLowerCase().contains(searchLower)) ||
               (approval.getAdmin() != null && matchesUserName(approval.getAdmin(), searchLower)) ||
               (approval.getEvent().getOrganizer() != null && matchesUserName(approval.getEvent().getOrganizer(), searchLower));
    }
    
    private boolean matchesOrganizerSearch(Approval approval, String searchLower) {
        return (approval.getEvent().getTitle() != null && approval.getEvent().getTitle().toLowerCase().contains(searchLower)) ||
               (approval.getEvent().getEventBy() != null && approval.getEvent().getEventBy().toLowerCase().contains(searchLower)) ||
               (approval.getEvent().getLocation() != null && approval.getEvent().getLocation().toLowerCase().contains(searchLower)) ||
               (approval.getAdmin() != null && matchesUserName(approval.getAdmin(), searchLower));
    }
    
    private boolean matchesUserName(Users user, String searchLower) {
        if (user == null) return false;
        return (user.getUserName() != null && user.getUserName().toLowerCase().contains(searchLower)) ||
               (user.getFirstName() != null && user.getFirstName().toLowerCase().contains(searchLower)) ||
               (user.getLastName() != null && user.getLastName().toLowerCase().contains(searchLower));
    }
}
