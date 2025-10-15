package com.example.demo.entity;

import com.example.demo.entity.enums.E_Role;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.Instant;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users",
        indexes = @Index(name = "idx_users_role", columnList = "role"),
        uniqueConstraints = @UniqueConstraint(name = "uk_users_email", columnNames = "email"))
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="user_id", updatable = false)
    private UUID userID;

    @Column(name="username", length = 100, nullable = false)
    private String userName;

    @JsonIgnore // ป้องกันรั่วใน Response
    @Column(name="password", length = 100, nullable = false)
    private String userPassword;

    @Column(name="firstname", length = 100)
    private String firstName;

    @Column(name = "lastname", length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private E_Role userRole = E_Role.ATTENDEE;

    @Column(name ="phone", length = 20)
    private String userPhone;


    public Users(String userName, String userPassword, String userEmail){
        this.userName = userName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
    }


//    // ผู้ใช้เป็นผู้สร้างอีเวนต์ (1:N)
//    @JsonIgnore
//    @OneToMany(mappedBy = "organizer", fetch = FetchType.LAZY)
//    private Set<Events> createdEvents = new HashSet<>();
//
//    // การลงทะเบียนของผู้ใช้ (1:N) ผ่าน entity กลาง
//    @JsonIgnore
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<EventRegisters> registrations = new HashSet<>();
//
//


}
