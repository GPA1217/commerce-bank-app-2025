package com.backend.backend;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @Column(name="email")
    private String email;

    @Column(name = "Username")
    private String Username;


    @JsonIgnore // Prevents exposing password in API responses
    private String password;

    @OneToMany(mappedBy = "user" )
    private List<Link> urls = new ArrayList<>();
}
