# VirtuBuild Development Guide

This guide explains how to run VirtuBuild in development mode with live reload for both frontend and backend.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git (for cloning the repository)

### Starting Development Environment

1. **Start the development environment with live reload:**
   ```bash
   ./scripts/dev-start.sh
   ```

2. **Access the applications:**
   - **Frontend**: http://localhost:4200 (with live reload)
   - **Backend API**: http://localhost:9000 (with live reload)
   - **Database**: localhost:5432
   - **PgAdmin**: http://localhost:5050

3. **Stop the development environment:**
   ```bash
   ./scripts/dev-stop.sh
   ```

## 🔄 Live Reload Features

### Backend Live Reload
- **Technology**: Nodemon
- **What it watches**: All TypeScript files in `virtubuild-api/src/`
- **Auto-restart**: When you save any `.ts` file, the backend automatically restarts
- **Database**: Automatically sets up database on first run

### Frontend Live Reload
- **Technology**: Angular CLI with `ng serve`
- **What it watches**: All files in `virtubuildapp/src/`
- **Auto-reload**: When you save any file, the browser automatically refreshes
- **Hot Module Replacement**: CSS and component changes update without full page reload

## 📁 Development File Structure

```
virtubuildallapp-repo/
├── docker-compose.dev.yml          # Development Docker Compose
├── docker-compose.yml              # Production Docker Compose
├── scripts/
│   ├── dev-start.sh               # Start development environment
│   └── dev-stop.sh                # Stop development environment
├── virtubuild-api/                # Backend source (live reload)
│   ├── src/                       # TypeScript source files
│   ├── package.json               # Backend dependencies
│   └── .env                       # Backend environment variables
└── virtubuildapp/                 # Frontend source (live reload)
    ├── src/                       # Angular source files
    ├── package.json               # Frontend dependencies
    └── .env                       # Frontend environment variables
```

## 🛠️ Development Workflow

### 1. Making Backend Changes
1. Edit any file in `virtubuild-api/src/`
2. Save the file
3. Nodemon automatically restarts the backend
4. API changes are immediately available

### 2. Making Frontend Changes
1. Edit any file in `virtubuildapp/src/`
2. Save the file
3. Browser automatically refreshes
4. UI changes are immediately visible

### 3. Database Changes
- Database is persistent across restarts
- Use `npm run db:migrate` inside the backend container for schema changes
- Use `npm run db:seed` to reset data

## 🔧 Configuration

### Environment Variables
- **Backend**: `virtubuild-api/.env`
- **Frontend**: `virtubuildapp/.env`
- **Root**: `.env` (for Docker Compose)

### Port Configuration
- **Frontend**: 4200 (configurable in docker-compose.dev.yml)
- **Backend**: 9000 (configurable in docker-compose.dev.yml)
- **Database**: 5432
- **PgAdmin**: 5050

### Volume Mounts
- Source code is mounted as volumes for live reload
- `node_modules` are excluded from volume mounts for performance
- Database data persists in Docker volumes

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes on ports
   docker-compose -f docker-compose.dev.yml down
   # Or manually kill processes
   lsof -ti:4200 | xargs kill -9
   lsof -ti:9000 | xargs kill -9
   ```

2. **Database connection issues**
   ```bash
   # Check if database is running
   docker-compose -f docker-compose.dev.yml ps
   # Restart database
   docker-compose -f docker-compose.dev.yml restart postgres
   ```

3. **Node modules issues**
   ```bash
   # Rebuild containers
   docker-compose -f docker-compose.dev.yml up --build --force-recreate
   ```

4. **Permission issues (Linux/Mac)**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging

1. **View all logs**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

2. **View specific service logs**
   ```bash
   # Backend logs
   docker-compose -f docker-compose.dev.yml logs -f virtubuild-api-dev
   
   # Frontend logs
   docker-compose -f docker-compose.dev.yml logs -f virtubuild-frontend-dev
   ```

3. **Access container shell**
   ```bash
   # Backend container
   docker exec -it virtubuild-api-dev sh
   
   # Frontend container
   docker exec -it virtubuild-frontend-dev sh
   ```

## 🚀 Production

For production deployment, use the regular `docker-compose.yml`:

```bash
# Production deployment
docker-compose up --build
```

## 📝 Development Tips

1. **Use your IDE's file watcher** - Most IDEs can detect file changes and auto-save
2. **Keep browser dev tools open** - See live reload in action
3. **Use browser extensions** - React DevTools, Redux DevTools, etc.
4. **Monitor logs** - Keep an eye on container logs for errors
5. **Database management** - Use PgAdmin for database inspection

## 🔄 Switching Between Development and Production

```bash
# Development (with live reload)
./scripts/dev-start.sh

# Production (optimized build)
docker-compose up --build

# Stop development
./scripts/dev-stop.sh

# Stop production
docker-compose down
```

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Angular CLI Documentation](https://angular.io/cli)
- [Node.js Development Best Practices](https://nodejs.org/en/docs/guides/)
- [TypeScript Configuration](https://www.typescriptlang.org/docs/)
