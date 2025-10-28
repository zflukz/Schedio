package com.example.demo.controller.dto;

import java.util.UUID;

public class UserResponseDto {


    private UUID userID;
    private String userName;

    public UserResponseDto(UUID userID, String userName){
        this.userID = userID;
        this.userName = userName;
    }

    public UUID getUserID() {
        return userID;
    }

    public String getUserFirstname() {
        return userName;
    }
}
