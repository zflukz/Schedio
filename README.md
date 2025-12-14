# Schedio

web application designed for managing and promoting university activities. Its primary objective is to address common issues in activity management, such as fragmented information, lack of organization, and difficulty in accessing event details. The system streamlines the processes of creating, approving, searching for, and registering for activities in a convenient, transparent, and efficient manner.

Schedio supports multiple user roles, including students, staff, and administrators. Students and staff can create or participate in activities, while administrators are responsible for reviewing and approving activities to ensure compliance with university policies. The core features of the system include activity creation and approval, activity discovery through a centralized listing system, and online activity registration. These features enable systematic activity management and encourage greater user engagement within the university community.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 21** or higher
- **Node.js v20** and npm
- **Docker** and **Docker Compose** (for containerized deployment)
- **PostgreSQL** (if running without Docker)
- **Maven 3.6+** (if running backend without Docker)

## 🚀 Installation

### Backend Dependencies

Navigate to the Server directory and install dependencies:

```bash
cd Server
mvn clean install
```

Or on Windows:
```bash
cd Server
mvnw.cmd clean install
```

### Frontend Dependencies

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

## 📄 Configuration

1. **Create environment file**
   - Rename `.env.example` to `.env` (or create a new `.env` file in the root directory)
   - Configure the following environment variables in your `.env` file:

```env
# Database Configuration
DB_url=jdbc:postgresql://localhost:5432/schedio
DB_user=your_db_username
DB_password=your_db_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Google OAuth2 Configuration
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
OAUTH_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Frontend URLs
FRONTEND_BASE_URL=http://localhost:3000
FRONTEND_HOME_URL=http://localhost:3000/home

# Email Configuration
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password

# Vercel Blob Storage (Optional)
blob=your_vercel_blob_token
```

2. **Backend Configuration** (if not using Docker)
   - Update `Server/src/main/resources/application.properties` with your database credentials and other settings.

## 🤔❓ How to Run

### Option 1: Using Docker Compose (Recommended)

Start the application using Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:8080`

### Option 2: Manual Setup

#### Backend

1. Navigate to the Server directory:
   ```bash
   cd Server
   ```

2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```
   
   The backend will be available at `http://localhost:8080`

#### Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## 📊 Database Import

### 🐘 For SQL (PostgreSQL)

Import `init_db.sql` into your local PostgreSQL server before running the app:

```bash
psql -U your_username -d schedio -f init_db.sql
```

Or using pgAdmin or any PostgreSQL client, execute the SQL file to create the necessary database schema and initial data.

**Note:** If using Spring Boot with JPA (as configured in this project), the database schema will be automatically created on first run due to `spring.jpa.hibernate.ddl-auto=update` setting. However, you may still need to import initial data if an `init_db.sql` file is provided.

## 🔎 Test Credentials

Use the following credentials to test the system:

### Admin User
- **Role:** Admin
- **Username:** `admin`
- **Password:** `1234`

### Attendee User
- **Role:** Attendee
- **Username:** `abc`
- **Password:** `123456789`

### Organizer User
- **Role:** Organizer
- **Username:** `organizer`
- **Password:** `1234`

---

## Additional Information

### 🎯 Features

#### For Attendees
- Browse and search approved events
- Filter events by category, date, and location
- Register for events
- View event details and manage registrations
- User profile management

#### For Organizers
- Create and manage events
- Upload event posters and PDF documents
- Track event registrations
- Request event edits after approval
- Cancel events when needed

#### For Administrators
- Approve or reject event submissions
- Manage user roles (ATTENDEE, ORGANIZER, ADMIN)
- User management and administration
- View all events and registrations

### 🛠️ Technology Stack

#### Frontend
- **React 18** with TypeScript
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Ant Design** for UI components
- **Embla Carousel** for carousel components
- **Create React App** as build tool

#### Backend
- **Spring Boot 3.5.6** with Java 21
- **Spring Security** for authentication and authorization
- **Spring Data JPA** for database operations
- **PostgreSQL** as the primary database
- **JWT** for stateless authentication
- **OAuth2** for Google login integration
- **Maven** for dependency management
- **SpringDoc OpenAPI** for API documentation

#### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **Vercel Blob** for file storage (optional)

### 📚 API Documentation

Once the backend is running, you can access the API documentation at:

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`

For detailed API documentation, see [Server/BACKEND_APIS.md](Server/BACKEND_APIS.md)

### 📁 Project Structure

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

### 🧪 Testing

#### Backend Tests
```bash
cd Server
./mvnw test
```

For integration tests:
```bash
./mvnw verify -P integration
```

#### Frontend Tests
```bash
cd client
npm test
```

### 🐳 Docker Commands

#### Build Images
```bash
docker-compose build
```

#### Run Containers
```bash
docker-compose up
```

#### Stop Containers
```bash
docker-compose down
```

#### View Logs
```bash
docker-compose logs -f
```

### 📖 Architecture Decision Records

Architecture decisions are documented in the `docs/adr/` directory:
- [ADR-001: JWT Authentication](docs/adr/adr-001-jwt-authentication.md)
- [ADR-002: Role-Based Access Control](docs/adr/adr-002-role-based-access-control.md)
- [ADR-003: Frontend Route Protection](docs/adr/adr-003-frontend-route-protection.md)
- [ADR-004: CORS Configuration](docs/adr/adr-004-cors-configuration.md)
- [ADR-005: Technology Stack](docs/adr/adr-005-technology-stack.md)

### 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
