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
public class PerformerController {

    private final SnsApiService snsApiService;

    @GetMapping("/api/{token}/albums")
    public ResponseEntity<List<Object>> getAlbums(@PathVariable String token, @RequestParam Long performerId) throws SnsApiException {
        return snsApiService.getAlbums(token, performerId);
    }

    @GetMapping("/api/{token}/album/songs")
    public ResponseEntity<List<Object>> getSongsFromAlbum(@PathVariable String token, @RequestParam Long albumId) throws SnsApiException {
        return snsApiService.getSongsFromAlbum(token, albumId);
    }

}
