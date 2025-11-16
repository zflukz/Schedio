# ADR-003: Frontend Route Protection Strategy

## Status
Accepted

## Context
The React frontend needs to prevent unauthorized users from accessing protected pages and provide appropriate feedback when access is denied.

## Decision
We will implement a ProtectedRoute component that:

- Validates user authentication and authorization before rendering
- Provides loading states during authentication checks
- Shows access denied alerts with specific role requirements
- Redirects users to their appropriate role-based home pages

## Implementation Details
### ProtectedRoute Component
```tsx
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Access Control Flow
1. Check for JWT token in localStorage
2. Fetch user profile from backend API
3. Compare user role with required role
4. Show alert if access denied
5. Redirect to role-appropriate page

### Redirection Strategy
- **Attendee** accessing admin/organizer → redirect to `/`
- **Organizer** accessing admin → redirect to `/organizers-dashboard`
- **Admin** accessing organizer → redirect to `/admin-dashboard`

## Rationale
- **User Experience**: Clear feedback on access denial
- **Security**: Client-side validation as first line of defense
- **Navigation**: Automatic redirection to appropriate areas
- **Reusability**: Single component for all protected routes

## Consequences
### Positive
- Consistent protection across all routes
- Clear user feedback on access issues
- Automatic role-based navigation
- Reusable component pattern

### Negative
- Additional API calls for role validation
- Client-side security can be bypassed (requires backend validation)
- Potential for loading delays on route changes