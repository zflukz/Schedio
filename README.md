# Schedio - University Activity Management System

Schedio is a web application designed for managing and promoting university activities. Its primary objective is to address common issues in activity management, such as fragmented information, lack of organization, and difficulty in accessing event details. The system streamlines the processes of creating, approving, searching for, and registering for activities in a convenient, transparent, and efficient manner.

Schedio supports multiple user roles, including students, staff, and administrators. Students and staff can create or participate in activities, while administrators are responsible for reviewing and approving activities to ensure compliance with university policies.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Java 21** or higher
- **Node.js v20** and npm
- **Docker** and **Docker Compose** (for containerized deployment)
- **PostgreSQL 15+** (if running without Docker)
- **Maven 3.6+** (if running backend without Docker)

---

## 🚀 Installation

### Option 1: Using Docker Compose (Recommended)

If you have Docker installed, you can skip manual installation. Jump to the [How to Run](#-how-to-run) section.

### Option 2: Manual Installation

#### Backend Dependencies

Navigate to the Server directory and install dependencies:

```bash
cd Server
mvn clean install
```

**On Windows:**

```bash
cd Server
mvnw.cmd clean install
```

#### Frontend Dependencies

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

---

## ⚙️ Configuration

### 1. Create Environment File

Create a `.env` file in the **project root** (same folder as `docker-compose.yml`).

You can copy the template:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` and update the following variables:

```env
# Database Configuration
DB_url=jdbc:postgresql://localhost:5432/schedio
DB_user=postgres
DB_password=postgres

# JWT Configuration (Optional - has default values)
JWT_SECRET=your_jwt_secret_key_must_be_very_long_at_least_256_bits
JWT_EXPIRATION=86400000

# Google OAuth2 Configuration (Optional - for Google Login)
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
OAUTH_REDIRECT_URI=http://localhost:8162/login/oauth2/code/google

# Enable Google OAuth2 (optional)
SPRING_PROFILES_ACTIVE=oauth2

# Frontend -> Backend API base URL (needed when frontend runs on a different host port)
# Docker Compose default in this repo maps host 8162 -> container 8080
REACT_APP_API_BASE_URL=http://localhost:8162

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Frontend URLs
FRONTEND_BASE_URL=http://localhost:3000
FRONTEND_HOME_URL=http://localhost:3000/home

# Email Configuration (Optional - for password reset)
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password

# Vercel Blob Storage (Optional - for file uploads)
blob=your_vercel_blob_token
```

**Notes:**

- If you run via Docker Compose, the Compose file loads variables from the root `.env`.
- If you run manually, ensure PostgreSQL is running and that `DB_url`, `DB_user`, and `DB_password` are correct.
- If you run the frontend manually with `npm start`, it typically uses `http://localhost:3000` (update `CORS_ALLOWED_ORIGINS`, `FRONTEND_BASE_URL`, and `FRONTEND_HOME_URL` accordingly).
- File uploads (event poster / PDF) require a valid `blob` token for Vercel Blob. If `blob` is empty/invalid, upload endpoints will fail and newly created events may have no poster/PDF.
- The seeded sample data uses placeholder `poster` URLs; if those URLs are unreachable, posters won’t display in the UI.

---

## 🚀 How to Run

### Option 1: Using Docker Compose (Recommended)

1. Make sure Docker Desktop is running
2. Navigate to the project root directory
3. Run:

```bash
docker-compose up --build
```

This will start:

- **PostgreSQL Database** on `localhost:5432` (container name `schedio-db`)
- **Backend (Spring Boot)** on `http://localhost:8162`
- **Frontend (React)** on `http://localhost:3000`

**Database initialization (Docker Compose):** the `database/` folder is mounted into Postgres at `/docker-entrypoint-initdb.d`, so on the **first** start (empty volume) Postgres will automatically run the `.sql` files there.

### Option 2: Manual Setup

#### Step 1: Start PostgreSQL Database

Make sure PostgreSQL is running on your machine.

#### Step 2: (Optional) Import Sample Data

See [Database Import](#-database-import).

#### Step 3: Start Backend Server

```bash
cd Server
./mvnw spring-boot:run
```

**On Windows:**

```bash
cd Server
mvnw.cmd spring-boot:run
```

The backend will be available at **http://localhost:8080**

#### Step 4: Start Frontend Development Server

Open a new terminal and run:

```bash
cd client
npm start
```

The frontend will be available at **http://localhost:3000**

---

## 📊 Database Import

The project includes database scripts in the `database/` folder:

- `database/schema.sql` - database schema
- `database/seed_data.sql` - sample users, events, and event registrations for testing

**Note on images/files:** The seed data may reference external image URLs for `poster`, and the project does not include local image assets for those seeded posters. Also, creating/uploading new posters/PDFs requires Vercel Blob (see the `blob` env var).

### When do I need this?

- If you want a ready-to-use local DB with sample users/events, import `seed_data.sql`.
- If you prefer Spring Boot to manage the schema, you can skip `schema.sql` and let JPA create/update tables on startup.

### Manual Import (PostgreSQL)

1) Create the database if needed:

```bash
psql -U postgres -c "CREATE DATABASE schedio;"
```

2) (Optional) Apply schema:

