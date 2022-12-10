package com.sns.sns_bff.controller;

import com.sns.sns_bff.dto.AuthorizationRequestDto;
import com.sns.sns_bff.dto.RegistrationDto;
import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthorizationController {

    private final AuthorizationService authorizationService;

    @PostMapping("/auth")
    public ResponseEntity<String> authorize(@RequestBody AuthorizationRequestDto authorizationRequestDto) throws SnsApiException {
        return authorizationService.authorize(authorizationRequestDto);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegistrationDto registrationDto) throws SnsApiException {
        System.out.println(registrationDto);
        return authorizationService.register(registrationDto);
    }

}
