//package com.example.demo.entity;
//
//import com.example.demo.entity.enums.E_EventStatus;
//import jakarta.persistence.*;
//import lombok.*;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import java.time.Instant;
//import java.util.*;
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Entity
//@Table(name = "events",
//        indexes = {
//                @Index(name = "idx_events_status", columnList = "status"),
//                @Index(name = "idx_events_starts_at", columnList = "starts_at")
//        })
//public class Events {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name="event_id", nullable = false, updatable = false)
//    private UUID eventId;
//
//    @Column(nullable = false, columnDefinition = "text")
//    private String title;
//
//    @Column(columnDefinition = "text")
//    private String description;
//
//    @Column(name = "starts_at", nullable = false)
//    private Instant startsAt;
//
//    @Column(name = "ends_at", nullable = false)
//    private Instant endsAt;
//
//    // null/0 = unlimited
//    @Column
//    private Integer capacity;
//
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false, length = 20)
//    private E_EventStatus status = E_EventStatus.PENDING;
//
//    @Column
//    private String poster;
//
//    // ผู้สร้างอีเวนต์ (Organizer)
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name="created_by", nullable = false,
//            foreignKey = @ForeignKey(name = "fk_events_created_by"))
//    private Users creator;
//
//    @Column(name = "created_at", nullable = false, updatable = false)
//    private Instant createdAt;
//
//    @Column(name = "updated_at")
//    private Instant updatedAt;
//
//    @Lob
//    @Basic(fetch = FetchType.LAZY)
//    @Column(name = "file_pdf")
//    private byte[] filePdf;
//
//    @Column(name = "event_by", length = 100)
//    private String eventBy;
//
//    @Column(name = "event_contact", length = 20)
//    private String eventContact;
//
//    @PrePersist
//    void onCreate() {
//        if (createdAt == null) createdAt = Instant.now();
//        updatedAt = createdAt;
//    }
//
//
//}
