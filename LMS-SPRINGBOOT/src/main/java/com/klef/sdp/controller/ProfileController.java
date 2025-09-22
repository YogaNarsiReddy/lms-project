package com.klef.sdp.controller;

import com.klef.sdp.entity.User;
import com.klef.sdp.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<User> getProfile(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<User> updateProfile(@Valid @RequestBody User updatedUser, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) return ResponseEntity.status(403).build();
        User savedUser = userService.updateUser(user.getId(), updatedUser);
        session.setAttribute("user", savedUser);
        return ResponseEntity.ok(savedUser);
    }
}