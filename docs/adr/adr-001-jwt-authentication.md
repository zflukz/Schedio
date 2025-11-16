# ADR-001: JWT Token Authentication

## Status
Accepted

## Context
The Schedio event management system requires user authentication to secure API endpoints and manage user sessions across frontend and backend.

## Decision
We will use JWT (JSON Web Tokens) for authentication with the following implementation:

- **Backend**: Spring Boot generates JWT tokens on successful login
- **Frontend**: Store JWT tokens in localStorage
- **API Communication**: Use Bearer token authentication for all protected endpoints
- **Token Storage**: Client-side localStorage for token persistence

## Rationale
- **Stateless**: JWT tokens are self-contained, reducing server-side session storage
- **Scalable**: No need for server-side session management
- **Cross-platform**: Works seamlessly between React frontend and Spring Boot backend
- **Standard**: Industry-standard authentication method

## Consequences
### Positive
- Simplified authentication flow
- No server-side session storage required
- Easy to implement across different platforms
- Built-in expiration handling

### Negative
- Token stored in localStorage (XSS vulnerability risk)
- Cannot revoke tokens before expiration
- Token size larger than session IDs

## Implementation
- **Backend**: JwtUtil class for token generation and validation
- **Frontend**: localStorage.setItem("token", result.token)
- **API Calls**: Authorization: Bearer ${token} header