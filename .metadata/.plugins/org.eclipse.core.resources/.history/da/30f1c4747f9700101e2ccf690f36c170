package com.klef.sdp.controller;

import com.klef.sdp.entity.User;
import com.klef.sdp.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody User user) {
        User savedUser = userService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser, HttpSession session) {
        User user = userService.login(loginUser.getUsername(), loginUser.getPassword());
        if (user != null) {
            session.setAttribute("user", user);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body(null);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }
}