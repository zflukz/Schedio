# Schedio Deployment Guide
**Version:** 2.0.0  
**Last Updated:** November 2025

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Production Deployment](#production-deployment)
5. [Environment Variables](#environment-variables)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

**Technology Stack:**
- **Frontend:** React 18.3.1 + TypeScript, Tailwind CSS, Ant Design
- **Backend:** Spring Boot 3.5.6, Java 21, Maven 3.8+
- **Database:** PostgreSQL 42.7.4
- **Authentication:** JWT + OAuth2 (Google), Spring Security
- **File Storage:** Vercel Blob Service
- **Email Service:** JavaMail 1.6.2
- **API Documentation:** Swagger/OpenAPI 2.7.0
- **Testing:** JUnit, H2 (test database)
- **Deployment:** Vercel (Frontend), Render (Backend)
- **CI/CD:** GitHub Actions

---

## Prerequisites

### Required Software
- **Node.js:** 20.x LTS
- **Java:** 21 (Temurin distribution recommended)
- **Maven:** 3.8+ (or use included Maven wrapper)
- **Docker:** 20.x+ (for containerized deployment)
- **Git:** 2.x+
- **PostgreSQL:** 13+ (for local development)

### Required Accounts
- GitHub account (for repository and CI/CD)
- Vercel account (for frontend deployment and blob storage)
- Render account (for backend deployment)
- Docker Hub account (for container registry)
- PostgreSQL database provider (Aiven, AWS RDS, or similar)
- Google Cloud Console (for OAuth2 configuration)
- Email service provider (for notifications)

---

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/Schedio.git
cd Schedio
```

### 2. Setup Environment Variables

Create `.env` file in root directory:
```env
# Backend Database
DB_url=jdbc:postgresql://YOUR_HOST:PORT/DATABASE_NAME
DB_user=YOUR_DB_USERNAME
DB_password=YOUR_DB_PASSWORD

# Google OAuth2
GOOGLE_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_SECRET=YOUR_GOOGLE_CLIENT_SECRET
OAUTH_REDIRECT_URI=http://localhost:8080/login/oauth2/code/google

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRATION=86400000

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# File Storage (Vercel Blob)
VERCEL_BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Frontend
REACT_APP_BACKEND_URL=http://localhost:8080
```

### 3. Run with Docker Compose

```bash
docker-compose up
```

**Services will start:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

### 4. Run Manually (Without Docker)

**Backend:**
```bash
cd Server
chmod +x mvnw
./mvnw clean install
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd client
npm install
npm start
```

**Run Tests:**
```bash
# Backend unit tests
cd Server
./mvnw test

# Backend integration tests
./mvnw test -Pintegration

# Frontend tests
cd client
npm test
```

---

## Production Deployment

### Step 1: Database Setup

**Using Aiven PostgreSQL:**
1. Create PostgreSQL instance
2. Note connection details:
   - Host
   - Port
   - Database name
   - Username
   - Password

### Step 2: Google OAuth2 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `https://YOUR_BACKEND_DOMAIN/login/oauth2/code/google`
     - `http://localhost:8080/login/oauth2/code/google` (for testing)
5. Save Client ID and Client Secret

### Step 3: Backend Deployment (Render)

**Option A: Using Render Dashboard**
1. Login to Render
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Name:** schedio-backend
   - **Root Directory:** `Server`
   - **Environment:** Docker
   - **Dockerfile Path:** `Server/dockerfile`
   - **Plan:** Free or paid tier

**Environment Variables (in Render):**
```
DB_url=jdbc:postgresql://YOUR_HOST:PORT/DATABASE
DB_user=YOUR_USERNAME
DB_password=YOUR_PASSWORD
GOOGLE_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_SECRET=YOUR_GOOGLE_CLIENT_SECRET
OAUTH_REDIRECT_URI=https://YOUR_BACKEND_DOMAIN/login/oauth2/code/google
CORS_ALLOWED_ORIGINS=https://YOUR_FRONTEND_DOMAIN
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRATION=86400000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your-production-email@gmail.com
EMAIL_PASSWORD=your-production-app-password
VERCEL_BLOB_READ_WRITE_TOKEN=your-production-blob-token
```

**Option B: Using GitHub Actions (Automated)**
1. Get Render API Key from Render Dashboard
2. Get Service ID from Render service URL
3. Add GitHub Secrets (see CI/CD section)
4. Push to `main` branch triggers auto-deployment

### Step 4: Frontend Deployment (Vercel)

**Using Vercel Dashboard:**
1. Login to Vercel
2. Click "Add New" → "Project"
3. Import GitHub repository
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

**Environment Variables (in Vercel):**
```
REACT_APP_BACKEND_URL=https://YOUR_BACKEND_DOMAIN
```

5. Click "Deploy"

### Step 5: Update OAuth2 Redirect URIs

After deployment, update Google OAuth2 settings:
1. Go to Google Cloud Console
2. Add production redirect URI:
   - `https://YOUR_BACKEND_DOMAIN/login/oauth2/code/google`

---

## Environment Variables

### Backend (Server/src/main/resources/application.properties)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_url` | PostgreSQL JDBC URL | `jdbc:postgresql://host:5432/db` |
| `DB_user` | Database username | `admin` |
| `DB_password` | Database password | `securepassword` |
| `GOOGLE_ID` | Google OAuth2 Client ID | `123456-abc.apps.googleusercontent.com` |
| `GOOGLE_SECRET` | Google OAuth2 Client Secret | `GOCSPX-xxxxx` |
| `OAUTH_REDIRECT_URI` | OAuth2 callback URL | `https://api.domain.com/login/oauth2/code/google` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | `https://domain.com,http://localhost:3000` |
| `JWT_SECRET` | JWT signing secret key | `your-secure-secret-key` |
| `JWT_EXPIRATION` | JWT token expiration (ms) | `86400000` (24 hours) |
| `EMAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP server port | `587` |
| `EMAIL_USERNAME` | Email account username | `notifications@domain.com` |
| `EMAIL_PASSWORD` | Email account password/app password | `app-specific-password` |
| `VERCEL_BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token | `vercel_blob_rw_xxxxx` |

### Frontend (client/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API base URL | `https://api.domain.com` |

---

## CI/CD Pipeline

### GitHub Actions Workflows

**Location:** `.github/workflows/`

#### 1. CI Workflow (`ci.yml`)
**Triggers:** Push, Pull Request to any branch  
**Jobs:**
- **Frontend Build & Test:**
  - Install Node.js dependencies
  - Run TypeScript compilation
  - Execute unit tests
  - Build production bundle
- **Backend Build & Test:**
  - Setup Java 21 environment
  - Run Maven clean install
  - Execute unit tests
  - Run integration tests
  - Generate test reports

#### 2. Backend Deploy Workflow (`server-deploy.yml`)
**Triggers:** Push to `main` branch  
**Steps:**
1. Checkout code
2. Setup Java 21
3. Build Docker image with multi-stage build
4. Push to Docker Hub registry
5. Trigger Render deployment via webhook
6. Health check verification

#### 3. Frontend Deploy Workflow (Automatic via Vercel)
**Triggers:** Push to `main` branch  
**Automatic Steps:**
1. Vercel detects changes
2. Build React application
3. Deploy to production
4. Update environment variables

### Required GitHub Secrets

**Repository Settings → Secrets and variables → Actions**

Add these secrets:

| Secret Name | Description | How to Get |
|-------------|-------------|------------|
| `DOCKER_USERNAME` | Docker Hub username | Your Docker Hub account |
| `DOCKER_PASSWORD` | Docker Hub password/token | Docker Hub → Account Settings → Security |
| `RENDER_API_KEY` | Render API key | Render Dashboard → Account Settings → API Keys |
| `RENDER_SERVICE_ID` | Render service ID | From Render service URL: `srv-xxxxx` |

### Setup GitHub Secrets

1. Go to repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with name and value
5. Click **Add secret**

### Deployment Workflow

```
Push to main branch
    ↓
GitHub Actions triggered
    ↓
├─ CI Pipeline (ci.yml)
│  ├─ Frontend Job
│  │  ├─ Install Node.js dependencies
│  │  ├─ TypeScript compilation
│  │  ├─ Run unit tests
│  │  └─ Build production bundle
│  │
│  └─ Backend Job
│     ├─ Setup Java 21 environment
│     ├─ Maven clean install
│     ├─ Run unit tests
│     ├─ Run integration tests
│     └─ Generate test reports
│
├─ Backend Deploy (server-deploy.yml)
│  ├─ Build multi-stage Docker image
│  ├─ Push to Docker Hub
│  ├─ Trigger Render deployment
│  └─ Health check verification
│
└─ Frontend Deploy (Vercel Auto)
   ├─ Detect repository changes
   ├─ Build React application
   ├─ Deploy to CDN
   └─ Update DNS routing
```

---

## Docker Deployment

### Build Images Manually

**Backend:**
```bash
cd Server
docker build -t schedio-backend:latest .
```

**Frontend:**
```bash
cd client
docker build -t schedio-frontend:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Push to Docker Hub

```bash
docker tag schedio-backend:latest YOUR_USERNAME/schedio-backend:latest
docker push YOUR_USERNAME/schedio-backend:latest
```

---

## Troubleshooting

### Backend Deployment Issues

**Problem:** Tests fail with "Error creating bean 'securityCorsConfig'"  
**Solution:** 
- Ensure `cors.allowed.origins` is set in test properties
- Check `application-integration.properties` configuration
- Verify test profile is active during integration tests

**Problem:** Database connection fails  
**Solution:** 
- Verify `DB_url`, `DB_user`, `DB_password` are correct
- Check database is accessible from deployment server
- Verify firewall rules allow connection
- Test connection using PostgreSQL client
- Check SSL requirements for production databases

**Problem:** OAuth2 login fails  
**Solution:**
- Verify `GOOGLE_ID` and `GOOGLE_SECRET` are correct
- Check redirect URI matches Google Console settings
- Ensure `OAUTH_REDIRECT_URI` uses HTTPS in production
- Verify Google OAuth2 consent screen is configured
- Check if domain is added to authorized domains

**Problem:** JWT token issues  
**Solution:**
- Verify `JWT_SECRET` is set and secure
- Check `JWT_EXPIRATION` configuration
- Ensure token is included in Authorization header
- Verify token format: `Bearer <token>`

**Problem:** File upload failures  
**Solution:**
- Check `VERCEL_BLOB_READ_WRITE_TOKEN` is valid
- Verify file size limits
- Ensure proper file format (JPG, PNG, PDF)
- Check network connectivity to Vercel Blob service

**Problem:** Email notifications not working  
**Solution:**
- Verify email configuration variables
- Check SMTP server settings
- Ensure app-specific password for Gmail
- Test email connectivity
- Check firewall rules for SMTP ports

### Frontend Deployment Issues

**Problem:** Tests fail with fetch URL mismatch  
**Solution:** 
- Ensure `REACT_APP_BACKEND_URL` is set correctly
- Check API configuration in `src/config/api.ts`
- Verify environment variables in test environment

**Problem:** API calls fail (CORS errors)  
**Solution:**
- Verify `CORS_ALLOWED_ORIGINS` includes frontend domain
- Check backend is running and accessible
- Verify HTTPS/HTTP protocol matches
- Test API endpoints using browser dev tools
- Check preflight OPTIONS requests

**Problem:** Build fails on Vercel  
**Solution:**
- Check Node.js version (should be 20.x LTS)
- Verify all dependencies in `package.json`
- Check build logs for specific errors
- Ensure TypeScript compilation succeeds
- Verify Tailwind CSS configuration
- Check for missing environment variables

**Problem:** Authentication not working  
**Solution:**
- Verify JWT token storage in localStorage
- Check token expiration and refresh logic
- Ensure protected routes are properly configured
- Test OAuth2 callback URL configuration

**Problem:** UI components not rendering  
**Solution:**
- Check Ant Design imports and configuration
- Verify Tailwind CSS classes are applied
- Check browser console for JavaScript errors
- Ensure responsive design breakpoints

**Problem:** File uploads not working  
**Solution:**
- Check file size limits in frontend
- Verify file type validation
- Ensure proper form data encoding
- Test network connectivity
- Check browser file API support

### GitHub Actions Issues

**Problem:** Backend deploy workflow not running  
**Solution:**
- Verify file is in `.github/workflows/` directory
- Check workflow triggers in YAML file
- Ensure pushing to `main` branch
- Verify GitHub Actions are enabled for repository
- Check workflow syntax using GitHub Actions validator

**Problem:** Docker build fails  
**Solution:**
- Check Dockerfile syntax and multi-stage build
- Verify base image availability
- Ensure all required files are copied
- Check Maven build succeeds locally
- Review Docker build logs for specific errors

**Problem:** Docker push fails  
**Solution:**
- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
- Check Docker Hub repository exists and is accessible
- Ensure Docker Hub token has write permissions
- Verify image tagging is correct
- Check Docker Hub rate limits

**Problem:** Render deploy fails  
**Solution:**
- Verify `RENDER_API_KEY` and `RENDER_SERVICE_ID` secrets
- Check Render service is active and properly configured
- Review Render deployment logs for specific errors
- Verify environment variables are set in Render
- Check service health endpoints
- Ensure database connectivity from Render

**Problem:** Integration tests fail in CI  
**Solution:**
- Check H2 test database configuration
- Verify test profile properties
- Ensure test data setup is correct
- Check for port conflicts in CI environment
- Review test logs for specific failures

**Problem:** Frontend deployment fails on Vercel  
**Solution:**
- Check Vercel build logs
- Verify Node.js version compatibility
- Ensure all environment variables are set
- Check for build script errors
- Verify deployment settings in Vercel dashboard

---

## Monitoring & Maintenance

### Health Checks

**Backend Health Endpoints:**
```
# Application health
GET https://YOUR_BACKEND_DOMAIN/actuator/health

# API documentation
GET https://YOUR_BACKEND_DOMAIN/swagger-ui.html

# Database connectivity
GET https://YOUR_BACKEND_DOMAIN/actuator/health/db
```

**Frontend Health Check:**
```
# Application availability
GET https://YOUR_FRONTEND_DOMAIN/

# API connectivity test
GET https://YOUR_FRONTEND_DOMAIN/api/health
```

### Performance Monitoring

**Key Metrics to Monitor:**
- Response times for API endpoints
- Database connection pool usage
- Memory and CPU utilization
- Error rates and exception logs
- User registration and event creation rates

**Logging Configuration:**
- Application logs: INFO level for production
- Security logs: Authentication attempts
- Database logs: Slow query monitoring
- Error tracking: Exception stack traces

### Backup and Recovery

**Database Backups:**
- Daily automated backups
- Point-in-time recovery capability
- Backup retention: 30 days minimum
- Test restore procedures monthly

**File Storage Backups:**
- Vercel Blob automatic redundancy
- Regular backup verification
- Disaster recovery procedures

### Security Maintenance

**Regular Security Tasks:**
- Update dependencies monthly
- Review security logs weekly
- Rotate JWT secrets quarterly
- Update OAuth2 credentials as needed
- Monitor for security vulnerabilities

**Security Monitoring:**
- Failed authentication attempts
- Unusual API usage patterns
- File upload anomalies
- Database access patterns

### Version Updates

**Update Procedures:**
1. Test updates in staging environment
2. Review changelog and breaking changes
3. Update dependencies incrementally
4. Run full test suite
5. Deploy during maintenance window
6. Monitor post-deployment metrics

**Rollback Procedures:**
1. Identify deployment issues quickly
2. Revert to previous Docker image
3. Restore database if necessary
4. Verify system functionality
5. Communicate status to users

---

## API Documentation

### Swagger/OpenAPI

**Access API Documentation:**
```
Production: https://YOUR_BACKEND_DOMAIN/swagger-ui.html
Local: http://localhost:8080/swagger-ui.html
```

**Key API Endpoints:**

**Authentication:**
- `POST /login` - User login
- `POST /register` - User registration
- `GET /login/oauth2/code/google` - OAuth2 callback

**Events:**
- `GET /api/events/approved` - Get approved events (public)
- `POST /api/events/create` - Create event (organizer/admin)
- `GET /api/events/my-events` - Get organizer's events
- `PUT /api/events/update/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

**Registrations:**
- `POST /api/registrations/register/{eventId}` - Register for event
- `DELETE /api/registrations/unregister/{eventId}` - Unregister
- `GET /api/registrations/my-registrations` - Get user registrations

**Admin:**
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users/role` - Change user role
- `DELETE /api/admin/users/{id}` - Delete user

**Approval:**
- `POST /api/approval/approve/{eventId}` - Approve/reject event
- `POST /api/approval/filter-admin` - Filter approvals

---

## Troubleshooting Quick Reference

### Common Commands

**Local Development:**
```bash
# Start backend
cd Server && ./mvnw spring-boot:run

# Start frontend
cd client && npm start

# Run tests
./mvnw test
npm test

# Build for production
./mvnw clean package
npm run build
```

**Docker Commands:**
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Database Commands:**
```bash
# Connect to PostgreSQL
psql -h HOST -p PORT -U USERNAME -d DATABASE

# Check connections
SELECT * FROM pg_stat_activity;

# Check table sizes
SELECT schemaname,tablename,pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Emergency Procedures

**Service Down:**
1. Check health endpoints
2. Review recent deployments
3. Check error logs
4. Verify database connectivity
5. Restart services if necessary

**Database Issues:**
1. Check connection pool status
2. Review slow query logs
3. Monitor disk space
4. Check backup status
5. Contact database provider if needed

**Security Incident:**
1. Identify affected systems
2. Isolate compromised components
3. Review access logs
4. Reset credentials if necessary
5. Document incident details

---

**End of Deployment Guide**  
**© 2025 Schedio. All rights reserved.**eploys
```

---

## Docker Deployment

### Build Images Manually

**Backend:**
```bash
cd Server
docker build -t schedio-backend:latest .
```

**Frontend:**
```bash
cd client
docker build -t schedio-frontend:latest .
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Push to Docker Hub

```bash
docker tag schedio-backend:latest YOUR_USERNAME/schedio-backend:latest
docker push YOUR_USERNAME/schedio-backend:latest
```

---

## Troubleshooting

### Backend Deployment Issues

**Problem:** Tests fail with "Error creating bean 'securityCorsConfig'"  
**Solution:** Ensure `cors.allowed.origins` is set in test properties

**Problem:** Database connection fails  
**Solution:** 
- Verify `DB_url`, `DB_user`, `DB_password` are correct
- Check database is accessible from deployment server
- Verify firewall rules allow connection

**Problem:** OAuth2 login fails  
**Solution:**
- Verify `GOOGLE_ID` and `GOOGLE_SECRET` are correct
- Check redirect URI matches Google Console settings
- Ensure `OAUTH_REDIRECT_URI` uses HTTPS in production

### Frontend Deployment Issues

**Problem:** Tests fail with fetch URL mismatch  
**Solution:** Ensure `REACT_APP_BACKEND_URL` is set correctly

**Problem:** API calls fail (CORS errors)  
**Solution:**
- Verify `CORS_ALLOWED_ORIGINS` includes frontend domain
- Check backend is running and accessible
- Verify HTTPS/HTTP protocol matches

**Problem:** Build fails on Vercel  
**Solution:**
- Check Node.js version (should be 20.x)
- Verify all dependencies in `package.json`
- Check build logs for specific errors

### GitHub Actions Issues

**Problem:** Backend deploy workflow not running  
**Solution:**
- Verify file is in `.github/workflows/` directory
- Check workflow triggers in YAML file
- Ensure pushing to `main` branch

**Problem:** Docker push fails  
**Solution:**
- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets
- Check Docker Hub repository exists
- Ensure Docker Hub token has write permissions

**Problem:** Render deploy fails  
**Solution:**
- Verify `RENDER_API_KEY` and `RENDER_SERVICE_ID` secrets
- Check Render service is active
- Review Render deployment logs

---

## Monitoring & Maintenance

### Health Checks

**Backend Health Endpoint:**
```
GET https://YOUR_BACKEND_DOMAIN/actuator/health
```

**Frontend:**
- Monitor Vercel dashboard for deployment status
- Check browser console for errors

### Logs

**Render (Backend):**
- Dashboard → Service → Logs tab

**Vercel (Frontend):**
- Dashboard → Project → Deployments → View logs

**GitHub Actions:**
- Repository → Actions tab → Select workflow run

### Database Maintenance

- Regular backups (automated in Aiven)
- Monitor connection pool usage
- Review slow queries
- Update indexes as needed

---

## Security Checklist

- [ ] All secrets stored in environment variables (not in code)
- [ ] `.env` file in `.gitignore`
- [ ] HTTPS enabled for production
- [ ] CORS properly configured
- [ ] JWT secret is strong and unique
- [ ] Database credentials are secure
- [ ] OAuth2 redirect URIs are whitelisted
- [ ] Regular dependency updates
- [ ] Security headers configured

---

## Rollback Procedure

### Vercel (Frontend)
1. Go to Vercel Dashboard
2. Select project → Deployments
3. Find previous working deployment
4. Click "..." → "Promote to Production"

### Render (Backend)
1. Go to Render Dashboard
2. Select service → Manual Deploy
3. Select previous commit/image
4. Click "Deploy"

### GitHub
```bash
git revert HEAD
git push origin main
```

---

## Performance Optimization

### Frontend
- Enable Vercel Edge Network (CDN)
- Optimize images and assets
- Code splitting with React.lazy()
- Enable compression

### Backend
- Configure connection pooling
- Enable Spring Boot caching
- Optimize database queries
- Use indexes on frequently queried columns

---

## Scaling Considerations

### Horizontal Scaling
- Render: Upgrade to paid plan for multiple instances
- Vercel: Automatically scales
- Database: Consider read replicas

### Vertical Scaling
- Increase Render instance size
- Upgrade database plan

---

**End of Deployment Guide**
