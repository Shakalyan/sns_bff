package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.exception.SnsApiException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SnsApiUtil snsApiUtil;

    public ResponseEntity<List<Object>> findItems(String token, String type, String word) throws SnsApiException {
        String url = snsApiUtil.makeUrl(String.format("/find?type=%s&word=%s", type, word));
        HttpEntity<Object> requestEntity = new HttpEntity<>(null, snsApiUtil.getHeadersWithAuthorization(token));
        return snsApiUtil.sendRequest(url, HttpMethod.GET, requestEntity, Object[].class);
    }

}
