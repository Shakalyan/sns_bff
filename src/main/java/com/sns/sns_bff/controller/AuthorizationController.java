package com.sns.sns_bff.controller;

import com.sns.sns_bff.dto.Response;
import com.sns.sns_bff.model.User;
import com.sns.sns_bff.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/")
public class AuthorizationController {

    private final UserService userService;

    @Autowired
    AuthorizationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("authentication")
    @ResponseBody
    public ResponseEntity authenticate(@RequestBody User user) {
        Response response = userService.authenticate(user.getLogin(), user.getPassword());
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PostMapping("registration")
    @ResponseBody
    public ResponseEntity register(@RequestBody User user) {
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

}
