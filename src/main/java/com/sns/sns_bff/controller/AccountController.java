package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.AccountService;
import com.sns.sns_bff.service.SnsApi.AuthorizationRedirector;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AuthorizationRedirector redirector;

    private final AccountService accountService;

    @PostMapping("/api/account/avatar")
    public ResponseEntity<String> changeAvatar(@RequestHeader("Authorization") String token,
                                               HttpServletResponse response,
                                               @RequestParam MultipartFile avatar) throws SnsApiException {
        return redirector.check(accountService.changeAvatar(token, avatar), response);
    }

}
