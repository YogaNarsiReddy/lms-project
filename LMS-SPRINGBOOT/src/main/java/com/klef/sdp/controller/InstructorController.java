package com.klef.sdp.controller;

import com.klef.sdp.entity.Assignment;
import com.klef.sdp.entity.Course;
import com.klef.sdp.entity.Submission;
import com.klef.sdp.entity.User;
import com.klef.sdp.service.AssignmentService;
import com.klef.sdp.service.CourseService;
import com.klef.sdp.service.SubmissionService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private AssignmentService assignmentService;

    @Autowired
    private SubmissionService submissionService;

    private boolean isInstructor(HttpSession session) {
        User user = (User) session.getAttribute("user");
        return user != null && user.getRoles().stream().anyMatch(role -> role.getName().equals("INSTRUCTOR"));
    }

    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@Valid @RequestBody Course course, HttpSession session) {
        if (!isInstructor(session)) return ResponseEntity.status(403).build();
        User user = (User) session.getAttribute("user");
        course.setInstructor(user);
        return ResponseEntity.ok(courseService.createCourse(course));
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getInstructorCourses(HttpSession session) {
        if (!isInstructor(session)) return ResponseEntity.status(403).build();
        User user = (User) session.getAttribute("user");
        return ResponseEntity.ok(courseService.getCoursesByInstructor(user.getId()));
    }

    @PostMapping("/assignments")
    public ResponseEntity<Assignment> createAssignment(@Valid @RequestBody Assignment assignment, HttpSession session) {
        if (!isInstructor(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(assignmentService.createAssignment(assignment));
    }

    @GetMapping("/assignments/{courseId}")
    public ResponseEntity<List<Assignment>> getAssignments(@PathVariable Long courseId, HttpSession session) {
        if (!isInstructor(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(assignmentService.getAssignmentsByCourse(courseId));
    }

    @GetMapping("/submissions/{assignmentId}")
    public ResponseEntity<List<Submission>> getSubmissions(@PathVariable Long assignmentId, HttpSession session) {
        if (!isInstructor(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(submissionService.getSubmissionsByAssignment(assignmentId));
    }

    @PutMapping("/submissions/{id}")
    public ResponseEntity<Submission> gradeSubmission(@PathVariable Long id, @RequestBody Submission submission, HttpSession session) {
        if (!isInstructor(session)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(submissionService.gradeSubmission(id, submission.getGrade()));
    }
}