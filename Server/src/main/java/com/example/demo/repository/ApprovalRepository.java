package com.example.demo.repository;

import com.example.demo.entity.Approval;
import com.example.demo.entity.enums.E_EventStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface ApprovalRepository extends JpaRepository<Approval, UUID> {
    List<Approval> findByEvent_EventId(UUID eventId);
    List<Approval> findByDecision(E_EventStatus decision);
    List<Approval> findByAdmin_UserID(UUID adminId);
    List<Approval> findByDecisionAndAdmin_UserID(E_EventStatus decision, UUID adminId);

    @Query("SELECT a FROM Approval a WHERE a.event.organizer.userID = :organizerId")
    List<Approval> findByOrganizer(@Param("organizerId") UUID organizerId);
}
