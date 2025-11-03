package com.example.demo.repository;

import com.example.demo.entity.Events;
import com.example.demo.entity.enums.E_EventCategory;

import jdk.jfr.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
// import java.util.Optional;
// import java.util.OptionalInt;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Events, UUID> {
    List<Events> findByTitle(String title);
    //List<Events> findByCategory(E_EventCategory category);
    //List<Events> findByDateRange (Instant startsAt, Instant endsAt);
    List<Events> findByStartsAtBetween(Instant start, Instant end);

}
