package com.klef.sdp.controller;

import com.klef.sdp.entity.Course;
import com.klef.sdp.entity.User;
import com.klef.sdp.service.CourseService;
import com.klef.sdp.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    private boolean isAdmin(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user != null && user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user, HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(userService.register(user));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user, HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses(HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@Valid @RequestBody Course course, HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(courseService.createCourse(course));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @Valid @RequestBody Course course, HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(courseService.updateCourse(id, course));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id, HttpSession session) {
        if (!isAdmin(session)) return ResponseEntity.status(403).build();
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }
}