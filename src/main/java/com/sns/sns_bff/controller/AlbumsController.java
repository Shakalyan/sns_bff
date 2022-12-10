package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.AlbumsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class AlbumsController {

    private final AlbumsService albumsService;

    @GetMapping("/api/albums")
    public ResponseEntity<String> getAlbums(@RequestHeader("Authorization") String token,
                                            @RequestParam Long performerId) throws SnsApiException {
        return albumsService.getAlbums(token, performerId);
    }

    @PostMapping("/api/albums")
    public ResponseEntity<String> addNewAlbum(@RequestHeader("Authorization") String token,
                                              @RequestParam MultipartFile cover,
                                              @RequestParam("name") String name) throws SnsApiException {
        return albumsService.addNewAlbum(token, name, cover);
    }

    @GetMapping("/api/album/songs")
    public ResponseEntity<String> getSongsFromAlbum(@RequestHeader("Authorization") String token,
                                                    @RequestParam Long albumId) throws SnsApiException {
        return albumsService.getSongsFromAlbum(token, albumId);
    }

}
