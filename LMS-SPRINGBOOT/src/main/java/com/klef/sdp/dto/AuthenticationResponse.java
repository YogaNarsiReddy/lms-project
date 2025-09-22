package com.klef.sdp.dto;

public class AuthenticationResponse {
    private String jwt;

    // Constructors
    public AuthenticationResponse() {}

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    // Getters and Setters
    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}