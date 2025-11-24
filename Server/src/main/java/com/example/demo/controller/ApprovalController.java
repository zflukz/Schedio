package com.example.demo.controller;

import com.example.demo.common.ApiResponse;
import com.example.demo.controller.dto.ApprovalFilterDto;
import com.example.demo.controller.dto.ApprovalRequestDto;
import com.example.demo.entity.Approval;
import com.example.demo.entity.Events;
import com.example.demo.entity.Users;
import com.example.demo.entity.enums.E_EventStatus;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ApprovalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/approval")
public class ApprovalController {

    private final ApprovalService approvalService;
    private final UserRepository userRepository; // <-- Inject repository

    public ApprovalController(ApprovalService approvalService, UserRepository userRepository) {
        this.approvalService = approvalService;
        this.userRepository = userRepository;
    }

    @PostMapping("/approve/{eventId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Approval>> approveEvent(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable UUID eventId,
            @Valid @RequestBody ApprovalRequestDto request) {

        try {
            Users admin = userRepository.findByUserName(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token"));

            // Validate comment is required for REJECTED decisions
            if (request.getDecision() == E_EventStatus.REJECT && 
                (request.getComment() == null || request.getComment().trim().isEmpty())) {
                throw new RuntimeException("Comment is required when rejecting an event");
            }

            Approval approval = approvalService.approveEvent(
                    eventId,
                    admin.getUserEmail(),
                    request.getDecision(),
                    request.getComment()
            );

            return ResponseEntity.ok(
                    ApiResponse.<Approval>builder()
                            .success(true)
                            .message("Event approval processed successfully")
                            .data(approval)
                            .build()
            );
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(
                    ApiResponse.<Approval>builder()
                            .success(false)
                            .message(e.getStatusCode() + " " + e.getReason())
                            .data(null)
                            .build()
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.<Approval>builder()
                            .success(false)
                            .message(e.getMessage())
                            .data(null)
                            .build()
            );
        }
    }

    @PostMapping("/filter-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<Approval>>> filterApprovals(
            @RequestBody ApprovalFilterDto filter,
            @AuthenticationPrincipal UserDetails userDetails) {

        userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        List<Approval> approvals = approvalService.getFilteredApprovals(
                filter.getSearch(),
                filter.getDecisions(),
                filter.getStartDate(),
                filter.getEndDate()
        );

        return ResponseEntity.ok(
                ApiResponse.<List<Approval>>builder()
                        .success(true)
                        .message("Filtered approvals retrieved successfully")
                        .data(approvals)
                        .build()
        );
    }

    @PostMapping("/filter-organizer")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<ApiResponse<List<Approval>>> filterOrganizerApprovals(
            @RequestBody ApprovalFilterDto filter,
            @AuthenticationPrincipal UserDetails userDetails) {

        Users organizer = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Organizer not found"));

        List<Approval> approvals = approvalService.getFilteredApprovalsByOrganizer(
                organizer.getUserID(),
                filter.getSearch(),
                filter.getDecisions(),
                filter.getStartDate(),
                filter.getEndDate()
        );

        return ResponseEntity.ok(
                ApiResponse.<List<Approval>>builder()
                        .success(true)
                        .message("Filtered approvals retrieved successfully")
                        .data(approvals)
                        .build()
        );
    }
}
