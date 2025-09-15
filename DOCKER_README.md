# VirtuBuild Docker Setup

This Docker configuration runs both the API and frontend applications in a single container, along with PostgreSQL and pgAdmin.

## Services

- **app**: Combined API (port 9000) and Frontend (port 4200) application
- **postgres**: PostgreSQL database (port 5432)
- **pgadmin**: pgAdmin web interface (port 5050)

## Quick Start

1. **Copy environment files**:

   ```bash
   cp virtubuild-api/.env.example virtubuild-api/.env
   cp virtubuildapp/.env.example virtubuildapp/.env
   cp .env.example .env
   ```

2. **Build and start all services**:

   ```bash
   docker-compose up --build
   ```

3. **Access the applications**:
   - Frontend: http://localhost:4200
   - API: http://localhost:9000
   - pgAdmin: http://localhost:5050

## Environment Configuration

### API Environment (virtubuild-api/.env)

- Database connection settings
- JWT configuration
- CORS settings
- API keys

### Frontend Environment (virtubuildapp/.env)

- API base URL
- Application settings
- Feature flags

### Docker Environment (.env)

- PostgreSQL credentials
- pgAdmin credentials
- Port configurations

**Note**: Copy the `.env.example` files to `.env` files before running Docker Compose.

## pgAdmin Access

- **URL**: http://localhost:5050
- **Email**: admin@virtubuild.com
- **Password**: admin123

To connect to the PostgreSQL database in pgAdmin:

- **Host**: postgres
- **Port**: 5432
- **Database**: virtubuild_db
- **Username**: virtubuild
- **Password**: virtubuild123

## Development

For development with hot reload:

```bash
# Start only database services
docker-compose up postgres pgadmin

# Run API in development mode
cd virtubuild-api
npm run dev

# Run frontend in development mode
cd virtubuildapp
npm start
```

## Production Deployment

```bash
# Build and start in production mode
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Troubleshooting

1. **Port conflicts**: Ensure ports 4200, 9000, 5432, and 5050 are available
2. **Database connection**: Wait for PostgreSQL health check to pass before starting the app
3. **Environment variables**: Make sure all .env files are properly configured
4. **Build issues**: Clear Docker cache with `docker system prune -a`

## Data Persistence

- PostgreSQL data is persisted in the `postgres_data` volume
- pgAdmin data is persisted in the `pgadmin_data` volume
- Application code is mounted as volumes for development
