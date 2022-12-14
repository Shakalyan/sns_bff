package com.sns.sns_bff.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestTemplateConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder().errorHandler(new RestTemplateResponseErrorHandler())
                                        .setConnectTimeout(Duration.ofSeconds(1))
                                        .build();
    }

}
