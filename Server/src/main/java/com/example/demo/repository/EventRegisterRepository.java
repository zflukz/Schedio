package com.example.demo.repository;

import com.example.demo.entity.EventRegisters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EventRegisterRepository extends JpaRepository<EventRegisters, UUID> {
    Optional<EventRegisters> findByUser_UserIDAndEvent_EventId(UUID userId, UUID eventId);
    List<EventRegisters> findByUser_UserID(UUID userId);
    List<EventRegisters> findByEvent_EventId(UUID eventId);
    boolean existsByUser_UserIDAndEvent_EventId(UUID userId, UUID eventId);
}
