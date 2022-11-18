package com.sns.sns_bff.snsApi;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TestService {

  public String testApi() {
    String json = "{\"username\": \"test\", \"password\": \"123\", \"email\": \"some@mail.com\", \"phone\": \"911\"}";
    String url = "http://backend/api/signup";
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-Type", "application/json");
    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<String> request = new HttpEntity<>(json, headers);
    return restTemplate.postForObject(url, request, String.class);
  }

}
