package com.sns.sns_bff.controller;

import com.sns.sns_bff.dto.AuthorizationDto;
import com.sns.sns_bff.dto.RegistrationDto;
import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.SnsApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthorizationController {

    private final SnsApiService snsApiService;

    @PostMapping("/auth")
    @ResponseBody
    public ResponseEntity<String> authorize(@RequestBody AuthorizationDto authorizationDto) throws SnsApiException {
        return snsApiService.authorize(authorizationDto);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody RegistrationDto registrationDto) throws SnsApiException {
        return snsApiService.register(registrationDto);
    }

}
