.PHONY: help setup build up down logs clean

help: ## Show this help message
	@echo "VirtuBuild Docker Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Setup environment files from .env.example templates
	@./setup-env.sh

build: ## Build Docker images
	@docker-compose build

up: ## Start all services
	@docker-compose up -d

up-build: ## Build and start all services
	@docker-compose up --build -d

down: ## Stop all services
	@docker-compose down

logs: ## Show logs for all services
	@docker-compose logs -f

logs-app: ## Show logs for app service only
	@docker-compose logs -f app

logs-db: ## Show logs for database service only
	@docker-compose logs -f postgres

clean: ## Remove all containers, networks, and volumes
	@docker-compose down -v --remove-orphans
	@docker system prune -f

restart: ## Restart all services
	@docker-compose restart

status: ## Show status of all services
	@docker-compose ps

dev: ## Start only database services for development
	@docker-compose up -d postgres pgadmin
	@echo "Database services started. Run your apps locally for development."
