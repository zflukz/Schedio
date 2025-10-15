# ADR-005: Technology Stack Selection

## Status
Accepted

## Context
The Schedio event management system requires a modern, scalable technology stack that supports rapid development and deployment.

## Decision
We will use the following technology stack:

### Frontend
- **React 18** with TypeScript
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Fetch API** for HTTP requests

### Backend
- **Spring Boot 3** with Java
- **Spring Security** for authentication
- **JPA/Hibernate** for database operations
- **Maven** for dependency management

### Database
- **H2/PostgreSQL** (configurable)

### Deployment
- **Docker** with docker-compose
- **Separate containers** for frontend and backend

## Rationale
### Frontend Choices
- **React + TypeScript**: Type safety and modern development experience
- **Tailwind CSS**: Utility-first CSS for rapid UI development
- **React Router**: Standard routing solution for React applications

### Backend Choices
- **Spring Boot**: Mature, enterprise-ready framework
- **JWT**: Stateless authentication suitable for microservices
- **JPA**: Standard ORM for Java applications

### Deployment Choices
- **Docker**: Consistent deployment across environments
- **Separate containers**: Independent scaling and deployment

## Consequences
### Positive
- Modern, maintainable codebase
- Strong typing with TypeScript
- Rapid UI development with Tailwind
- Enterprise-grade backend with Spring Boot
- Containerized deployment

### Negative
- Learning curve for team members unfamiliar with technologies
- Build complexity with multiple containers
- Potential over-engineering for simple use cases

## Alternatives Considered
- **Next.js**: Rejected due to preference for separate frontend/backend
- **Express.js**: Rejected in favor of Spring Boot's enterprise features
- **Bootstrap**: Rejected in favor of Tailwind's utility-first approach