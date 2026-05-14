# Project Commands Documentation

This document provides a quick reference guide for essential commands used in the Health-Care-Server project.

## Table of Contents

1. [Git Commands](#git-commands)
2. [Prisma Commands](#prisma-commands)
3. [Development Commands](#development-commands)
4. [Docker Commands](#docker-commands)
5. [Terminal Control](#terminal-control)

---

## Git Commands

Git commands are used to manage version control and track changes to your code.

### `git add .`

**Purpose**: Stage all changes in your working directory for commit.

**Usage**:
```bash
git add .
```

---

### `git commit -m "message"`

**Purpose**: Save staged changes with a descriptive message.

**Usage**:
```bash
git commit -m "your commit message here"
```


**Real Examples**:
```bash
git commit -m "feat(auth): Add user authentication middleware"
git commit -m "fix(appointment): Fix appointment scheduling bug"
git commit -m "chore(doctor-specialties): Update database schema for doctor specialties"
git commit -m "feat(payment): Implement payment processing with Stripe"
```

---

### `git push`

**Purpose**: Upload your local commits to the remote repository (GitHub).

**Usage**:
```bash
git push
```

**Common Scenarios**:
```bash
# Push to current branch (default behavior)
git push

# Push to specific branch
git push origin main

# Push to a new remote branch
git push -u origin feature-branch-name
```

---

## Prisma Commands

Prisma commands manage your database schema, migrations, and data access layer.

### `npx prisma migrate dev`

**Purpose**: Create and apply database migrations during development.

**Usage**:
```bash
npx prisma migrate dev
```

**What it does**:
1. Detects changes in your `schema.prisma` file
2. Generates a migration file with SQL commands
3. Applies the migration to your development database
4. Regenerates the Prisma Client

**When to use**:
- After modifying the `schema.prisma` file
- When adding new database tables or fields
- When changing table relationships

**Example Flow**:
```bash
# 1. Modify schema.prisma (add a new User field)
# 2. Run the command
npx prisma migrate dev

# 3. You'll be prompted to name the migration
# Example: "add_user_phone_field"
# The migration is created and applied
```

**Important Notes**:
- Only use on development databases
- Will prompt you to name the migration
- Creates version control for database changes

---

### `npx prisma generate`

**Purpose**: Generate or regenerate the Prisma Client.

**Usage**:
```bash
npx prisma generate
```

**What it does**:
- Generates TypeScript type definitions from your schema
- Creates the Prisma Client for database operations
- Updates type completeness and autocomplete in your IDE

**When to use**:
- After updating your `schema.prisma` file
- When you see type errors in your IDE
- After pulling schema changes from teammates
- If Prisma Client gets out of sync with your schema

**Why it matters**:
- Provides type safety for database queries
- Enables IDE autocomplete suggestions
- Catches schema mismatches early

---

### `npx prisma studio`

**Purpose**: Open a visual database management interface in your browser.

**Usage**:
```bash
npx prisma studio
```

**To Stop**:
- Press `CTRL+C` in the terminal
- Or close the browser tab (the server continues running)

---

## Development Commands

### `npm run dev`

**Purpose**: Start the development server with hot reload.

**Usage**:
```bash
npm run dev
```

**What it does**:
- Starts your Express.js/TypeScript server
- Enables hot reload (auto-restarts on code changes)
- Watches for file changes using nodemon
- Makes your API available (typically on `http://localhost:3000`)

**When to use**:
- Start of your development session
- After major code changes
- When you want to test your API endpoints

**Server is Ready When You See**:
```
[server running on port 3000]
```

**Accessing Your API**:
- API Base: `http://localhost:3000`
- Example endpoints:
  - `http://localhost:3000/api/users`
  - `http://localhost:3000/api/appointments`
  - `http://localhost:3000/api/doctors`

---

## Docker Commands

Docker commands manage containerization and orchestration of your application services.

### `docker compose up -d`

**Purpose**: Start all Docker containers defined in docker-compose.yml in detached mode (background).

**Usage**:
```bash
docker compose up -d
```

**What it does**:
1. Reads the `docker-compose.yml` file
2. Creates containers for all defined services (e.g., database, cache)
3. Starts all containers in the background
4. Returns immediately without blocking the terminal

**When to use**:
- Starting your local development environment
- Initial project setup
- When you need services (like PostgreSQL) to run in the background

**Example Output**:
```
✔ Network health-care-server_default  Created
✔ Container health-care-server-db-1  Started
✔ Container health-care-server-redis-1  Started
```

**View Running Containers**:
```bash
docker ps
```

**View Logs**:
```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs db

# Follow logs in real-time
docker compose logs -f
```

---

### `docker compose down`

**Purpose**: Stop and remove all Docker containers defined in docker-compose.yml.

**Usage**:
```bash
docker compose down
```

**What it does**:
1. Stops all running containers
2. Removes the containers (but keeps volumes and images by default)
3. Removes networks created by docker-compose

**When to use**:
- Ending your development session
- Cleaning up before a fresh start
- When you need to reset services

**Example Output**:
```
✔ Container health-care-server-db-1  Removed
✔ Container health-care-server-redis-1  Removed
✔ Network health-care-server_default  Removed
```

**Common Variations**:
```bash
# Stop containers but don't remove them
docker compose stop

# Remove containers and volumes (careful!)
docker compose down -v

# Remove containers, volumes, and images
docker compose down -v --rmi all
```

---

### Docker Volume Commands

Docker volumes persist data between container restarts. Here are the basic commands:

#### **List All Volumes**

```bash
docker volume ls
```

**What it shows**:
- All Docker volumes on your system
- Volume drivers and names

**Example Output**:
```
DRIVER    VOLUME NAME
local     health-care-server_postgres_data
local     health-care-server_redis_data
```

---

#### **Inspect a Volume**

```bash
docker volume inspect <volume-name>
```

**What it does**:
- Shows detailed information about a volume
- Displays mount point and driver details

**Example**:
```bash
docker volume inspect health-care-server_postgres_data
```

**Example Output**:
```json
[
  {
    "Name": "health-care-server_postgres_data",
    "Driver": "local",
    "Mountpoint": "/var/lib/docker/volumes/health-care-server_postgres_data/_data",
    "Labels": {},
    "Scope": "local"
  }
]
```

---

#### **Remove a Volume**

```bash
docker volume rm <volume-name>
```

**What it does**:
- Deletes a Docker volume permanently
- **Warning**: This deletes all data in the volume

**Example**:
```bash
# Remove a specific volume
docker volume rm health-care-server_postgres_data
```

**Safety Tip**:
- Make sure no containers are using the volume
- Only remove volumes you no longer need

---

#### **Remove Unused Volumes**

```bash
docker volume prune
```

**What it does**:
- Removes all volumes not used by any container
- Frees up disk space
- Requires confirmation before proceeding

**Example Output**:
```
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
health-care-server_old_data

Total reclaimed space: 2.5GB
```

---

#### **View Volume Data**

```bash
# Docker for Windows/Mac - Locate the mount point
docker volume inspect <volume-name>

# On Linux - Access the data directly
sudo ls /var/lib/docker/volumes/<volume-name>/_data
```

---

### Common Docker Workflows

**Full Clean Restart**:
```bash
# Stop and remove all containers and volumes
docker compose down -v

# Start fresh
docker compose up -d
```

**Check Database Service**:
```bash
# View database logs
docker compose logs db

# Access database container
docker compose exec db psql -U postgres
```

**Troubleshooting**:
```bash
# View all running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View container details
docker inspect <container-id>

# Stop a specific container
docker stop <container-id>
```

---

## Terminal Control

### `CTRL+C`

**Purpose**: Terminate the currently running process in the terminal.

**Usage**:
```
Press CTRL+C while a process is running
```

**Common Examples**:
```bash
# Server is running and you want to stop it
# Press CTRL+C

# Close Prisma Studio
# Press CTRL+C in the terminal where it's running

# Cancel a migration or other command
# Press CTRL+C
```

---

## Common Workflows

### 1. Starting Development Session

```bash
# Start the development server
npm run dev

# In another terminal, open Prisma Studio to view data
npx prisma studio
```

### 2. Making Code Changes and Pushing

```bash
# Make changes to your code...

# Stage all changes
git add .

# Commit with a meaningful message
git commit -m "Add new user profile endpoint"

# Push to remote repository
git push
```

### 3. Updating Database Schema

```bash
# Edit your schema.prisma file...

# Create and apply migration
npx prisma migrate dev

# Name the migration when prompted (e.g., "add_user_profile_table")

# Regenerate Prisma Client
npx prisma generate

# Restart your development server if needed
# (Press CTRL+C, then run npm run dev again)
```

### 4. Inspecting Database During Development

```bash
# While server is running (npm run dev) in one terminal

# In another terminal, open database viewer
npx prisma studio

# View and manage your data visually at http://localhost:5555

# Stop Prisma Studio when done
# Press CTRL+C
```

### 5. Docker-Based Development Setup

```bash
# Start all services (database, cache, etc.) in background
docker compose up -d

# Start your application server
npm run dev

# In another terminal, view database with Prisma Studio
npx prisma studio

# When finished with development
docker compose down
```

### 6. Database Troubleshooting with Docker

```bash
# View container logs
docker compose logs db

# Check running containers
docker ps

# Full reset: remove containers and volumes, then start fresh
docker compose down -v
docker compose up -d

# Clean up unused volumes
docker volume prune
```

---

## Best Practices for Docker

✅ **Do**:
- Use `docker compose up -d` to start services in the background
- Use `docker compose logs -f` to monitor service health
- Use volumes for persistent data (database, uploads)
- Run `docker compose down` when not developing to free resources
- Regularly clean up unused volumes with `docker volume prune`

❌ **Don't**:
- Remove volumes without backing up important data
- Run containers without proper error handling
- Leave containers running unnecessarily
- Hardcode credentials in Docker files

---

**Last Updated**: February 15, 2026  
**Project**: Health-Care-Server
