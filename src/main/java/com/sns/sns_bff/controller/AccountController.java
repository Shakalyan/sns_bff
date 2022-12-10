package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/api/account/avatar")
    public ResponseEntity<String> changeAvatar(@RequestHeader("Authorization") String token,
                                               @RequestParam MultipartFile avatar) throws SnsApiException {
        return accountService.changeAvatar(token, avatar);
    }

}
