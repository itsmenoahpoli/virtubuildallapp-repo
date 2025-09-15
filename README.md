# VirtuBuild

A comprehensive full-stack application built with Angular frontend and Node.js backend, designed for virtual building and construction management.

## 🏗️ Project Overview

VirtuBuild is a modern web application that provides virtual building and construction management capabilities. The application consists of a React-based frontend dashboard and a robust Node.js API backend with PostgreSQL database integration.

## 🛠️ Tech Stack

### Frontend (virtubuildapp/)
- **Framework**: Angular 19.1.0
- **Build Tool**: Vite with Angular plugin
- **UI Libraries**: 
  - Angular Material 19.2.14
  - Taiga UI 4.38.0 (comprehensive UI kit)
- **State Management**: NgRx 19.2.0 (Store, Effects, Entity, DevTools)
- **Styling**: 
  - SCSS
  - Tailwind CSS 4.1.5
- **Icons**: FontAwesome 6.7.2
- **HTTP Client**: Axios 1.9.0
- **Development**: Angular CLI 19.1.7

### Backend (virtubuild-api/)
- **Runtime**: Node.js
- **Framework**: Express 4.21.2
- **Language**: TypeScript 5.7.3
- **ORM**: TypeORM 0.3.20
- **Database**: PostgreSQL 15
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: Argon2 0.41.1
- **Validation**: Class Validator 0.14.1, Class Transformer 0.5.1
- **Documentation**: Swagger/OpenAPI 3.0
- **Security**: Helmet 8.0.0, CORS 2.8.5, HPP 0.2.3
- **Logging**: Morgan 1.10.0
- **Development**: Nodemon 3.1.9

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database Management**: pgAdmin 4
- **Process Management**: Makefile commands
- **Environment Management**: Environment-specific configuration files

## 📁 Project Structure

```
VirtuBuild/
├── virtubuildapp/                 # Angular Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/              # Core services, API, store
│   │   │   ├── features/          # Feature modules (auth, dashboard)
│   │   │   └── shared/            # Shared components and utilities
│   │   ├── environments/          # Environment configurations
│   │   └── styles/                # Global styles
│   ├── angular.json               # Angular CLI configuration
│   ├── vite.config.ts             # Vite configuration
│   └── package.json               # Frontend dependencies
├── virtubuild-api/                # Node.js Backend API
│   ├── src/
│   │   ├── modules/               # Feature modules (auth, users, system)
│   │   ├── database/              # Database entities and configuration
│   │   ├── middlewares/           # Express middlewares
│   │   ├── decorators/            # Custom decorators
│   │   ├── utils/                 # Utility functions
│   │   └── configs/               # Application configurations
│   ├── dist/                      # Compiled JavaScript output
│   ├── logs/                      # Application logs
│   └── package.json               # Backend dependencies
├── init-scripts/                  # Database initialization scripts
├── docker-compose.yml             # Docker services configuration
├── Dockerfile                     # Main application Docker image
├── Makefile                       # Development commands
└── setup-env.sh                   # Environment setup script
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18+ (recommended: v20+)
- **npm**: v9+
- **Docker**: v20+ with Docker Compose
- **Git**: Latest version

### 1. Clone the Repository

```bash
git clone <repository-url>
cd VirtuBuild
```

### 2. Environment Setup

```bash
# Setup environment files from templates
make setup
```

This creates the following environment files:
- `.env` - Main Docker configuration
- `virtubuild-api/.env` - Backend API configuration
- `virtubuildapp/.env` - Frontend configuration

### 3. Start with Docker (Recommended)

```bash
# Build and start all services
make up-build

# Or using docker-compose directly
docker-compose up --build -d
```

### 4. Access the Application

- **Frontend Dashboard**: http://localhost:4200
- **Backend API**: http://localhost:9000
- **API Documentation**: http://localhost:9000/api-docs
- **Database Admin (pgAdmin)**: http://localhost:5050

## 🛠️ Development Setup

### Backend Development

```bash
cd virtubuild-api

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

**Backend runs on**: http://localhost:9000

### Frontend Development

```bash
cd virtubuildapp

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

**Frontend runs on**: http://localhost:4200

### Database Development

```bash
# Start only database services
make dev

# This starts PostgreSQL and pgAdmin
# Run your applications locally for development
```

## 📋 Available Commands

### Docker Commands (via Makefile)

```bash
make help          # Show all available commands
make setup         # Setup environment files
make build         # Build Docker images
make up            # Start all services
make up-build      # Build and start all services
make down          # Stop all services
make logs          # Show logs for all services
make logs-app      # Show logs for app service only
make logs-db       # Show logs for database service only
make clean         # Remove all containers, networks, and volumes
make restart       # Restart all services
make status        # Show status of all services
make dev           # Start only database services for development
```

### Backend Commands

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm run start      # Start production server
npm run start:preview  # Build and start production server
npm run prettier:format  # Format code with Prettier
npm run db:sync    # Synchronize database schema
```

### Frontend Commands

```bash
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Build and watch for changes
npm test           # Run unit tests
```

## 🔧 Configuration

### Environment Variables

#### Main Configuration (.env)
```env
POSTGRES_USER=virtubuild
POSTGRES_PASSWORD=virtubuild123
POSTGRES_DB=virtubuild_db
PGADMIN_EMAIL=admin@virtubuild.com
PGADMIN_PASSWORD=admin123
API_PORT=9000
FRONTEND_PORT=4200
```

