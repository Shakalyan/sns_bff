package com.sns.sns_bff.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class AuthorizationResponseDto {

    String token;

    Long userId;

    String username;

    String avatarUrl;

    Boolean isPerformer;

}
