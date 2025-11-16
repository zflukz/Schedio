package com.example.demo.controller.dto;

import com.example.demo.entity.enums.E_Role;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.UUID;

@Data
public class EditUserDto {

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public E_Role getUserRole() {
        return userRole;
    }

    public void setUserRole(E_Role role) {
        this.userRole = role;
    }

    public UUID userID;

    // Basic Info
    private String userName;

    @Size(min = 6, message = "min 6 chars")
    private String userPassword;

    private String firstName;
    private String lastName;

    // Contact Info
    @Email
    private String userEmail;
    private String userPhone;

    // Role
    private E_Role userRole = E_Role.ATTENDEE;


}
