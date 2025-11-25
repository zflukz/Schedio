package com.example.demo.entity;

import com.example.demo.entity.enums.E_EventCategory;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.Instant;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "events",
        indexes = {
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




    @Column(name = "poster", columnDefinition = "TEXT")
    private String poster;

     @Column(nullable = false)
     private String location;

    @Column(name = "walk_in", nullable = false)
    private Boolean walkIn = false;

    @Column(name = "activity_hour")
    private Integer activityHour;

    @Column(name = "event_category", nullable = false, length = 500)
    private String eventCategories;
    
    // Helper methods for categories
    @Transient
    public Set<E_EventCategory> getCategorySet() {
        if (eventCategories == null || eventCategories.isEmpty()) {
            return new HashSet<>();
        }
        Set<E_EventCategory> categories = new HashSet<>();
        for (String cat : eventCategories.split(",")) {
            try {
                categories.add(E_EventCategory.valueOf(cat.trim()));
            } catch (IllegalArgumentException e) {
                // Skip invalid categories
            }
        }
        return categories;
    }
    
    @Transient
    public void setCategorySet(Set<E_EventCategory> categories) {
        if (categories == null || categories.isEmpty()) {
            this.eventCategories = "";
        } else {
            this.eventCategories = String.join(",", categories.stream()
                .map(E_EventCategory::name)
                .toArray(String[]::new));
        }
    }
    
    // For JSON serialization - returns first category for backward compatibility
    public E_EventCategory getEventCategory() {
        Set<E_EventCategory> categories = getCategorySet();
        return categories.isEmpty() ? null : categories.iterator().next();
    }

    // ผู้สร้างอีเวนต์ (Organizer)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizer_id", foreignKey = @ForeignKey(name = "fk_event_organizer"))
    private Users organizer;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "file_pdf", columnDefinition = "TEXT")
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