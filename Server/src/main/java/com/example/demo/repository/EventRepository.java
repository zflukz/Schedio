package com.example.demo.repository;

import com.example.demo.entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Events, UUID> {
    @Query("SELECT CASE WHEN COUNT(ue) > 0 THEN true ELSE false END FROM Users u JOIN u.events ue WHERE u.userID = :userId AND ue.eventId = :eventId")
    boolean isUserOrganizerOfEvent(UUID userId, UUID eventId);
}
