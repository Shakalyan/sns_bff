package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.SnsApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FindController {

    private final SnsApiService snsApiService;

    @GetMapping("/api/{token}/find")
    public ResponseEntity<List<Object>> find(@PathVariable String token,
                                             @RequestParam String type,
                                             @RequestParam String word) throws SnsApiException {
        return snsApiService.findItems(token, type, word);
    }

}
