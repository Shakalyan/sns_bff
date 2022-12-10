package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FindController {

    private final SearchService searchService;

    @GetMapping("/api/find")
    public ResponseEntity<String> find(@RequestHeader("Authorization") String token,
                                       @RequestParam String type,
                                       @RequestParam String word) throws SnsApiException {
        return searchService.findItems(token, type, word);
    }

}
