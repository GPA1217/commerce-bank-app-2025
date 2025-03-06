package com.backend.backend;
import com.backend.backend.User;
import com.backend.backend.UserService; 

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend to access API
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WebScraper webScraper;

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // ✅ Fix Web Scraper URL handling
    @GetMapping("/scrape")
    public String scrapeUrl(@RequestParam String url) {
        return webScraper.scrapeUrl(url);
    }
}
