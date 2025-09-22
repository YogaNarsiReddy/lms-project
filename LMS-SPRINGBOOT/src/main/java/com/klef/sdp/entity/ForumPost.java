package com.klef.sdp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Content is required")
    private String content;

    @ManyToOne
    private Course course;

    @ManyToOne
    private User author;

    @OneToMany(mappedBy = "parent")
    private List<ForumPost> replies = new ArrayList<>();

    @ManyToOne
    private ForumPost parent;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public List<ForumPost> getReplies() {
        return replies;
    }

    public void setReplies(List<ForumPost> replies) {
        this.replies = replies;
    }

    public ForumPost getParent() {
        return parent;
    }

    public void setParent(ForumPost parent) {
        this.parent = parent;
    }
}