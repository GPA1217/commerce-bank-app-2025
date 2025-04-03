package com.backend.backend;

import com.example.my_backend.Domain.Link;
import com.example.my_backend.Service.LinkService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
public class LinkController {

    private final LinkService linkService;

    @CrossOrigin
    @PostMapping("/url")
    public ResponseEntity<?> save(@RequestBody Link url){

        System.out.println("Name : " + url.getName());
        System.out.println("Password : "  +url.getUrl());

        String userId = "test_id";

        return new ResponseEntity<>(linkService.create(url,userId), HttpStatus.CREATED);

    }
    @PutMapping("/url/{url_id}")
    public void analyze(String url,String customerId){
         linkService.analyze(url,customerId);
    }
    @DeleteMapping("/url/{url_id}")
    public void delete(Link url){
        linkService.delete(url);
    }
}