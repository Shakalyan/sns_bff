package com.sns.sns_bff.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class AuthorizationException extends RuntimeException {

    @Getter
    private final HttpStatus status;

    public AuthorizationException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

}
