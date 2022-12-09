package com.sns.sns_bff.service.SnsApi;

import com.sns.sns_bff.dto.AuthorizationRequestDto;
import com.sns.sns_bff.dto.RegistrationDto;
import com.sns.sns_bff.exception.SnsApiException;
import com.sns.sns_bff.service.SnsApi.utils.SnsApiUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizationService {

    private final SnsApiUtil snsApiUtil;

    public ResponseEntity<String> register(RegistrationDto registrationDto) throws SnsApiException {
        String url = snsApiUtil.makeUrl("/register");
        HttpEntity<RegistrationDto> requestEntity = new HttpEntity<>(registrationDto, snsApiUtil.getJsonHeaders());
        return snsApiUtil.sendRequest(url, HttpMethod.POST, requestEntity);
    }

    public ResponseEntity<String> authorize(AuthorizationRequestDto authorizationRequestDto) throws SnsApiException {
        String url = snsApiUtil.makeUrl("/auth");
        HttpEntity<AuthorizationRequestDto> requestEntity = new HttpEntity<>(authorizationRequestDto, snsApiUtil.getJsonHeaders());
        return snsApiUtil.sendRequest(url, HttpMethod.POST, requestEntity);
    }

}
