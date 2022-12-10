package com.sns.sns_bff.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class SnsApiException extends Exception {

    @Getter
    private final HttpStatus status;

    public SnsApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

}
