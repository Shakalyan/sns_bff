package com.sns.sns_bff.controller;

import com.sns.sns_bff.snsApi.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

  private final TestService testService;

  @GetMapping
  public String test() {
    return testService.testApi();
  }

}
