package com.klef.sdp.service;

import com.klef.sdp.entity.ForumPost;
import com.klef.sdp.entity.Course;
import com.klef.sdp.repository.ForumPostRepository;
import com.klef.sdp.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Autowired
    private CourseRepository courseRepository;

    public ForumPost createPost(Long courseId, ForumPost post) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        post.setCourse(course);
        return forumPostRepository.save(post);
    }

    public List<ForumPost> getPostsByCourse(Long courseId) {
        return forumPostRepository.findByCourseId(courseId);
    }
}