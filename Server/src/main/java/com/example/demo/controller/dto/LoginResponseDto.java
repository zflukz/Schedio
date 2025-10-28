package com.example.demo.controller.dto;

public class LoginResponseDto {

        private String token;
        private String firstname;
        private String lastname;
        private String userEmail;
        private String message;



        public LoginResponseDto(String token, String firstname, String lastname, String userEmail, String message){
            this.token = token;
            this.firstname = firstname;
            this.lastname = lastname;
            this.userEmail = userEmail;
            this.message = message;
        }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
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
