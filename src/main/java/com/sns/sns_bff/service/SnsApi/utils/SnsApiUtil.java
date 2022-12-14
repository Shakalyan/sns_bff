package com.sns.sns_bff.service.SnsApi.utils;

import com.sns.sns_bff.exception.SnsApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SnsApiUtil {

    @Value("${backend.address}")
    private String backendAddress;
    private final RestTemplate restTemplate;

    private final FileManageUtil fileManageUtil;

    public ResponseEntity<String> sendRequest(String url, HttpMethod method, HttpEntity entity)
            throws SnsApiException {
        try {
            return restTemplate.exchange(url, method, entity, String.class);
        } catch (RestClientException e) {
            if (e instanceof ResourceAccessException) {
                throw new SnsApiException(e.getMessage(), HttpStatus.GATEWAY_TIMEOUT);
            } else {
                throw new SnsApiException(e.getMessage(), HttpStatus.BAD_GATEWAY);
            }
        }
    }

    public ResponseEntity<String> sendFile(String url, HttpMethod method, HttpEntity entity,
                                           String token, MultipartFile file) throws SnsApiException {
        Optional<String> urlToFile = fileManageUtil.saveFileAndGetUrl(file, token);
        if (urlToFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        url += urlToFile.get();
        try {
            return sendRequest(url, method, entity);
        } catch (SnsApiException e) {
            throw e;
        } finally {
            fileManageUtil.deleteFileAndDir(urlToFile.get());
        }
    }

    public HttpHeaders getBaseHeaders() {
        return new HttpHeaders();
    }

    public HttpHeaders getJsonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return headers;
    }

    public HttpHeaders getHeadersWithAuthorization(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", token);
        return headers;
    }

    public HttpHeaders getJsonHeadersWithAuthorization(String token) {
        HttpHeaders headers = getHeadersWithAuthorization(token);
        headers.add("Content-Type", "application/json");
        return headers;
    }

    public String makeUrl(String endpoint) {
        return String.format("%s/api%s", backendAddress, endpoint);
    }

}
