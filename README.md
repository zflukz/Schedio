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

Rename `.env.example` to `.env` in the **root directory** of the project.

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file and update the following variables:

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
OAUTH_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google

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

**Note:** 
- For **Docker Compose**, only `DB_user` and `DB_password` need to be set.
- For **Manual Setup**, ensure PostgreSQL is running and update `DB_url`, `DB_user`, and `DB_password` accordingly.

---

## 🚀 How to Run

### Option 1: Using Docker Compose (Recommended)

1. Make sure Docker Desktop is running
2. Navigate to the project root directory
3. Run the following command:

```bash
docker-compose up --build
```

This will start:
- **PostgreSQL Database** on `localhost:5432`
- **Backend (Spring Boot)** on `http://localhost:8080`
- **Frontend (React)** on `http://localhost:3000`

**Wait for all services to start** (usually takes 2-3 minutes on first run).

Once ready, open your browser and go to: **http://localhost:3000**

### Option 2: Manual Setup

#### Step 1: Start PostgreSQL Database

Make sure PostgreSQL is running on your machine. If not, start it:

```bash
# macOS (using Homebrew)
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL from Services or pgAdmin
```

#### Step 2: Import Database Schema and Seed Data

```bash
psql -U postgres -d schedio -f database/seed_data.sql
```

If the database `schedio` doesn't exist, create it first:

```bash
psql -U postgres -c "CREATE DATABASE schedio;"
```

**Note:** The schema will be auto-created by Spring Boot JPA on first run.

#### Step 3: Start Backend Server

Navigate to the Server directory and run:

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

Open a **new terminal**, navigate to the client directory, and run:

```bash
cd client
npm start
```

The frontend will be available at **http://localhost:3000**

---

## 📊 Database Import

### 🐘 For PostgreSQL

The project includes database initialization files in the `database/` folder:
- `database/schema.sql` - Database schema (for reference only)
- `database/seed_data.sql` - Initial test user data

#### Using Docker Compose (Automatic)
When you run `docker-compose up` for the first time, the database files in the `database/` folder are **automatically imported** into PostgreSQL.

#### Manual Import
If running PostgreSQL manually, execute the seed data file:

```bash
psql -U postgres -d schedio -f database/seed_data.sql
```

**Important:** The database schema is automatically managed by Spring Boot (JPA) using the `spring.jpa.hibernate.ddl-auto=update` setting. However, you **must import** `seed_data.sql` to create the initial test accounts.

---

## 🔐 Test Credentials

Use the following credentials to test the system. **The TA can log in directly without registering.**

### Admin User
- **Role:** Admin (Full access to manage users, approve/reject events)
- **Username:** `admin`
- **Password:** `1234`

### Attendee User
- **Role:** Attendee (Can browse and register for events)
- **Username:** `abc`
- **Password:** `123456789`

### Organizer User
- **Role:** Organizer (Can create and manage events)
- **Username:** `organizer`
- **Password:** `1234`

---

## ⚠️ Project Status & Known Issues

### ✅ Working Features
- User authentication (JWT-based)
- Role-based access control (Admin, Organizer, Attendee)
- Event creation, editing, and approval workflow
- Event browsing, searching, and filtering
- Event registration and attendance tracking
- File upload for event posters (using Vercel Blob or local storage)

### 🐛 Known Issues

1. **Google OAuth Login**
   - **Issue:** Google login requires valid `GOOGLE_ID` and `GOOGLE_SECRET` in `.env`.
   - **Workaround:** Use the test credentials provided above for username/password login.

2. **Email Service (Password Reset)**
   - **Issue:** Requires valid SMTP credentials (`EMAIL_USERNAME` and `EMAIL_PASSWORD`) to send password reset emails.
   - **Impact:** Password reset feature will not work without proper email configuration.

3. **First Run Delay**
   - **Issue:** The backend might take 1-2 minutes to start up on first run due to dependency downloads and database schema creation.
   - **Workaround:** Wait for the message "Started DemoApplication in X seconds" in the backend logs.

4. **File Upload (Optional Feature)**
   - **Issue:** Requires Vercel Blob token for cloud storage. Without it, file uploads will fail.
   - **Workaround:** Local file storage is not implemented. This feature can be tested if a Vercel Blob token is provided.

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
- PostgreSQL 15 Alpine

---

## 📚 Additional Information

### API Documentation
Once the backend is running, you can access the interactive API documentation at:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/v3/api-docs

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
├── .env.example            # Environment variables template
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

## 📞 Support

For any issues or questions regarding this project, please refer to:
- **Backend API Documentation:** [Server/BACKEND_APIS.md](Server/BACKEND_APIS.md)
- **Architecture Decision Records:** [docs/adr/](docs/adr/)

---

**Note:** This README is prepared for the CPE334 Software Engineering Part C submission. The project demonstrates the application of Software Engineering principles including Requirements Analysis, Design, Testing, and Configuration Management.
