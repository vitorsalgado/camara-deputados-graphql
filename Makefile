SHELL := /bin/bash

.DEFAULT_GOAL := help
.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Run the project using Docker Compose
	@docker-compose -f ./deployments/docker-compose.yml --env-file .env up

dev: ## Run dev environment
	@docker-compose -f ./deployments/docker-compose-dev.yml --env-file .env up

down: ## Stop and kill all Docker containers
	@docker-compose -f ./deployments/docker-compose.yml down --remove-orphans --volumes

rebuild: ## Stop, remove and rebuild all Docker containers
	@docker-compose -f ./deployments/docker-compose.yml down --remove-orphans --volumes
	@docker-compose -f ./deployments/docker-compose.yml build
