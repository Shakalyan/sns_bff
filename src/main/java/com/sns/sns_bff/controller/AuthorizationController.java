package com.sns.sns_bff.controller;

import com.sns.sns_bff.model.User;
import com.sns.sns_bff.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthorizationController {

    private final UserService userService;

    @PostMapping("/authentication")
    @ResponseBody
    public ResponseEntity<String> authenticate(@RequestBody User user) {
        String token = userService.authenticate(user.getLogin(), user.getPassword());
        return ResponseEntity.ok(token);
    }

    @PostMapping("/registration")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User has been registered");
    }

}
