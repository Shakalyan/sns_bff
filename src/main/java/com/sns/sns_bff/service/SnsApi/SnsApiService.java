package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.dto.AuthorizationDto;
import com.sns.sns_bff.dto.RegistrationDto;
import com.sns.sns_bff.dto.SongDto;
import com.sns.sns_bff.exception.SnsApiException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class SnsApiService {

    private final String baseURL = "http://localhost:8090/api";
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> register(RegistrationDto registrationDto) throws SnsApiException {
        String url = baseURL + "/register";
        HttpEntity<RegistrationDto> requestEntity = new HttpEntity<>(registrationDto, getJsonHeaders());
        return sendRequest(url, HttpMethod.POST, requestEntity, String.class);
    }

    public ResponseEntity<String> authorize(AuthorizationDto authorizationDto) throws SnsApiException {
        String url = baseURL + "/auth";
        HttpEntity<AuthorizationDto> requestEntity = new HttpEntity<>(authorizationDto, getJsonHeaders());
        return sendRequest(url, HttpMethod.POST, requestEntity, String.class);
    }

    public ResponseEntity<List<Object>> findItems(String token, String type, String word) throws SnsApiException {
        String url = String.format("%s/%s/find?type=%s&word=%s", baseURL, token, type, word);
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, getBaseHeaders());
        return sendRequest(url, HttpMethod.GET, null, Object[].class);
    }

    private ResponseEntity sendRequest(String url, HttpMethod method, HttpEntity entity, Class responseClass)
            throws SnsApiException {
        try {
            return restTemplate.exchange(url, method, entity, responseClass);
        } catch (Exception e) {
            throw new SnsApiException(e.getMessage());
        }
    }

    private HttpHeaders getBaseHeaders() {
        return new HttpHeaders();
    }

    private HttpHeaders getJsonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return headers;
    }

}
