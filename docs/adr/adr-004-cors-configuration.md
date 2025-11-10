# ADR-004: CORS Configuration Strategy

## Status
Accepted

## Context
The React frontend (localhost:3000) needs to communicate with the Spring Boot backend (localhost:8080). Cross-Origin Resource Sharing (CORS) configuration is required to allow these requests, especially for Authorization headers.

## Decision
We will implement CORS using a custom servlet filter that:

- Allows requests from `http://localhost:3000`
- Permits all HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
- Explicitly allows `Content-Type` and `Authorization` headers
- Handles preflight OPTIONS requests
- Enables credentials for authenticated requests

## Implementation
### Custom CORS Filter
```java
@Component
public class CorsFilter implements Filter {
    // Explicit header and origin configuration
    // Handles preflight OPTIONS requests
}
```

### Configuration Details
- **Allowed Origin**: `http://localhost:3000`
- **Allowed Methods**: `GET, POST, PUT, DELETE, OPTIONS`
- **Allowed Headers**: `Content-Type, Authorization`
- **Credentials**: Enabled for JWT token authentication

## Rationale
- **Development Environment**: Supports local development setup
- **Authorization Headers**: Ensures JWT tokens can be sent cross-origin
- **Preflight Handling**: Properly handles browser preflight requests
- **Security**: Restricts origins to known frontend URL

## Consequences
### Positive
- Enables frontend-backend communication
- Supports JWT authentication across origins
- Handles all necessary HTTP methods
- Proper preflight request handling

### Negative
- Development-specific configuration (needs production update)
- Additional filter processing overhead
- Potential security risk if misconfigured

## Production Considerations
- Update allowed origins for production domains
- Consider more restrictive CORS policies
- Implement proper SSL/TLS for production