# Complete Setup Instructions for Personal Asset Management App

## Prerequisites

### Required Software:
1. **Java 17+** - For Spring Boot backend
2. **Maven 3.6+** - For Java dependency management
3. **Node.js 18+** - For React frontend
4. **PostgreSQL 12+** - Database
5. **VS Code** - IDE with recommended extensions

### VS Code Extensions (Recommended):
- Extension Pack for Java (Microsoft)
- Spring Boot Extension Pack (VMware)
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens

## Installation Steps

### 1. Install Java 17+

**Windows:**
```bash
# Download and install from Oracle or use Chocolatey
choco install openjdk17
```

**macOS:**
```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH (add to ~/.zshrc or ~/.bash_profile)
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export PATH=$JAVA_HOME/bin:$PATH
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

**Verify Installation:**
```bash
java -version
javac -version
```

### 2. Install Maven

**Windows:**
```bash
# Using Chocolatey
choco install maven
```

**macOS:**
```bash
# Using Homebrew
brew install maven
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install maven
```

**Verify Installation:**
```bash
mvn -version
```

### 3. Install Node.js

**Windows/macOS/Linux:**
- Download from: https://nodejs.org/
- Choose LTS version (18+)

**Using Package Managers:**

**macOS:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node -v
npm -v
```

### 4. Install PostgreSQL

**Windows:**
- Download from: https://www.postgresql.org/download/windows/

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Verify Installation:**
```bash
psql --version
```

## Project Setup

### 1. Clone/Open Project in VS Code

```bash
# Open VS Code in project directory
code .
```

### 2. Database Setup

**Create Database:**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE asset_management;

# Create user (optional, if you want separate user)
CREATE USER asset_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE asset_management TO asset_user;

# Exit
\q
```

**Update Database Configuration:**
Edit `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/asset_management
    username: postgres  # or asset_user
    password: your_password  # update with your password
```

### 3. Backend Setup (Spring Boot)

**Open Terminal in VS Code (Ctrl+` or Cmd+`)**

```bash
# Navigate to backend directory
cd backend

# Clean and install dependencies
mvn clean install

# Run the application
mvn spring-boot:run
```

**Alternative - Using VS Code:**
1. Open `backend/src/main/java/com/assetmanagement/AssetManagementApplication.java`
2. Click "Run" button above the main method
3. Or press `F5` to debug

**Verify Backend:**
- Backend runs on: http://localhost:8080
- Test: http://localhost:8080/api/categories

### 4. Frontend Setup (React)

**Open New Terminal in VS Code:**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Verify Frontend:**
- Frontend runs on: http://localhost:5173
- Should automatically open in browser

## VS Code Configuration

### 1. Workspace Settings

Create `.vscode/settings.json`:
```json
{
  "java.home": "/path/to/java17",
  "java.configuration.updateBuildConfiguration": "automatic",
  "java.compile.nullAnalysis.mode": "automatic",
  "spring-boot.ls.checkUpdate": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/target": true,
    "**/.git": true
  }
}
```

### 2. Launch Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot-AssetManagementApplication",
      "request": "launch",
      "cwd": "${workspaceFolder}/backend",
      "mainClass": "com.assetmanagement.AssetManagementApplication",
      "projectName": "asset-management-backend",
      "args": "",
      "envFile": "${workspaceFolder}/backend/.env"
    }
  ]
}
```

### 3. Tasks Configuration

Create `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "maven: clean install",
      "type": "shell",
      "command": "mvn",
      "args": ["clean", "install"],
      "options": {
        "cwd": "${workspaceFolder}/backend"
      },
      "group": "build"
    },
    {
      "label": "npm: install",
      "type": "shell",
      "command": "npm",
      "args": ["install"],
      "options": {
        "cwd": "${workspaceFolder}"
      },
      "group": "build"
    },
    {
      "label": "npm: dev",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "options": {
        "cwd": "${workspaceFolder}"
      },
      "group": "build",
      "isBackground": true
    }
  ]
}
```

## Running the Application

### Method 1: Using VS Code Interface

**Backend:**
1. Open `AssetManagementApplication.java`
2. Click "Run" or "Debug" button
3. Or use `Ctrl+F5` (Run) or `F5` (Debug)

**Frontend:**
1. Open VS Code terminal (`Ctrl+``)
2. Run: `npm run dev`
3. Or use Command Palette (`Ctrl+Shift+P`) → "Tasks: Run Task" → "npm: dev"

### Method 2: Using Terminal Commands

**Terminal 1 (Backend):**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

### Method 3: Using VS Code Tasks

1. `Ctrl+Shift+P` → "Tasks: Run Task"
2. Select "maven: clean install" (first time)
3. Then select "npm: install" (first time)
4. Run backend and frontend tasks

## Testing the Application

### 1. Backend API Tests

```bash
# Test categories
curl http://localhost:8080/api/categories

# Test registration
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### 2. Frontend Testing

1. Open http://localhost:5173
2. Register a new user
3. Login with credentials
4. Add, edit, delete assets
5. Test pagination and search

## Troubleshooting

### Common Issues:

**1. Port Already in Use:**
```bash
# Kill process on port 8080 (backend)
npx kill-port 8080

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

**2. Java Version Issues:**
```bash
# Check Java version
java -version

# Set JAVA_HOME in VS Code settings
"java.home": "/path/to/java17"
```

**3. Database Connection:**
- Ensure PostgreSQL is running
- Check credentials in application.yml
- Verify database exists

**4. Maven Dependencies:**
```bash
cd backend
mvn clean install -U
```

**5. Node Dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

### 1. Daily Development:
1. Start PostgreSQL service
2. Open VS Code
3. Start backend (F5 or terminal)
4. Start frontend (npm run dev)
5. Open browser to http://localhost:5173

### 2. Making Changes:
- **Backend**: Changes auto-reload with Spring Boot DevTools
- **Frontend**: Changes auto-reload with Vite HMR

### 3. Debugging:
- **Backend**: Use VS Code debugger (F5)
- **Frontend**: Use browser dev tools
- **Database**: Use VS Code PostgreSQL extension or pgAdmin

## Project Structure

```
project/
├── backend/                 # Spring Boot application
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   └── pom.xml            # Maven dependencies
├── src/                    # React frontend
│   ├── components/        # React components
│   ├── services/         # API services
│   └── types/           # TypeScript types
├── .vscode/              # VS Code configuration
└── package.json         # Node.js dependencies
```

This setup provides a complete development environment for your Personal Asset Management application with both Spring Boot backend and React frontend running smoothly in VS Code.