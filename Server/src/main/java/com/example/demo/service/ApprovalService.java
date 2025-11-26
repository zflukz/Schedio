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
        Instant now = Instant.now();
        return approvalRepository.findAll().stream()
                .filter(a -> decisions == null || decisions.isEmpty() || decisions.contains(a.getDecision()))
                .filter(a -> startDate == null || !a.getEvent().getStartsAt().isBefore(startDate))
                .filter(a -> endDate == null || !a.getEvent().getStartsAt().isAfter(endDate))
                .filter(a -> search == null || search.trim().isEmpty() || matchesSearch(a, search.toLowerCase()))
                .sorted((a1, a2) -> {
                    // 1. PENDING status first
                    if (a1.getDecision() == E_EventStatus.PENDING && a2.getDecision() != E_EventStatus.PENDING) return -1;
                    if (a1.getDecision() != E_EventStatus.PENDING && a2.getDecision() == E_EventStatus.PENDING) return 1;
                    
                    boolean a1Past = a1.getEvent().getStartsAt().isBefore(now);
                    boolean a2Past = a2.getEvent().getStartsAt().isBefore(now);
                    
                    // 2. For PENDING: past events first
                    if (a1.getDecision() == E_EventStatus.PENDING && a2.getDecision() == E_EventStatus.PENDING) {
                        if (a1Past && !a2Past) return -1;
                        if (!a1Past && a2Past) return 1;
                    }
                    // For non-PENDING: future events first
                    else if (a1.getDecision() != E_EventStatus.PENDING && a2.getDecision() != E_EventStatus.PENDING) {
                        if (!a1Past && a2Past) return -1;
                        if (a1Past && !a2Past) return 1;
                    }
                    
                    // 3. Closest to now
                    long diff1 = Math.abs(a1.getEvent().getStartsAt().toEpochMilli() - now.toEpochMilli());
                    long diff2 = Math.abs(a2.getEvent().getStartsAt().toEpochMilli() - now.toEpochMilli());
                    return Long.compare(diff1, diff2);
                })
                .toList();
    }

    public List<Approval> getFilteredApprovalsByOrganizer(UUID organizerId, String search, List<E_EventStatus> decisions, Instant startDate, Instant endDate) {
        Instant now = Instant.now();
        return approvalRepository.findByOrganizer(organizerId).stream()
                .filter(a -> decisions == null || decisions.isEmpty() || decisions.contains(a.getDecision()))
                .filter(a -> startDate == null || !a.getEvent().getStartsAt().isBefore(startDate))
                .filter(a -> endDate == null || !a.getEvent().getStartsAt().isAfter(endDate))
                .filter(a -> search == null || search.trim().isEmpty() || matchesOrganizerSearch(a, search.toLowerCase()))
                .sorted((a1, a2) -> {
                    // 1. PENDING status first
                    if (a1.getDecision() == E_EventStatus.PENDING && a2.getDecision() != E_EventStatus.PENDING) return -1;
                    if (a1.getDecision() != E_EventStatus.PENDING && a2.getDecision() == E_EventStatus.PENDING) return 1;
                    
                    boolean a1Past = a1.getEvent().getStartsAt().isBefore(now);
                    boolean a2Past = a2.getEvent().getStartsAt().isBefore(now);
                    
                    // 2. For PENDING: past events first
                    if (a1.getDecision() == E_EventStatus.PENDING && a2.getDecision() == E_EventStatus.PENDING) {
                        if (a1Past && !a2Past) return -1;
                        if (!a1Past && a2Past) return 1;
                    }
                    // For non-PENDING: future events first
                    else if (a1.getDecision() != E_EventStatus.PENDING && a2.getDecision() != E_EventStatus.PENDING) {
                        if (!a1Past && a2Past) return -1;
                        if (a1Past && !a2Past) return 1;
                    }
                    
                    // 3. Closest to now
                    long diff1 = Math.abs(a1.getEvent().getStartsAt().toEpochMilli() - now.toEpochMilli());
                    long diff2 = Math.abs(a2.getEvent().getStartsAt().toEpochMilli() - now.toEpochMilli());
                    return Long.compare(diff1, diff2);
                })
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
