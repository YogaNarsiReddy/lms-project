package com.klef.sdp.dto;

import jakarta.validation.constraints.NotBlank;

public class SubmissionDTO {
    @NotBlank(message = "Content is required")
    private String content;

    // Constructors
    public SubmissionDTO() {}

    public SubmissionDTO(String content) {
        this.content = content;
    }

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}