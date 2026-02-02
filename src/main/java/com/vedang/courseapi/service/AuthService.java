package com.vedang.courseapi.service;

import com.vedang.courseapi.dto.JwtResponse;
import com.vedang.courseapi.dto.LoginRequest;
import com.vedang.courseapi.dto.RegisterRequest;
import com.vedang.courseapi.dto.RegisterResponse;
import com.vedang.courseapi.model.Role;
import com.vedang.courseapi.model.User;
import com.vedang.courseapi.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public RegisterResponse register(RegisterRequest registerRequest) {
        if (userRepo.existsByEmailIgnoreCase(registerRequest.email())) {
            throw new RuntimeException("This user already exists in the database");
        }

        User user = User.builder()
                .email(registerRequest.email())
                .password(passwordEncoder.encode(registerRequest.password()))
                .role(Role.USER)
                .build();

        userRepo.save(user);

        return new RegisterResponse(user.getId(), user.getEmail(), user.getRole().name(), "User registered successfully");
    }

    public JwtResponse login(LoginRequest loginRequest) {
        User user = userRepo.findByEmailIgnoreCase(loginRequest.email()).orElseThrow();

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new RuntimeException("wrong password bro");
        }

        String token = jwtService.generateToken(user);
        return new JwtResponse(token, user.getEmail(), jwtService.extractExpiration(token));

    }
}
