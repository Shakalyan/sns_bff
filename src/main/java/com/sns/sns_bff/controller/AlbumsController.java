package com.sns.sns_bff.controller;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.AlbumsService;
import com.sns.sns_bff.service.SnsApi.AuthorizationRedirector;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
public class AlbumsController {

    private final AlbumsService albumsService;
    private final AuthorizationRedirector redirector;

    @GetMapping("/api/albums")
    public ResponseEntity<String> getAlbums(@RequestHeader("Authorization") String token,
                                                  HttpServletResponse response,
                                                  @RequestParam Long performerId) throws SnsApiException {
        return redirector.check(albumsService.getAlbums(token, performerId), response);
    }

    @PostMapping("/api/albums")
    public ResponseEntity<String> addNewAlbum(@RequestHeader("Authorization") String token,
                                              HttpServletResponse response,
                                              @RequestParam MultipartFile cover,
                                              @RequestParam("name") String name) throws SnsApiException {
        return redirector.check(albumsService.addNewAlbum(token, name, cover), response);
    }

    @GetMapping("/api/album/songs")
    public ResponseEntity<String> getSongsFromAlbum(@RequestHeader("Authorization") String token,
                                                          HttpServletResponse response,
                                                          @RequestParam Long albumId) throws SnsApiException {
        return redirector.check(albumsService.getSongsFromAlbum(token, albumId), response);
    }

}
