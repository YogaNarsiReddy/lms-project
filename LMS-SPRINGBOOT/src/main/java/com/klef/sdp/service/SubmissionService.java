package com.klef.sdp.service;

import com.klef.sdp.entity.Submission;
import com.klef.sdp.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    public Submission submitAssignment(Submission submission) {
        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByAssignment(Long assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId);
    }

    public Submission gradeSubmission(Long id, double grade) {
        Submission submission = submissionRepository.findById(id).orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setGrade(grade);
        return submissionRepository.save(submission);
    }
}