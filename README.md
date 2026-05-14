# 🏥 Health-Care-Server

> A comprehensive backend API for managing healthcare services, appointments, and patient data with advanced features like AI integration, payment processing, and real-time scheduling.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1-black?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?style=flat-square&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Modules](#api-modules)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Health-Care-Server** is a robust and scalable backend API designed to manage healthcare services. It provides a complete solution for:

- 👥 User management and authentication
- 🏨 Doctor profiles and specializations
- 📅 Appointment scheduling and management
- 👨‍⚕️ Doctor availability scheduling
- ⭐ Patient reviews and ratings
- 💊 Prescription management
- 💳 Payment processing with Stripe integration
- 🤖 AI-powered features using OpenRouter
- 📧 Email notifications
- 📁 File uploads with Cloudinary
- 🔐 JWT-based authentication

The server is built with a focus on **security**, **scalability**, and **developer experience**.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Refresh token mechanism
- Password reset functionality
- Role-based access control (Admin, Doctor, Patient)
- Secure password hashing with bcrypt

### 👨‍⚕️ Doctor Management
- Doctor profile management
- Specializations and qualifications
- Average ratings calculation
- Doctor availability status
- Doctor listing and filtering

### 📅 Appointment System
- Create and manage appointments
- Real-time appointment status tracking
- Doctor schedule management
- Automatic availability checking
- Appointment history and analytics

### 💰 Payment Integration
- Stripe payment processing
- Payment status tracking
- Webhook support for payment confirmations
- Multiple payment methods support

### ⭐ Review & Rating System
- Patient reviews for doctors
- Dynamic rating calculations
- Review moderation
- Average rating updates

### 💊 Prescription Management
- Create and manage prescriptions
- Patient prescription history
- Doctor-patient relationships through prescriptions

### 🤖 AI Integration
- OpenRouter API integration
- AI-powered health recommendations
- Natural language processing capabilities

### 📧 Email Services
- Email notifications
- Appointment reminders
- Password reset emails
- Welcome emails

### 📁 File Management
- Cloudinary integration for image uploads
- Profile picture management
- Document storage

### 📊 Advanced Features
- Pagination and sorting
- Search and filtering capabilities
- Error handling and logging
- Input validation with Zod
- Cron jobs for automated tasks

---

## 🛠️ Tech Stack

### Backend Framework
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript

### Database & ORM
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM and database toolkit

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **Zod** - Schema validation

### Payment Processing
- **Stripe** - Payment platform integration

### External Integrations
- **Cloudinary** - Cloud image hosting
- **OpenRouter** - AI/LLM API
- **Nodemailer** - Email service
- **Node Cron** - Task scheduling

### Development Tools
- **ts-node-dev** - TypeScript development server with auto-reload
- **Docker & Docker Compose** - Containerization

### Additional Libraries
- **CORS** - Cross-Origin Resource Sharing
- **Cookie Parser** - Cookie parsing middleware
- **Date-fns** - Date manipulation
- **Multer** - File upload handling
- **UUID** - Unique identifier generation
- **HTTP Status** - HTTP status codes

---

## 📁 Project Structure

```
Health-Care-Server/
│
├── 📄 src/
│   ├── 📄 server.ts              # Application entry point
│   ├── 📄 app.ts                 # Express app configuration
│   │
│   ├── 📁 config/                # Configuration files
│   │   └── index.ts              # Environment and app config
│   │
│   ├── 📁 app/
│   │   ├── 📁 modules/           # Feature modules
│   │   │   ├── admin/            # Admin management
│   │   │   ├── auth/             # Authentication
│   │   │   ├── appointment/      # Appointment scheduling
│   │   │   ├── doctor/           # Doctor management
│   │   │   ├── doctorSchedule/   # Doctor schedule
│   │   │   ├── patient/          # Patient data
│   │   │   ├── payment/          # Payment processing
│   │   │   ├── prescription/     # Prescription management
│   │   │   ├── review/           # Reviews and ratings
│   │   │   ├── schedule/         # General scheduling
│   │   │   ├── specialities/     # Medical specialities
│   │   │   ├── user/             # User management
│   │   │   └── meta/             # Metadata endpoints
│   │   │
│   │   ├── 📁 middlewares/       # Express middlewares
│   │   │   ├── checkAuth.ts      # Authentication middleware
│   │   │   ├── validateRequest.ts# Request validation
│   │   │   ├── globalErrorHandler.ts
│   │   │   └── notFound.ts
│   │   │
│   │   ├── 📁 routes/            # API route definitions
│   │   │
│   │   ├── 📁 error/             # Error handling
│   │   │   └── ApiError.ts
│   │   │
│   │   ├── 📁 helper/            # Utility functions
│   │   │   ├── jwtHelper.ts      # JWT operations
│   │   │   ├── emailSender.ts    # Email functionality
│   │   │   ├── fileUploader.ts   # File upload handling
│   │   │   ├── stripe.ts         # Stripe integration
│   │   │   ├── openRouter.ts     # AI integration
│   │   │   ├── paginationHelper.ts
│   │   │   ├── extractJsonFromMessage.ts
│   │   │   └── pick.ts
│   │   │
│   │   └── 📁 shared/            # Shared utilities
│   │       ├── prisma.ts         # Prisma client
│   │       ├── catchAsync.ts     # Async error handler
│   │       └── sendResponse.ts   # Response formatter
│   │
│   ├── 📁 generated/             # Auto-generated files
│   │   └── prisma/               # Prisma client
│   │
│   └── 📁 types/                 # TypeScript type definitions
│       └── common.ts
│
├── 📁 prisma/
│   ├── schema.prisma             # Main schema (generated)
│   ├── 📁 schema/                # Schema modules
│   │   ├── user.prisma           # User models
│   │   ├── appointment.prisma    # Appointment models
│   │   ├── schedule.prisma       # Schedule models
│   │   ├── speciality.prisma     # Speciality models
│   │   ├── patientData.prisma    # Patient data models
│   │   ├── enum.prisma           # Enums
│   │   └── ...
│   │
│   └── 📁 migrations/            # Database migrations
│       └── [migration folders]/
│
├── 📁 docs/                      # Documentation
│   ├── PROJECT_COMMANDS.md       # Command reference
│   └── LOCAL_SETUP.md            # Setup guide
│
├── 📁 plans/                     # Project planning
│   ├── database-erd.dbml         # Entity relationship diagram
│   └── database-erd.dbdiagram
│
├── 📁 uploads/                   # Local file uploads
│
├── 📄 docker-compose.yml         # Docker services configuration
├── 📄 package.json               # Project dependencies
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
└── 📄 README.md                  # This file
```

---

## 🚀 Getting Started

### Quick Start (5 minutes)

#### 1️⃣ Prerequisites
```bash
# Ensure you have installed:
# - Node.js (v16+)
# - Docker & Docker Compose
# - Git
```

#### 2️⃣ Clone & Install
```bash
git clone <repository-url>
cd Health-Care-Server
npm install
```

#### 3️⃣ Setup Environment
```bash
cp .env.example .env
# Edit .env with your configuration
```

#### 4️⃣ Start Database
```bash
docker-compose up -d
```

#### 5️⃣ Initialize Database
```bash
npx prisma migrate deploy
```

#### 6️⃣ Run Server
```bash
npm run dev
```

**Server running on:** `http://localhost:5000`

For detailed setup instructions, see [LOCAL_SETUP.md](docs/LOCAL_SETUP.md)

---

## 📚 API Modules

### 🔐 Authentication Module (`/auth`)
Handles user login, registration, logout, password reset, and token refresh.

```
POST   /auth/login
POST   /auth/register
POST   /auth/refresh-token
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password
```

### 👥 User Module (`/user`)
Manages user profiles and account settings.

```
GET    /user/all
GET    /user/{id}
PATCH  /user/{id}
DELETE /user/{id}
```

### 👨‍⚕️ Doctor Module (`/doctor`)
Doctor profile management and listing.

```
GET    /doctor/all
GET    /doctor/{id}
POST   /doctor
PATCH  /doctor/{id}
DELETE /doctor/{id}
```

### 📅 Appointment Module (`/appointment`)
Create and manage patient appointments.

```
GET    /appointment
POST   /appointment
PATCH  /appointment/{id}
DELETE /appointment/{id}
```

### 📋 Doctor Schedule Module (`/doctor-schedule`)
Manage doctor availability and working hours.

```
GET    /doctor-schedule
POST   /doctor-schedule
PATCH  /doctor-schedule/{id}
```

### ⭐ Review Module (`/review`)
Patient reviews and ratings for doctors.

```
GET    /review
POST   /review
PATCH  /review/{id}
DELETE /review/{id}
```

### 💰 Payment Module (`/payment`)
Stripe payment integration and status tracking.

```
POST   /payment/create-payment-intent
POST   /payment/webhook
GET    /payment/history
```

### 💊 Prescription Module (`/prescription`)
Prescription management and history.

```
GET    /prescription
POST   /prescription
PATCH  /prescription/{id}
```

### 📊 Meta Module (`/meta`)
Analytics and metadata endpoints.

```
GET    /meta/statistics
GET    /meta/dashboard
```

### 🏥 Specialities Module (`/specialities`)
Medical specializations management.

```
GET    /specialities
POST   /specialities
```

---

## 🗄️ Database Schema

The database is built with PostgreSQL and managed using Prisma. Key models include:

- **User** - Base user model (Admin, Doctor, Patient)
- **Doctor** - Doctor profiles with specialties and ratings
- **Patient** - Patient data and medical history
- **Appointment** - Appointment records and status
- **Schedule** - General schedule management
- **DoctorSchedule** - Doctor-specific availability
- **Review** - Patient reviews and ratings
- **Prescription** - Medical prescriptions
- **Payment** - Payment transaction records
- **Speciality** - Medical specializations

For detailed schema, see [database-erd.dbml](plans/database-erd.dbml)

---

## ⚙️ Configuration

### Environment Variables

Key environment variables needed (see `.env.example` for full list):

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://postgres:HelloWorld@localhost:5432/health_care?schema=public

# JWT
JWT_SECRET=your_secret_key
JWT_ACCESS_TOKEN_EXPIRES_IN=7d
JWT_REFRESH_TOKEN_EXPIRES_IN=30d

# External Services
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_API_KEY=your_cloudinary_key
OPENROUTER_API_KEY=your_openrouter_key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_SENDER_MAIL=your_email@gmail.com
EMAIL_SENDER_APP_PASSWORD=your_app_password

# URLs
PAYMENT_SUCCESS_URL=http://localhost:3000/payment-success
RESET_PASSWORD_LINK=http://localhost:3000/reset-password
```

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Run Prisma migrations
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio (Database UI)
npx prisma studio

# Reset database (destructive)
npx prisma migrate reset

# Format Prisma schema
npx prisma format

# Validate Prisma schema
npx prisma validate
```

### Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f db

# Access PostgreSQL directly
docker-compose exec db psql -U postgres -d health_care
```

### Useful Development Tools

- **pgAdmin** - Database management at `http://localhost:8080`
- **Prisma Studio** - Visual database browser
- **Postman/Insomnia** - API testing clients

---

## 📦 Deployment

### Docker Deployment

The project includes Docker support for easy deployment:

```bash
# Build Docker image
docker build -t health-care-server .

# Run container
docker run -p 5000:5000 --env-file .env health-care-server
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets
- [ ] Configure Stripe with production keys
- [ ] Set up email service with production credentials
- [ ] Configure database backups
- [ ] Enable HTTPS
- [ ] Set up monitoring and logging
- [ ] Configure environment-specific URLs

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Standards

- Use TypeScript for type safety
- Follow existing code structure and naming conventions
- Add proper error handling
- Write meaningful commit messages
- Test your changes thoroughly

---

## 📖 Documentation

Additional documentation available:

- [LOCAL_SETUP.md](docs/LOCAL_SETUP.md) - Step-by-step setup guide
- [PROJECT_COMMANDS.md](docs/PROJECT_COMMANDS.md) - Command reference
- [database-erd.dbml](plans/database-erd.dbml) - Database schema
- [API Documentation](docs/) - Full API reference (if available)

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Database connection failed:**
```bash
# Ensure Docker containers are running
docker-compose ps

# Restart services
docker-compose restart db
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

- 📧 **Email:** [Your email]
- 💬 **Issues:** GitHub Issues
- 📱 **Contact:** [Your contact information]

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by the Health-Care-Server team.

---

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Payment processing by [Stripe](https://stripe.com/)
- AI integration via [OpenRouter](https://openrouter.ai/)

---

**Last Updated:** February 17, 2026

Made with 💙 for better healthcare management | [Star us on GitHub ⭐](https://github.com/)
