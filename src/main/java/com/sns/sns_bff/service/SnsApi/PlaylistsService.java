package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.utils.SnsApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PlaylistsService {

    private final SnsApiUtil snsApiUtil;

    public ResponseEntity<String> getPlaylists(String token, Long userId) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/playlists?userId=%d", userId));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.GET, requestEntity);
    }

    public ResponseEntity<String> addNewPlaylist(String token, String playlistName, MultipartFile cover) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/playlists?playlistName=%s&coverUrl=", playlistName));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendFile(url, HttpMethod.POST, requestEntity, token, cover);
    }

    public ResponseEntity<String> getSongsFromPlaylist(String token, Long playlistId) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/playlist/songs?playlistId=%d", playlistId));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.GET, requestEntity);
    }

}
