package com.backend.backend;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.security.cert.*;
import java.util.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "links")
public class Link {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long url_id;
    private String Name;
    private String url;

    private int ResponseCode;

    private String ResponseMessage;

    @ElementCollection
    private List<Certificate> certs = new ArrayList<>();

    private String Protocol;

    private String Cipher;

    @Transient
    private Map<String, List<String>> ResponseHeader = new HashMap<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}