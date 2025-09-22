package com.klef.sdp.service;

import com.klef.sdp.entity.Assignment;
import com.klef.sdp.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAssignmentsByCourse(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }
}