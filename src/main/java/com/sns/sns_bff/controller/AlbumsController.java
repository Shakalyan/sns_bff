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
                                              @RequestParam String albumName) throws SnsApiException {
        return albumsService.addNewAlbum(token, albumName, cover);
    }

    @GetMapping("/api/album/songs")
    public ResponseEntity<String> getSongsFromAlbum(@RequestHeader("Authorization") String token,
                                                    @RequestParam Long albumId) throws SnsApiException {
        return albumsService.getSongsFromAlbum(token, albumId);
    }

    @PostMapping("/api/album/songs")
    public ResponseEntity<String> addSongToAlbum(@RequestHeader("Authorization") String token,
                                                 @RequestParam Long albumId,
                                                 @RequestParam String songName,
                                                 @RequestParam MultipartFile songFile) throws SnsApiException {
        return albumsService.addSongToAlbum(token, albumId, songName, songFile);
    }

    @DeleteMapping("/api/album/songs")
    public ResponseEntity<String> deleteSongFromAlbum(@RequestHeader("Authorization") String token,
                                                      @RequestParam Long songId) throws SnsApiException {
        return albumsService.deleteSongFromAlbum(token, songId);
    }

    @DeleteMapping("/api/albums")
    public ResponseEntity<String> deleteAlbum(@RequestHeader("Authorization") String token,
                                              @RequestParam Long albumId) throws SnsApiException {
        return albumsService.deleteAlbum(token, albumId);
    }

}
