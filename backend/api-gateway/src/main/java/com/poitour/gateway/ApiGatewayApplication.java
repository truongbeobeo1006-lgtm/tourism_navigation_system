package com.poitour.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        System.setProperty("user.timezone", "Asia/Ho_Chi_Minh");
        
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    /**
     * Trang chủ kiểm tra Gateway: GET http://localhost:8080/
     * Trả về thông tin trạng thái các dịch vụ trong hệ thống
     */
    @Bean
    public RouterFunction<ServerResponse> homeRoute() {
        return RouterFunctions.route(GET("/"), request -> {
            Map<String, Object> status = new HashMap<>();
            status.put("gateway", "POI Tourism Navigation API Gateway");
            status.put("status", "ONLINE");
            status.put("port", 8080);
            status.put("timestamp", LocalDateTime.now());
            status.put("routes", Map.of(
                    "/api/v1/pois/**", "Chuyển tiếp tới poi-service (:8082)",
                    "/api/v1/auth/**", "Chuyển tiếp tới auth-service (:8081)",
                    "/api/v1/tracking/**", "Chuyển tiếp tới tracking-service (:8083)"
            ));
            return ServerResponse.ok().bodyValue(status);
        });
    }
}
