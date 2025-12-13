# Schedio

web application designed for managing and promoting university activities. Its primary objective is to address common issues in activity management, such as fragmented information, lack of organization, and difficulty in accessing event details. The system streamlines the processes of creating, approving, searching for, and registering for activities in a convenient, transparent, and efficient manner.

Schedio supports multiple user roles, including students, staff, and administrators. Students and staff can create or participate in activities, while administrators are responsible for reviewing and approving activities to ensure compliance with university policies. The core features of the system include activity creation and approval, activity discovery through a centralized listing system, and online activity registration. These features enable systematic activity management and encourage greater user engagement within the university community.

## 🎯 Features

### For Attendees
- Browse and search approved events
- Filter events by category and date
- Register for events
- View event details and manage registrations
- User profile management

### For Organizers
- Create and manage events
- Upload event posters and PDF documents
- Track event registrations
- Request event edits after approval
- Cancel events when needed

### For Administrators
- Approve or reject event submissions
- Manage user roles (ATTENDEE, ORGANIZER, ADMIN)
- User management and administration
- View all events and registrations

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Ant Design** for UI components
- **Embla Carousel** for carousel components
- **Create React App** as build tool

### Backend
- **Spring Boot 3.5.6** with Java 21
- **Spring Security** for authentication and authorization
- **Spring Data JPA** for database operations
- **PostgreSQL** as the primary database
- **JWT** for stateless authentication
- **OAuth2** for Google login integration
- **Maven** for dependency management
- **SpringDoc OpenAPI** for API documentation

### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **Vercel Blob** for file storage (optional)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21** or higher
- **Node.js** 16+ and npm
- **Docker** and **Docker Compose** (for containerized deployment)
- **PostgreSQL** (if running without Docker)
- **Maven** 3.6+ (if running backend without Docker)

## 🚀 Getting Started

### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/zflukz/Schedio.git
   cd Schedio
   ```

2. **Create environment file**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_URL=jdbc:postgresql://localhost:5432/schedio
   DB_username=your_db_username
   DB_password=your_db_password
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRATION=86400000
   # Add other required environment variables
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```
   
   This will start:
   - Frontend on `http://localhost:3000`
   - Backend on `http://localhost:8080`

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to the Server directory**
   ```bash
   cd Server
   ```

2. **Configure database**
   Update `src/main/resources/application.properties` with your database credentials.

3. **Run the application**
   ```bash
   ./mvnw spring-boot:run
   ```
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   The backend will be available at `http://localhost:8080`

#### Frontend Setup

1. **Navigate to the client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
Schedio/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── component/     # Reusable React components
│   │   ├── page/          # Page components
│   │   ├── context/       # React context providers
│   │   └── config/        # Configuration files
│   ├── package.json
│   └── dockerfile
│
├── Server/                # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/demo/
│   │   │   │       ├── controller/    # REST controllers
│   │   │   │       ├── service/       # Business logic
│   │   │   │       ├── repository/    # Data access layer
│   │   │   │       ├── entity/        # JPA entities
│   │   │   │       ├── config/        # Configuration classes
│   │   │   │       └── security/      # Security configuration
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/          # Test files
│   ├── pom.xml
│   └── dockerfile
│
├── docs/                  # Documentation
│   └── adr/              # Architecture Decision Records
│
├── docker-compose.yml     # Docker Compose configuration
└── README.md
```

## 📚 API Documentation

Once the backend is running, you can access the API documentation at:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

For detailed API documentation, see [Server/BACKEND_APIS.md](Server/BACKEND_APIS.md)

### Key API Endpoints

#### Authentication
- `POST /login` - User login
- `POST /api/auth/register` - User registration
- `GET /oauth2/authorization/google` - Google OAuth2 login

#### Events
- `GET /api/events/approved` - Get all approved events (Public)
- `GET /api/events/{id}` - Get event by ID (Public)
- `POST /api/events/filter` - Filter events (Public)
- `POST /api/events/create` - Create event (Organizer/Admin)
- `GET /api/events/my-events` - Get my events (Organizer/Admin)
- `PUT /api/events/update/{id}` - Update event (Organizer/Admin)
- `POST /api/events/cancel/{id}` - Cancel event (Organizer/Admin)

#### Event Registration
- `POST /api/registrations/register/{eventId}` - Register for event
- `GET /api/registrations/my-registrations` - Get my registrations

#### Admin
- `GET /api/admin/users` - Get all users (Admin)
- `POST /api/admin/users/role` - Change user role (Admin)
- `POST /api/approval/approve/{eventId}` - Approve event (Admin)
- `POST /api/approval/reject/{eventId}` - Reject event (Admin)

## 🔐 Authentication & Authorization

Schedio uses JWT (JSON Web Tokens) for authentication and implements role-based access control (RBAC) with three roles:

- **ATTENDEE**: Can browse events and register
- **ORGANIZER**: Can create and manage their own events
- **ADMIN**: Full system access including user and event approval management

### OAuth2 Integration
The application supports Google OAuth2 login for seamless authentication.

## 🧪 Testing

### Backend Tests
```bash
cd Server
./mvnw test
```

For integration tests:
```bash
./mvnw verify -P integration
```

### Frontend Tests
```bash
cd client
npm test
```

## 🐳 Docker

### Build Images
```bash
docker-compose build
```

### Run Containers
```bash
docker-compose up
```

### Stop Containers
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

## 📝 Development Guidelines

- Follow the existing code style and conventions
- Write tests for new features
- Update API documentation when adding new endpoints
- Follow the commit message guidelines in [Server/COMMIT_MESSAGE.md](Server/COMMIT_MESSAGE.md)
- Review the checklist in [Server/CHECKLIST.md](Server/CHECKLIST.md) before submitting changes

## 📖 Architecture Decision Records

Architecture decisions are documented in the `docs/adr/` directory:
- [ADR-001: JWT Authentication](docs/adr/adr-001-jwt-authentication.md)
- [ADR-002: Role-Based Access Control](docs/adr/adr-002-role-based-access-control.md)
- [ADR-003: Frontend Route Protection](docs/adr/adr-003-frontend-route-protection.md)
- [ADR-004: CORS Configuration](docs/adr/adr-004-cors-configuration.md)
- [ADR-005: Technology Stack](docs/adr/adr-005-technology-stack.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
