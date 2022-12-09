package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.dto.AlbumCreationDto;
import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.utils.FileManageUtil;
import com.sns.sns_bff.service.SnsApi.utils.SnsApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlbumsService {

    private final SnsApiUtil snsApiUtil;

    private final FileManageUtil fileManageUtil;

    public ResponseEntity<String> getAlbums(String token, Long performerId) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/albums?performerId=%d", performerId));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.GET, requestEntity);
    }

    public ResponseEntity<String> getSongsFromAlbum(String token, Long albumId) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/album/songs?albumId=%d", albumId));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.GET, requestEntity);
    }

    public ResponseEntity<String> addNewAlbum(String token, String name, MultipartFile cover) throws SnsApiException {
        Optional<String> urlToCover = fileManageUtil.saveFileAndGetUrl(cover, token);
        if (urlToCover.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        String url = snsApiUtil.makeUrl("/albums");
        HttpEntity<AlbumCreationDto> requestEntity = new HttpEntity<>(
                new AlbumCreationDto(name, urlToCover.get()),
                snsApiUtil.getJsonHeadersWithAuthorization(token)
        );
        return snsApiUtil.sendRequest(url, HttpMethod.POST, requestEntity);
    }

}
