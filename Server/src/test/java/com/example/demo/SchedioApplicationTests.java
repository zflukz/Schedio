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
	"spring.security.oauth2.client.registration.google.client-id=test-client-id",
	"spring.security.oauth2.client.registration.google.client-secret=test-client-secret",
	"spring.security.oauth2.client.registration.google.redirect-uri=http://localhost:8080/test",
	"spring.security.oauth2.client.registration.google.scope=openid,profile,email",
	"spring.security.oauth2.client.provider.google.authorization-uri=https://accounts.google.com/o/oauth2/v2/auth",
	"spring.security.oauth2.client.provider.google.token-uri=https://oauth2.googleapis.com/token",
	"spring.security.oauth2.client.provider.google.user-info-uri=https://www.googleapis.com/oauth2/v3/userinfo",
	"spring.security.oauth2.client.provider.google.user-name-attribute=sub",
	"jwt.secret=test-secret-key-for-testing-purposes-only-minimum-256-bits-required",
	"jwt.expiration=3600000",
	"cors.allowed.origins=*",
	"vercel.blob.token=test-blob-token"
})
class SchedioApplicationTests {

	@Test
	void contextLoads() {
		// Test passes if context loads
	}

}
