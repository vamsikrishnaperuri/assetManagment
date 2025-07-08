# Spring Boot Backend Setup Instructions

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- PostgreSQL running locally

## Database Setup

### 1. Install PostgreSQL
If you don't have PostgreSQL installed:

**On macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**On Windows:**
Download and install from: https://www.postgresql.org/download/windows/

### 2. Create Database
Connect to PostgreSQL and create the database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE asset_management;

# Exit PostgreSQL
\q
```

### 3. Update Database Credentials
Your current configuration in `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/asset_management
    username: postgres
    password: Vamsi!1234
```

Make sure these credentials match your PostgreSQL setup.

## Running the Backend

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies and Run
```bash
# Clean and install dependencies
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

**Alternative method:**
```bash
# Build the JAR file
mvn clean package

# Run the JAR file
java -jar target/asset-management-backend-0.0.1-SNAPSHOT.jar
```

## Verification

### 1. Check Application Startup
The backend will start on **http://localhost:8080**

You should see logs like:
```
Started AssetManagementApplication in X.XXX seconds
```

### 2. Test API Endpoints

**Test Categories (No auth required):**
```bash
curl http://localhost:8080/api/categories
```

**Test Statuses (No auth required):**
```bash
curl http://localhost:8080/api/statuses
```

**Test User Registration:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Test User Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

## Database Schema
Your application will automatically create these tables:
- `users` - User accounts
- `assets` - User assets
- `asset_categories` - Asset categories (Laptop, Phone, etc.)
- `asset_statuses` - Asset statuses (Active, Sold, etc.)

The `DataInitializer` class will populate default categories and statuses.

## Troubleshooting

### Common Issues:

1. **Port 8080 already in use:**
   ```bash
   # Kill process using port 8080
   sudo lsof -ti:8080 | xargs kill -9
   ```

2. **Database connection failed:**
   - Ensure PostgreSQL is running
   - Check database name and credentials
   - Verify PostgreSQL is listening on port 5432

3. **Java version issues:**
   ```bash
   # Check Java version (should be 17+)
   java -version
   
   # Check JAVA_HOME
   echo $JAVA_HOME
   ```

4. **Maven not found:**
   ```bash
   # Install Maven on macOS
   brew install maven
   
   # Install Maven on Ubuntu
   sudo apt install maven
   ```

## API Documentation

### Authentication Endpoints:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Asset Endpoints (Require JWT token):
- `GET /api/assets` - Get user's assets (paginated)
- `POST /api/assets` - Create new asset
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset

### Master Data Endpoints:
- `GET /api/categories` - Get all asset categories
- `GET /api/statuses` - Get all asset statuses

## Frontend Integration
Once the backend is running on http://localhost:8080, your React frontend will be able to connect to it using the existing API configuration in `src/services/api.ts`.