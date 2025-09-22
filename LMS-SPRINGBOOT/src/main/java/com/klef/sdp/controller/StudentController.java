package com.klef.sdp.controller;

import com.klef.sdp.entity.Enrollment;
import com.klef.sdp.entity.Submission;
import com.klef.sdp.entity.User;
import com.klef.sdp.service.EnrollmentService;
import com.klef.sdp.service.SubmissionService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private SubmissionService submissionService;

    private boolean isStudent(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user != null && user.getRoles().stream().anyMatch(role -> role.getName().equals("STUDENT"));
    }

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<Enrollment> enroll(@PathVariable Long courseId, HttpSession session) {
        if (!isStudent(session)) return ResponseEntity.status(403).build();
        User user = (User) session.getAttribute("user");
        return ResponseEntity.ok(enrollmentService.enroll(user.getId(), courseId));
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<Enrollment>> getEnrollments(HttpSession session) {
        if (!isStudent(session)) return ResponseEntity.status(403).build();
        User user = (User) session.getAttribute("user");
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByStudent(user.getId()));
    }

    @PostMapping("/submissions")
    public ResponseEntity<Submission> submitAssignment(@Valid @RequestBody Submission submission, HttpSession session) {
        if (!isStudent(session)) return ResponseEntity.status(403).build();
        User user = (User) session.getAttribute("user");
        submission.setStudent(user);
        return ResponseEntity.ok(submissionService.submitAssignment(submission));
    }
}