# Multi-stage build for POI Service (Supports ARM64 Apple Silicon & AMD64)
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build JAR package (skip unit tests for fast packaging)
RUN mvn clean package -DskipTests -B

# Production Runtime Image (Official Multi-Arch JRE)
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy built artifact from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8082
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
