package com.sns.sns_bff.service.SnsApi;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class AuthorizationRedirector {

    public ResponseEntity check(ResponseEntity serviceResponse, HttpServletResponse httpServletResponse) {
        if (serviceResponse.getStatusCode() == HttpStatus.UNAUTHORIZED) {
            try {
                httpServletResponse.sendRedirect("/");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        }
        return serviceResponse;
    }

}
