package com.klef.sdp.service;

import com.klef.sdp.entity.Enrollment;
import com.klef.sdp.entity.User;
import com.klef.sdp.entity.Course;
import com.klef.sdp.repository.EnrollmentRepository;
import com.klef.sdp.repository.UserRepository;
import com.klef.sdp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enroll(Long userId, Long courseId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(user);
        enrollment.setCourse(course);
        enrollment.setProgress(0.0);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }
}