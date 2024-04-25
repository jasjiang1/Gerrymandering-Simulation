package com.grizzlies.cse416;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@RestController
@EnableCaching 
public class GrizzliesCse416Application {

    public static void main(String[] args) {
        SpringApplication.run(GrizzliesCse416Application.class, args);
    }
}