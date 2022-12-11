package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.PlaylistsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class PlaylistsController {

    private final PlaylistsService playlistsService;

    @GetMapping("/api/playlists")
    public ResponseEntity<String> getPlaylists(@RequestHeader("Authorization") String token,
                                               @RequestParam Long userId) throws SnsApiException {
        return playlistsService.getPlaylists(token, userId);
    }

    @PostMapping("/api/playlists")
    public ResponseEntity<String> addNewPlaylist(@RequestHeader("Authorization") String token,
                                                 @RequestParam String playlistName,
                                                 @RequestParam MultipartFile cover) throws SnsApiException {
        return playlistsService.addNewPlaylist(token, playlistName, cover);
    }

    @GetMapping("/api/playlist/songs")
    public ResponseEntity<String> getSongsFromPlaylist(@RequestHeader("Authorization") String token,
                                                       @RequestParam Long playlistId) throws SnsApiException {
        return playlistsService.getSongsFromPlaylist(token, playlistId);
    }

}
