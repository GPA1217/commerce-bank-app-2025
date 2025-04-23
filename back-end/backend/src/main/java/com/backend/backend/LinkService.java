package com.backend.backend;

import com.example.my_backend.Domain.CertificateInfoDTO;
import com.example.my_backend.Domain.Customer;
import com.example.my_backend.Domain.Link;
import com.example.my_backend.Domain.UrlAnalysisResult;
import com.example.my_backend.Repository.CustomerRepository;
import com.example.my_backend.Repository.LinkRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.net.ssl.HttpsURLConnection;
import java.io.IOException;
import java.net.URL;
import java.security.cert.*;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.net.ssl.SSLSession;

@AllArgsConstructor
@Service
public class LinkService {

    private final LinkRepository linkRepository;
    private final CustomerRepository customerRepository;

    public Link create(Link url, String userId){

        Customer customer = customerRepository.findByUserId(userId).orElse(null);


        if(customer != null){
            url.setCustomer(customer);
        }
        return linkRepository.save(url);
    }
    public void analyze(Long id){
        Link url = linkRepository.findById(id).orElse(null);
        try {
            URL URL = new URL(url.getUrl());
            System.out.println("url :" + url.getUrl());
            System.out.println("Name :" + url.getName());
            HttpsURLConnection connection = (HttpsURLConnection) URL.openConnection();
            connection.connect();
            SSLSession session = connection.getSSLSession().get();


            url.setCerts(Arrays.asList(connection.getServerCertificates()));

            url.setResponseCode(connection.getResponseCode());
            url.setResponseMessage(connection.getResponseMessage());
            if(url.getResponseCode()== HttpsURLConnection.HTTP_OK){
                url.setResponseHeader(connection.getHeaderFields());
            }
            url.setCipher(connection.getCipherSuite());

            url.setProtocol(session.getProtocol());

            connection.disconnect();
        } catch (IOException e) {
            System.err.println("An error occurred: " + e.getMessage());
        }
        linkRepository.save(url);
    }
    public Link update(Link url){
        System.out.println("Id :" + url.getUrl_id());
        System.out.println("Name :" + url.getName());
        System.out.println("url :" + url.getUrl());
        System.out.println("response Code :" + url.getResponseCode());
        System.out.println("Message:" + url.getResponseMessage());
        System.out.println("Protocol :" + url.getProtocol());
        System.out.println("Cipher :" + url.getCipher());
        System.out.println("Certs :" + url.getCerts());
        System.out.println("Header :" + url.getResponseHeader());
        return linkRepository.save(url);
    }
    public void delete(Link url){
        linkRepository.delete(url);
    }



    public UrlAnalysisResult analyze(String urlString) {
        try {
            URL url = new URL(urlString);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.connect();

            int responseCode = connection.getResponseCode();
            String cipherSuite = connection.getCipherSuite();


            Map<String, String> headers = new LinkedHashMap<>();
            for (Map.Entry<String, java.util.List<String>> entry : connection.getHeaderFields().entrySet()) {
                if (entry.getKey() != null && entry.getValue() != null && !entry.getValue().isEmpty()) {
                    headers.put(entry.getKey(), entry.getValue().get(0));
                }
            }

            // 인증서 상세 정보 추출
            List<CertificateInfoDTO> certificates = new ArrayList<>();
            Certificate[] certs = connection.getServerCertificates();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            for (Certificate cert : certs) {
                if (cert instanceof X509Certificate x509) {
                    CertificateInfoDTO certDTO = new CertificateInfoDTO(
                            x509.getSubjectDN().getName(),
                            x509.getIssuerDN().getName(),
                            sdf.format(x509.getNotBefore()),
                            sdf.format(x509.getNotAfter()),
                            x509.getSerialNumber().toString(),
                            x509.getSigAlgName()
                    );
                    certificates.add(certDTO);
                }
            }

            connection.disconnect();

            return new UrlAnalysisResult(
                    String.valueOf(responseCode),
                    cipherSuite,
                    headers,
                    certificates
            );

        } catch (IOException | RuntimeException e) {
            throw new RuntimeException("Error analyzing URL: " + e.getMessage());
        }
    }


}