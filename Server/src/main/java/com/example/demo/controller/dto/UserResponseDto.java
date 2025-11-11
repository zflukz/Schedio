package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_Role;

import java.util.UUID;

public class UserResponseDto {


    private UUID userID;
    private String userName;
    private String firstname;
    private String lastname;
    private String userEmail;
    private String userPhone;
    private E_Role userRole;



    public UserResponseDto(UUID userID, String userName, String firstname, String lastname, String userEmail, String userPhone, E_Role userRole) {
        this.userID = userID;
        this.userName = userName;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userRole = userRole;
    }




    public UUID getUserID() {
        return userID;
    }
    public String getUserName() {
        return userName;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public E_Role getUserRole() {
        return userRole;
    }
}
