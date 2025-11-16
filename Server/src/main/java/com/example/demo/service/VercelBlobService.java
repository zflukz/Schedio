package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class VercelBlobService {

    @Value("${vercel.blob.token}")
    private String blobToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public String uploadToBlob(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(blobToken);
        headers.setContentType(MediaType.parseMediaType(file.getContentType()));
        headers.set("x-vercel-filename", filename);

        HttpEntity<byte[]> request = new HttpEntity<>(file.getBytes(), headers);
        
        String uploadUrl = "https://blob.vercel-storage.com/" + filename + "?access=public";
        
        ResponseEntity<Map> response = restTemplate.exchange(uploadUrl, HttpMethod.PUT, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return (String) response.getBody().get("url");
        } else {
            throw new RuntimeException("Failed to upload to Vercel Blob");
        }
    }
}