#### Backend Configuration (virtubuild-api/.env)
```env
APP_DB_HOST=postgres
APP_DB_PORT=5432
APP_DB_USERNAME=virtubuild
APP_DB_PASSWORD=virtubuild123
APP_DB_DATABASE=virtubuild_db
NODE_ENV=production
PORT=9000
API_KEY=your-secret-api-key-here
JWT_SECRET=your-jwt-secret-key-here
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:4200
LOG_LEVEL=info
```

#### Frontend Configuration (virtubuildapp/.env)
```env
API_BASE_URL=http://localhost:9000
ENVIRONMENT=production
APP_TITLE=VirtuBuild Dashboard
APP_VERSION=1.0.0
ENABLE_ANALYTICS=false
ENABLE_DEBUG=false
```

## 🗄️ Database

### PostgreSQL Configuration
- **Version**: PostgreSQL 15 (Alpine)
- **Default Database**: `virtubuild_db`
- **Default User**: `virtubuild`
- **Port**: 5432

### Database Management
- **pgAdmin**: Web-based PostgreSQL administration
- **Access**: http://localhost:5050
- **Default Login**: admin@virtubuild.com / admin123

### Database Schema
The application uses TypeORM entities for database management:
- **User Entity**: User management and authentication
- **User Role Entity**: Role-based access control
- **Shared Entity**: Common fields (timestamps, soft deletes)

## 🔐 Authentication & Security

### JWT Authentication
- **Algorithm**: HS256
- **Expiration**: 24 hours (configurable)
- **Secret**: Configurable via environment variables

### Security Features
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **HPP**: HTTP Parameter Pollution protection
- **Password Hashing**: Argon2 (industry standard)
- **Input Validation**: Class Validator decorators
- **API Key Protection**: Middleware-based API key validation

## 📚 API Documentation

### Swagger/OpenAPI Documentation
- **Development**: http://localhost:9000/api-docs
- **Production**: `{BASE_URL}/api-docs`

### Available Endpoints

#### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration

#### System
- `GET /api/system/healthcheck` - System health status

#### User Roles
- `GET /api/user-roles` - List user roles (with pagination)
- `GET /api/user-roles/{id}` - Get specific user role
- `POST /api/user-roles` - Create new user role
- `PATCH /api/user-roles/{id}` - Update user role
- `DELETE /api/user-roles/{id}` - Delete user role

## 🌿 Branching Strategy

### Git Flow Model

#### Main Branches
- **`main`**: Production-ready code
- **`develop`**: Integration branch for features

#### Supporting Branches
- **`feature/*`**: New features (e.g., `feature/user-management`)
- **`bugfix/*`**: Bug fixes (e.g., `bugfix/auth-validation`)
- **`hotfix/*`**: Critical production fixes (e.g., `hotfix/security-patch`)
- **`release/*`**: Release preparation (e.g., `release/v1.2.0`)

### Branch Naming Convention
```
feature/description-of-feature
bugfix/description-of-bug
hotfix/description-of-hotfix
release/version-number
```

### Workflow
1. **Feature Development**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/new-feature
   # Develop feature
   git push origin feature/new-feature
   # Create Pull Request to develop
   ```

2. **Release Process**:
   ```bash
   git checkout develop
   git checkout -b release/v1.0.0
   # Final testing and bug fixes
   git checkout main
   git merge release/v1.0.0
   git tag v1.0.0
   ```

3. **Hotfix Process**:
   ```bash
   git checkout main
   git checkout -b hotfix/critical-fix
   # Fix critical issue
   git checkout main
   git merge hotfix/critical-fix
   git tag v1.0.1
   git checkout develop
   git merge hotfix/critical-fix
   ```

## 🧪 Testing

### Backend Testing
```bash
cd virtubuild-api
npm test
```

### Frontend Testing
```bash
cd virtubuildapp
npm test
```

## 📦 Deployment

### Docker Deployment
```bash
# Build production images
make build

# Deploy with docker-compose
make up
```

### Manual Deployment
1. Build backend: `cd virtubuild-api && npm run build`
2. Build frontend: `cd virtubuildapp && npm run build`
3. Configure production environment variables
4. Start services with PM2 or similar process manager

## 🔍 Monitoring & Logging

### Application Logs
- **Backend Logs**: `virtubuild-api/logs/`
- **Request Logs**: Morgan middleware for HTTP request logging
- **Error Logs**: Global error handling middleware

### Health Checks
- **API Health**: `GET /api/system/healthcheck`
- **Database Health**: Built-in PostgreSQL health checks

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use Prettier for code formatting
3. Write meaningful commit messages
4. Create feature branches from `develop`
5. Ensure all tests pass before submitting PR

### Code Style
- **Backend**: ESLint + Prettier
- **Frontend**: Angular Style Guide + Prettier
- **Commit Messages**: Conventional Commits format

## 📞 Support

For questions, issues, or contributions:
- **Issues**: Create GitHub issues for bugs and feature requests
- **Documentation**: Check API documentation at `/api-docs`
- **Development Team**: Contact the development team for technical support

## 📄 License

This project is licensed under the ISC License.

---

**VirtuBuild** - Virtual Building and Construction Management Platform
