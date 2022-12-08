package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.exception.SnsApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SnsApiUtil {

    @Value("${backend.address}")
    private String backendAddress;
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> sendRequest(String url, HttpMethod method, HttpEntity entity)
            throws SnsApiException {
        try {
            return restTemplate.exchange(url, method, entity, String.class);
        } catch (Exception e) {
            throw new SnsApiException(e.getMessage());
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
