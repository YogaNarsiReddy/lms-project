package com.klef.sdp.controller;

import com.klef.sdp.entity.User;
import com.klef.sdp.service.CertificateService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/certificate")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping("/{courseId}")
    public ResponseEntity<byte[]> generateCertificate(@PathVariable Long courseId, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null || !user.getRoles().stream().anyMatch(role -> role.getName().equals("STUDENT"))) {
            return ResponseEntity.status(403).build();
        }
        byte[] certificate = certificateService.generateCertificate(user.getUsername(), "Course " + courseId);
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=certificate.pdf")
                .body(certificate);
    }
}