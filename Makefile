.PHONY: help build up down logs clean prune

COMPOSE_DEV := docker compose -f docker-compose.dev.yml
COMPOSE_PROD := docker compose -f docker-compose.prod.yml

help: ## Mostrar ayuda
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Construir imágenes Docker (desarrollo)
	$(COMPOSE_DEV) build

up: ## Levantar todos los servicios en desarrollo
	$(COMPOSE_DEV) up -d

down: ## Detener y eliminar contenedores de desarrollo
	$(COMPOSE_DEV) down

logs: ## Ver logs de todos los servicios en desarrollo
	$(COMPOSE_DEV) logs -f

logs-backend: ## Ver logs del backend
	$(COMPOSE_DEV) logs -f backend-development

logs-frontend: ## Ver logs del frontend
	$(COMPOSE_DEV) logs -f frontend-development

logs-db: ## Ver logs de SQL Server
	$(COMPOSE_DEV) logs -f sqlserver

clean: ## Detener y eliminar contenedores, redes y volúmenes de desarrollo
	$(COMPOSE_DEV) down -v --remove-orphans

prune: ## Eliminar imágenes no utilizadas
	docker image prune -f

build-prod: ## Construir imágenes Docker (producción)
	$(COMPOSE_PROD) build

up-prod: ## Levantar todos los servicios en producción
	$(COMPOSE_PROD) up -d

down-prod: ## Detener y eliminar contenedores de producción
	$(COMPOSE_PROD) down

status: ## Estado de los contenedores en desarrollo
	$(COMPOSE_DEV) ps
