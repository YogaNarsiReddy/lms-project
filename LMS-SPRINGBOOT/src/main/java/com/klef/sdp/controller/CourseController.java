package com.klef.sdp.controller;

import com.klef.sdp.entity.Course;
import com.klef.sdp.entity.ForumPost;
import com.klef.sdp.entity.User;
import com.klef.sdp.service.CourseService;
import com.klef.sdp.service.ForumService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private ForumService forumService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping("/{courseId}/forum")
    public ResponseEntity<ForumPost> createForumPost(@PathVariable Long courseId, @Valid @RequestBody ForumPost post, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(403).build();
        post.setAuthor(user);
        return ResponseEntity.ok(forumService.createPost(courseId, post));
    }

    @GetMapping("/{courseId}/forum")
    public ResponseEntity<List<ForumPost>> getForumPosts(@PathVariable Long courseId) {
        return ResponseEntity.ok(forumService.getPostsByCourse(courseId));
    }
}