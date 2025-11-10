# ADR-002: Role-Based Access Control (RBAC)

## Status
Accepted

## Context
The Schedio system needs to control access to different features based on user roles. Different user types (attendees, organizers, admins) should have different permissions and access levels.

## Decision
We will implement Role-Based Access Control with three distinct roles:

- **ATTENDEE**: Can browse and register for events
- **ORGANIZER**: Can create and manage their own events
- **ADMIN**: Can manage users and all system features

## Implementation Strategy
### Backend Protection
- Spring Boot interceptor validates user roles against route patterns
- Path-based access control: `/admin/*` and `/organizer/*`
- HTTP status codes: 401 (Unauthorized), 403 (Forbidden)

### Frontend Protection
- ProtectedRoute component wraps sensitive pages
- Role validation before rendering components
- Automatic redirection to appropriate dashboards

## Role Mapping
- Backend roles: `ADMIN`, `ORGANIZER`, `ATTENDEE`
- Frontend roles: `"admin"`, `"organizer"`, `"attendee"`
- Navigation paths:
  - Admin → `/admin-dashboard`
  - Organizer → `/organizers-dashboard`
  - Attendee → `/`

## Rationale
- **Security**: Both frontend and backend validation
- **User Experience**: Clear role-based navigation
- **Scalability**: Easy to add new roles or permissions
- **Separation of Concerns**: Different interfaces for different user types

## Consequences
### Positive
- Clear security boundaries
- Intuitive user experience
- Maintainable permission system
- Defense in depth (frontend + backend)

### Negative
- Additional complexity in routing
- Need to maintain role consistency across systems
- Potential for role synchronization issues