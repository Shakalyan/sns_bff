package com.sns.sns_bff.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class RegistrationDto {

    String username;

    String password;

    String email;

    String phone;

}
