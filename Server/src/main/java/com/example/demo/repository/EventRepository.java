package com.example.demo.repository;

import com.example.demo.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Events, UUID> {
    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Events e WHERE e.organizer.userID = :userId AND e.eventId = :eventId")
    boolean isUserOrganizerOfEvent(UUID userId, UUID eventId);
    
    boolean existsByTitle(String title);
}
