package com.example.demo.entity;

import com.example.demo.entity.enums.E_EventCategory;
import com.example.demo.entity.enums.E_EventStatus;
import jakarta.persistence.*;
import lombok.*;

//import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.Instant;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events",
        indexes = {
                @Index(name = "idx_events_status", columnList = "status"),
                @Index(name = "idx_events_starts_at", columnList = "starts_at")
        })
public class Events {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="event_id", nullable = false, updatable = false)
    private UUID eventId;

    @Column(nullable = false, columnDefinition = "text")
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "starts_at", nullable = false)
    private Instant startsAt;

    @Column(name = "ends_at", nullable = false)
    private Instant endsAt;

    // null/0 = unlimited
    @Column
    private Integer capacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private E_EventStatus status = E_EventStatus.PENDING;


    @Column(name = "Poster")
    private String Poster;

     @Column(nullable = false)
     private String location;

    @Column(name = "walk_in", nullable = false)
    private Boolean walkIn = false;

    @Column(name = "activity_hour")
    private Integer activityHour;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_category", nullable = false, length = 20)
    private E_EventCategory eventCategory;

    // ผู้สร้างอีเวนต์ (Organizer)
    @ManyToMany(mappedBy =  "events")
    private Set<Users> users = new HashSet<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "file_pdf")
    private String filePdf;

    @Column(name = "event_by", length = 100)
    private String eventBy;

    @Column(name = "event_contact_email", length = 100)
    private String eventContactEmail;

    @Column(name = "event_contact_phone", length = 20)
    private String eventContactPhone;

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
        updatedAt = createdAt;
    }

    @Column(name = "is_edit_requested")
    private Boolean editRequested = false;

    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

    @Column(name = "is_cancelled")
    private Boolean isCancelled = false;
}
