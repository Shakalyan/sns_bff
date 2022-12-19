package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.utils.SnsApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerformersService {

    private final SnsApiUtil snsApiUtil;

    public ResponseEntity<String> likePerformer(String token, Long performerId, Boolean like) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/performers?performerId=%d&like=%b", performerId, like));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.POST, requestEntity);
    }

    public ResponseEntity<String> getLikedPerformers(String token) throws SnsApiException {
        String url = snsApiUtil.makeUrl("/performers");
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.GET, requestEntity);
    }

}
