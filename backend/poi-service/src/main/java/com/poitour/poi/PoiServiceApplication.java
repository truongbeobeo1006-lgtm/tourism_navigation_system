package com.poitour.poi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class PoiServiceApplication {

    public static void main(String[] args) {
        // Cố định múi giờ để PostgreSQL không bị lỗi "Asia/Saigon"
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        System.setProperty("user.timezone", "Asia/Ho_Chi_Minh");
        
        SpringApplication.run(PoiServiceApplication.class, args);
    }
}
