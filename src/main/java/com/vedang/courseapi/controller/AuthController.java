package com.vedang.courseapi.controller;

import com.vedang.courseapi.dto.JwtResponse;
import com.vedang.courseapi.dto.LoginRequest;
import com.vedang.courseapi.dto.RegisterRequest;
import com.vedang.courseapi.dto.RegisterResponse;
import com.vedang.courseapi.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping({"/api/auth", "/api/auth/"})
public class AuthController {

    private final AuthService authService;

    @PostMapping({"/register", "/register/"})
    public RegisterResponse register(@RequestBody RegisterRequest registerRequest) {
        return authService.register(registerRequest);
    }

    @PostMapping({"/login", "/login/"})
    public JwtResponse login(@RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }


}
