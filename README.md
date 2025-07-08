# Personal Asset Management App

A full-stack application for managing personal assets with user authentication, built with React frontend and Spring Boot backend.

## Features

- 🔐 JWT-based user authentication
- 📱 Responsive web interface
- 🏷️ Asset categorization and status management
- 🖼️ Image URL support for assets
- 📄 Pagination for asset lists
- 🔒 Secure user-specific data access
- ✨ Modern UI with smooth animations

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls
- React Router for navigation

### Backend
- Spring Boot 3
- Spring Security with JWT
- PostgreSQL database
- JPA/Hibernate for ORM
- Maven for dependency management

## Quick Start

### Prerequisites
- Node.js 18+
- Java 17+
- PostgreSQL 12+
- Maven 3.6+

### Database Setup
1. Create a PostgreSQL database named `asset_management`
2. Update database credentials in `backend/src/main/resources/application.yml`

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
```bash
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Assets
- `GET /api/assets` - Get user's assets (paginated)
- `POST /api/assets` - Create new asset
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset

### Master Data
- `GET /api/categories` - Get asset categories
- `GET /api/statuses` - Get asset statuses

## Database Schema

The application uses the following tables:
- `users` - User accounts
- `assets` - User assets
- `asset_categories` - Asset categories (Laptop, Phone, etc.)
- `asset_statuses` - Asset statuses (Active, Sold, Discarded)

## Security

- JWT tokens for authentication
- Password hashing with BCrypt
- User-specific data access control
- CORS configuration for frontend integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request