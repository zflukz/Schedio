package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
	"spring.datasource.url=jdbc:h2:mem:testdb;MODE=PostgreSQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE",
	"spring.datasource.driver-class-name=org.h2.Driver",
	"spring.datasource.username=sa",
	"spring.datasource.password=",
	"spring.jpa.hibernate.ddl-auto=create-drop",
	"spring.jpa.database-platform=org.hibernate.dialect.H2Dialect",
	"spring.jpa.show-sql=false",
	"spring.jpa.properties.hibernate.format_sql=false",
	"spring.sql.init.mode=never",
	"spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID:test-client-id}",
	"spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET:test-client-secret}",
	"jwt.secret=${JWT_SECRET:test-secret-key-for-testing-purposes-only-minimum-256-bits-required}",
	"jwt.expiration=${JWT_EXPIRATION:3600000}",
	"cors.allowed.origins=${CORS_ALLOWED_ORIGINS:*}"
})
class SchedioApplicationTests {

	@Test
	void contextLoads() {
		// Test passes if context loads
	}

}
