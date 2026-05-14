# How to Run the Project Locally

This guide will help you set up and run the Health-Care-Server project on your local machine step by step.

## Prerequisites

Before you start, make sure you have these installed on your computer:

1. **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. **Docker & Docker Compose** - [Download here](https://www.docker.com/products/docker-desktop)
3. **Git** - [Download here](https://git-scm.com/)
4. **PostgreSQL (optional)** - Only if you prefer not to use Docker for the database

## Step 1: Clone the Repository

Open your terminal and run:

```bash
git clone <your-repository-url>
cd Health-Care-Server
```

## Step 2: Install Dependencies

Install all the required Node.js packages:

```bash
npm install
```

This will read the `package.json` file and install all dependencies listed there.

## Step 3: Set Up Environment Variables

The project requires environment variables to work properly. Follow these steps:

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open the `.env` file and update the values:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DATABASE_URL="postgresql://postgres:HelloWorld@localhost:5432/health_care?schema=public"

# JWT Secrets (generate your own or use placeholder)
JWT_SECRET="your_secret_key_here"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your_refresh_secret_here"
JWT_REFRESH_TOKEN_EXPIRES_IN="30d"
JWT_ACCESS_SECRET="your_access_secret_here"
JWT_ACCESS_TOKEN_EXPIRES_IN="7d"
JWT_RESET_PASS_SECRET="your_reset_secret_here"
JWT_RESET_PASS_TOKEN_EXPIRES_IN="10m"

# Email Configuration (for sending emails)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SENDER_MAIL="your_email@gmail.com"
EMAIL_SENDER_APP_PASSWORD="your_app_password"

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# OpenRouter API (for AI features)
OPENROUTER_API_KEY="your_openrouter_api_key"

# Stripe Configuration (for payments)
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# Callback URLs
PAYMENT_SUCCESS_URL="http://localhost:3000/payment-success"
PAYMENT_FAILURE_URL="http://localhost:3000/payment-failure"
PAYMENT_CANCEL_URL="http://localhost:3000/payment-cancel"
RESET_PASSWORD_LINK="http://localhost:3000/reset-password"

# Other Configuration
SALT_ROUNDS=10
```

**Note:** For local development, you can use placeholder values for external services (Stripe, Cloudinary, etc.), but the database connection is essential.

## Step 4: Start the Database

The project uses PostgreSQL with Docker. Start the database and pgAdmin:

```bash
docker-compose up -d
```

This command will:
- Start a PostgreSQL database on port `5432`
- Start pgAdmin (database management tool) on port `8080`

**Verify the database is running:**
```bash
docker-compose ps
```

You should see both services running.

**Access pgAdmin (optional):**
- URL: `http://localhost:8080`
- Email: `f.yaasinn@gmail.com`
- Password: `dbadmin`

## Step 5: Initialize the Database

Set up the database schema using Prisma migrations:

```bash
npx prisma migrate deploy
```

This command will create all the necessary tables in the PostgreSQL database based on the migration files.

**Optional: View the database in Prisma Studio**
```bash
npx prisma studio
```

This opens a UI where you can view and manage your database data.

## Step 6: Start the Development Server

Run the application in development mode:

```bash
npm run dev
```

You should see output like:
```
[server running] listening on port 5000
```

The server is now running at `http://localhost:5000`

## Step 7: Verify the Setup

The server is ready to use! You can now:

1. Make API requests to `http://localhost:5000`
2. Connect the frontend application (running on port 3000)
3. Start developing and making changes

---

## Useful Commands

### Development Commands

```bash
# Start development server with auto-reload
npm run dev

# View database in Prisma Studio
npx prisma studio

# Create a new database migration after schema changes
npx prisma migrate dev --name <migration_name>

# Reset database (careful: this deletes all data)
npx prisma migrate reset
```

### Docker Commands

```bash
# Start database services
docker-compose up -d

# Stop database services
docker-compose down

# View logs
docker-compose logs db

# View status
docker-compose ps
```

### Prisma Commands

```bash
# Format the schema file
npx prisma format

# Validate the schema
npx prisma validate

# Generate Prisma Client
npx prisma generate
```

---

## Troubleshooting

### Issue: "Port 5432 already in use"

**Solution:** The PostgreSQL port is already occupied. Either:
- Stop other services using port 5432
- Change the port in `docker-compose.yml`

```bash
# Kill the process using the port (macOS/Linux)
lsof -ti:5432 | xargs kill -9

# On Windows, use Task Manager to stop the process
```

### Issue: "Cannot find module 'dotenv'"

**Solution:** Run:
```bash
npm install
```

### Issue: "Database connection refused"

**Solution:** Make sure the database is running:
```bash
docker-compose up -d
docker-compose ps  # Verify status
```

### Issue: "Migration not found"

**Solution:** Reset the database (this will delete all data):
```bash
npx prisma migrate reset
```

### Issue: "EACCES: permission denied"

**Solution:** You may need to use `sudo` for Docker commands:
```bash
sudo docker-compose up -d
```

---

## Next Steps

Once the project is running:

1. Review the API endpoints in your API client (Postman, Insomnia, etc.)
2. Connect the frontend application
3. Configure external services (Stripe, Cloudinary, etc.) for full functionality
4. Check `docs/PROJECT_COMMANDS.md` for more detailed commands

---

## Project Structure

```
Health-Care-Server/
├── src/
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry point
│   ├── config/             # Configuration files
│   ├── app/
│   │   ├── modules/        # Feature modules (auth, doctor, patient, etc.)
│   │   ├── middlewares/    # Express middlewares
│   │   ├── routes/         # API routes
│   │   └── helpers/        # Helper functions
│   ├── generated/          # Prisma generated client
│   └── shared/             # Shared utilities
├── prisma/
│   ├── schema.prisma       # Database schema definition
│   └── migrations/         # Database migrations
├── .env                    # Environment variables
├── docker-compose.yml      # Docker services configuration
├── package.json            # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## Support

If you encounter any issues, refer to:
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Docker Documentation](https://docs.docker.com/)
- Check the `PROJECT_COMMANDS.md` file for additional commands
