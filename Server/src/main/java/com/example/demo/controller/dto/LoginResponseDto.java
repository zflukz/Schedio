package com.example.demo.controller.dto;

public class LoginResponseDto {

        private String token;
        private String userEmail;
        private String message;



        public LoginResponseDto(String token, String userEmail, String message){
            this.token = token;
            this.userEmail = userEmail;
            this.message = message;
        }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
