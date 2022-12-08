package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.AuthorizationRedirector;
import com.sns.sns_bff.service.SnsApi.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FindController {

    private final SearchService searchService;
    private final AuthorizationRedirector redirector;

    @GetMapping("/api/find")
    public ResponseEntity<List<Object>> find(@RequestHeader("Authorization") String token,
                                             HttpServletResponse response,
                                             @RequestParam String type,
                                             @RequestParam String word) throws SnsApiException {
        return redirector.check(searchService.findItems(token, type, word), response);
    }

}
