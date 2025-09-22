package com.klef.sdp.service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class CertificateService {

    public byte[] generateCertificate(String studentName, String courseTitle) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            Document document = new Document();
            PdfWriter.getInstance(document, baos);
            document.open();
            document.add(new Paragraph("Certificate of Completion"));
            document.add(new Paragraph("Student: " + studentName));
            document.add(new Paragraph("Course: " + courseTitle));
            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate certificate", e);
        }
        return baos.toByteArray();
    }
}