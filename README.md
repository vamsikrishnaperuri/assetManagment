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

## Login Screen
![WhatsApp Image 2025-07-08 at 18 27 07_7b51f985](https://github.com/user-attachments/assets/1ce21618-b67a-4b3d-82d9-e96190737439)

## Account Creation
![WhatsApp Image 2025-07-08 at 18 27 31_baa33cf7](https://github.com/user-attachments/assets/ffc948ea-d72d-46f3-b524-c3273ff79745)

## Home Screen
![WhatsApp Image 2025-07-08 at 18 29 54_a1ff5271](https://github.com/user-attachments/assets/c9c3f22a-7e7a-4d63-9508-a02ec69bfdc7)

## Add Asset
![WhatsApp Image 2025-07-08 at 18 30 12_e80d545b](https://github.com/user-attachments/assets/70a91fb5-ef88-4117-86f8-3ca6c1f1dfff)

## Search Asset
![WhatsApp Image 2025-07-08 at 18 31 05_2ab0ac6b](https://github.com/user-attachments/assets/550870e7-8c21-4bb6-8bda-3b60eafcf873)

## Edit Asset
![WhatsApp Image 2025-07-08 at 18 31 19_f7577f90](https://github.com/user-attachments/assets/afb0cc9f-9e69-4b82-b13f-f1fd1c3bfbc4)

## Delete Asset
![WhatsApp Image 2025-07-08 at 18 31 44_0450d66f](https://github.com/user-attachments/assets/6c13f829-0a69-42db-ad07-0f352e9ef396)
