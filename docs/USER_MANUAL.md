# Schedio User Manual
**Version:** 2.0.0  
**Last Updated:** November 2025

---

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Attendee Features](#attendee-features)
4. [Organizer Features](#organizer-features)
5. [Admin Features](#admin-features)
6. [System Requirements](#system-requirements)

---

## Introduction

Schedio is a comprehensive event management platform that enables users to discover, create, and manage events with a robust role-based access control system. The platform supports three user roles: **Attendees**, **Organizers**, and **Admins**, each with specific capabilities and permissions.

**Key Features:**
- Event discovery and registration
- Event creation and management
- User management and role administration
- Event approval workflow
- Real-time dashboard analytics
- Google OAuth2 integration

---

## Getting Started

### Accessing the Application

1. **Open your web browser** and navigate to the application URL
2. **Sign In** using one of these methods:
   - Username and password
   - Google account (OAuth2)

### First Time Login

1. Click **"Sign In"** button on the homepage
2. Choose your login method:
   - **Manual Login:** Enter username and password
   - **Google Login:** Click "Sign in with Google" button
3. After successful login, you'll be redirected to the appropriate dashboard based on your role

### User Roles

- **Attendee (User):** Can browse and join events
- **Organizer:** Can create, manage events, and view registrations
- **Admin:** Full system access including user management and event approval

---

## Attendee Features

### 1. Browse Events

**Homepage:**
- View upcoming events in the "Don't Miss These Events" section
- Browse all approved events
- Use advanced filters to find specific events

**Event Filters:**
- **Search:** Find events by title, location, or organizer
- **Categories:** Filter by event categories (Workshop, Academic, Art, Culture, Contest, etc.)
- **Date Range:** Filter events by specific date ranges
- **Status:** View event status and availability

### 2. View Event Details

1. Click on any event card
2. View comprehensive event information:
   - Event title and description
   - Start and end date/time
   - Location and capacity
   - Activity hours
   - Event categories/tags
   - Organizer information and contact details
   - Event poster and additional files
   - Registration count and available slots
   - Walk-in availability

### 3. Event Registration

**Join Events:**
1. Navigate to event details page
2. Click **"Join Event"** button
3. Receive confirmation message
4. Event appears in "My Events" section

**Registration Management:**
- View registration status
- Unregister from events (if allowed)
- Track registration history

### 4. My Events

**Access your registered events:**
1. Click **"My Events"** in navigation bar
2. View all events you've joined with pagination
3. Options available:
   - View detailed event information
   - Unregister from events
   - Filter and search your events

### 5. User Profile

**View/Edit Profile:**
1. Click profile icon in navigation bar
2. View your information:
   - Username and display name
   - Email address
   - Phone number
   - Current role
3. Update profile information
4. Change password (if using manual login)

---

## Organizer Features

### 1. Organizer Dashboard

**Access:** Organizers are redirected to a specialized dashboard showing:
- **Statistics Overview:**
  - Total events created
  - Approved events count
  - Pending approval events
  - Rejected events count

### 2. Event Creation

**Create New Events:**
1. Click **"Create Event"** button on organizer dashboard
2. Fill in event details:
   - **Basic Information:** Title, description, organizer details
   - **Schedule:** Start/end dates and times, activity hours
   - **Logistics:** Location, capacity, walk-in availability
   - **Categories:** Select relevant event categories
   - **Media:** Upload event poster and PDF files
   - **Contact:** Event contact email and phone

3. Submit for approval (events require admin approval)

### 3. Event Management

**My Events Dashboard:**
- View all created events with status indicators
- Filter events by approval status (Pending, Approved, Rejected)
- Search and filter by date range
- Pagination for large event lists

**Event Actions:**
- **Edit Events:** Update event details (triggers re-approval if already approved)
- **Cancel Events:** Cancel events with confirmation
- **Delete Events:** Soft delete events
- **View Registrations:** See who registered for events

### 4. Registration Management

**View Event Registrations:**
1. Access event details from organizer dashboard
2. View list of registered attendees
3. Export registration data
4. Monitor registration counts and capacity

### 5. Event Status Tracking

**Approval Workflow:**
- **Pending:** Newly created events awaiting admin approval
- **Approved:** Events approved by admin and visible to attendees
- **Rejected:** Events rejected by admin with feedback
- **Edit Requested:** Approved events that have been modified

---

## Admin Features

### 1. Admin Dashboard

**Comprehensive Overview:**
- **System Statistics:**
  - Total events in system
  - Approved events count
  - Pending approvals
  - Rejected events
- **Event Management:** Access to all events regardless of organizer
- **User Management:** Full user administration capabilities

### 2. Event Approval System

**Event Review Process:**
1. View all pending events requiring approval
2. Review event details thoroughly
3. **Approval Actions:**
   - **Approve:** Make event visible to attendees
   - **Reject:** Reject with mandatory feedback comment
   - **Request Changes:** Provide feedback for improvements

**Approval Filters:**
- Filter by approval status
- Search by event title or organizer
- Filter by date range
- View approval history

### 3. User Management

**Access User Management:**
1. Navigate to "User Management" from admin dashboard
2. View comprehensive user list with pagination

**User Administration:**
- **View Users:** See all registered users with details
- **Search Users:** Find users by name, email, or username
- **Role Management:** Change user roles between:
  - Attendee (User)
  - Organizer
  - Admin
- **User Actions:**
  - Ban users (removes access)
  - View user activity
  - Filter by user roles

### 4. System Administration

**Event Management:**
- View and manage all events in the system
- Override organizer permissions
- Force approve/reject events
- Access detailed event analytics

**Data Management:**
- Export user and event data
- Monitor system usage
- View registration statistics

---

## Common Features

### 1. Navigation

**Responsive Navigation Bar:**
- Home/Dashboard access
- My Events (for attendees)
- Create Event (for organizers)
- User Management (for admins)
- Profile management
- Sign out option

### 2. Search and Filtering

**Advanced Filtering Options:**
- Text search across multiple fields
- Category-based filtering
- Date range selection
- Status-based filtering
- Real-time filter updates

### 3. Pagination

**Efficient Data Display:**
- Configurable page sizes (3, 6, 9, 12 items)
- Page navigation controls
- Total count display
- Responsive design for mobile devices

### 4. Sign Out

1. Click profile icon in navigation bar
2. Select **"Sign Out"**
3. Session cleared and redirected to sign-in page

---

## System Requirements

### For Users

**Browser Requirements:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

**Internet Connection:**
- Stable internet connection required
- Minimum 1 Mbps recommended
- 5 Mbps recommended for file uploads

**Device Compatibility:**
- Desktop computers (Windows, macOS, Linux)
- Tablets (iPad, Android tablets)
- Mobile devices (responsive design)
- Screen resolution: 320px minimum width

**Software Requirements:**
- JavaScript enabled
- Cookies enabled
- Local storage support

---

## Troubleshooting

### Authentication Issues

**Cannot Sign In:**
- Verify username and password
- Check internet connection
- Clear browser cache and cookies
- Try Google login as alternative
- Ensure account hasn't been banned

**Google OAuth Issues:**
- Check if popup blockers are disabled
- Verify Google account permissions
- Try incognito/private browsing mode

### Event-Related Issues

**Events Not Loading:**
- Refresh the page
- Check internet connection
- Try different browser
- Clear browser cache

**Cannot Join Event:**
- Verify you're signed in
- Check if event is full (capacity reached)
- Ensure event hasn't passed
- Confirm event is approved
- Check if you're already registered

**Cannot Create Event (Organizers):**
- Verify organizer role permissions
- Check all required fields are filled
- Ensure file uploads are within size limits
- Verify internet connection for file uploads

### Dashboard Issues

**Dashboard Not Loading:**
- Verify user role permissions
- Clear browser cache
- Check network connection
- Try logging out and back in

**Statistics Not Updating:**
- Refresh the page
- Check if you have proper permissions
- Contact admin if data seems incorrect

### File Upload Issues

**Cannot Upload Poster/PDF:**
- Check file size (must be within limits)
- Verify file format (JPG, PNG for posters; PDF for documents)
- Ensure stable internet connection
- Try different browser

---

## Support

### Getting Help

For technical support or questions:
- **System Administrator:** Contact your organization's admin
- **Documentation:** Check `/docs/adr/` for technical details
- **GitHub Issues:** Report bugs through the repository
- **Email Support:** Contact the development team

### Reporting Issues

When reporting issues, please include:
- Browser type and version
- Operating system
- Steps to reproduce the problem
- Screenshots (if applicable)
- Error messages (if any)

### Feature Requests

- Submit feature requests through GitHub issues
- Contact system administrator
- Provide detailed use case descriptions

---

## Security & Privacy

### Data Protection

- **Password Security:** All passwords are encrypted using industry-standard hashing
- **JWT Tokens:** Secure token-based authentication with configurable expiration
- **OAuth2 Integration:** Google OAuth2 follows industry security standards
- **Database Security:** User data stored securely in PostgreSQL with encryption

### Privacy Policy

- **Data Collection:** Only necessary user information is collected
- **Data Usage:** User data used only for platform functionality
- **Data Sharing:** No user data shared with third parties
- **Data Retention:** User data retained as per organizational policies

### Security Best Practices

- **Strong Passwords:** Use complex passwords for manual login
- **Regular Logout:** Sign out when using shared computers
- **Browser Security:** Keep browsers updated
- **Suspicious Activity:** Report any suspicious account activity

---

## API Information

### For Developers

**API Documentation:**
- Swagger UI available at `/swagger-ui.html`
- RESTful API with JSON responses
- JWT-based authentication for API access
- Comprehensive endpoint documentation

**Key API Endpoints:**
- Authentication: `/login`, `/register`
- Events: `/api/events/**`
- Registrations: `/api/registrations/**`
- Admin: `/api/admin/**`
- Approval: `/api/approval/**`

---

## Version History

### Version 2.0.0 (November 2025)
- Added role-based dashboards
- Implemented event approval workflow
- Enhanced user management system
- Added comprehensive filtering and search
- Improved mobile responsiveness
- Added file upload capabilities
- Enhanced security features

### Version 1.0.0-rc1 (November 2024)
- Initial release
- Basic event management
- User authentication
- Google OAuth2 integration

---

**End of User Manual**  
**© 2025 Schedio. All rights reserved.**
