package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.PerformersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/performers")
@RequiredArgsConstructor
public class PerformersController {

    private final PerformersService performersService;

    @GetMapping
    public ResponseEntity<String> getLikedPerformers(@RequestHeader("Authorization") String token) throws SnsApiException {
        return performersService.getLikedPerformers(token);
    }

    @PostMapping
    public ResponseEntity<String> likePerformer(@RequestHeader("Authorization") String token,
                                                @RequestParam Long performerId,
                                                @RequestParam Boolean like) throws SnsApiException {
        return performersService.likePerformer(token, performerId, like);
    }

}