```bash
psql -U postgres -d schedio -f database/schema.sql
```

3) Load sample data:

```bash
psql -U postgres -d schedio -f database/seed_data.sql
```

**Important:** The backend uses `spring.jpa.hibernate.ddl-auto=update`, so the schema can also be created/updated automatically by Spring Boot. If you want sample users/events for testing, you still need to import `seed_data.sql`.

### Using Docker Compose

When you run `docker-compose up`, the `db` service mounts `./database` into `/docker-entrypoint-initdb.d`.

- On the **first run** (when the `postgres_data` volume is empty), Postgres automatically executes the `.sql` files in `database/`.
- If the `postgres_data` volume already exists, Postgres will **skip** init scripts. You can import seed data manually:

```bash
docker exec -i schedio-db psql -U postgres -d schedio -f /docker-entrypoint-initdb.d/seed_data.sql
```
- If you want to re-run initialization from scratch, remove the volume (this deletes all DB data):

```bash
docker-compose down -v
```

---

## 🔐 Test Credentials

Use the following credentials to test the system.

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

## 🎯 Features

### For Attendees

- Browse and search approved events
- Filter events by category, date, and location
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

---

## 🛠️ Technology Stack

### Frontend

- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Ant Design for UI components
- Embla Carousel for image carousels

### Backend

- Spring Boot 3.5.6 with Java 21
- Spring Security (JWT + OAuth2)
- Spring Data JPA
- PostgreSQL database
- Maven for dependency management
- SpringDoc OpenAPI (Swagger documentation)

### Infrastructure

- Docker & Docker Compose

---

## 📚 Additional Information

### API Documentation

Once the backend is running, you can access the interactive API documentation at:

- **Swagger UI (manual run):** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON (manual run):** http://localhost:8080/v3/api-docs

If you run via Docker Compose (default ports in this repo):

- **Swagger UI:** http://localhost:8162/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8162/v3/api-docs

For detailed API documentation, see [Server/BACKEND_APIS.md](Server/BACKEND_APIS.md)

### Project Structure

```
Schedio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── component/      # Reusable components
│   │   ├── page/           # Page components
│   │   └── context/        # React context
│   └── package.json
├── Server/                 # Spring Boot backend
│   ├── src/main/java/com/example/demo/
│   │   ├── controller/     # REST API controllers
│   │   ├── service/        # Business logic
│   │   ├── repository/     # Data access layer
│   │   ├── entity/         # JPA entities
│   │   └── security/       # Security config
│   └── pom.xml
├── database/               # Database scripts
│   ├── schema.sql          # Database schema
│   └── seed_data.sql       # Initial test data
├── docker-compose.yml      # Docker Compose config
└── README.md
```

---

## 🧪 Testing

### Backend Tests

```bash
cd Server
./mvnw test
```

### Frontend Tests

```bash
cd client
npm test
```

---

## 🐳 Docker Commands Reference

```bash
# Build and start all services
docker-compose up --build

# Start services (without rebuilding)
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

---

## 📖 Architecture Decision Records

Architecture decisions are documented in the `docs/adr/` directory:

- [ADR-001: JWT Authentication](docs/adr/adr-001-jwt-authentication.md)
- [ADR-002: Role-Based Access Control](docs/adr/adr-002-role-based-access-control.md)
- [ADR-003: Frontend Route Protection](docs/adr/adr-003-frontend-route-protection.md)
- [ADR-004: CORS Configuration](docs/adr/adr-004-cors-configuration.md)
- [ADR-005: Technology Stack](docs/adr/adr-005-technology-stack.md)

---

## 📞 Support

For any issues or questions regarding this project, please refer to:

- **Backend API Documentation:** [Server/BACKEND_APIS.md](Server/BACKEND_APIS.md)
- **Architecture Decision Records:** [docs/adr/](docs/adr/)
