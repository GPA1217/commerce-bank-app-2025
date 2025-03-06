package com.backend.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Password encoder for securely handling passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Updated configuration for Spring Security 6.x
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF (use with caution in production)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll() // Allow access to all /api/** endpoints
                .anyRequest().authenticated() // Require authentication for other requests
            )
            .formLogin(form -> form // Custom form login configuration
                .loginPage("/login") // Optional: Specify a custom login page
                .permitAll() // Allow everyone to access the login page
            );
        
        // No httpBasic() used here to avoid deprecation warning

        return http.build();
    }
}
