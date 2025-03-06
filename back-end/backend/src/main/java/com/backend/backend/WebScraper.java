package com.backend.backend;

import org.jsoup.Jsoup;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.nio.charset.StandardCharsets;
import java.net.URLEncoder;
import java.io.IOException;

@Service
public class WebScraper {

    private final RestTemplate restTemplate;

    public WebScraper(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String scrapeUrl(String url) {
        try {
            String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
            String html = restTemplate.getForObject(encodedUrl, String.class);
            return Jsoup.parse(html).text(); // Extract readable text from HTML
        } catch (IOException e) {
            return "Error fetching URL: " + e.getMessage();
        } catch (Exception e) {
            return "Unexpected error: " + e.getMessage();
        }
    }
}
