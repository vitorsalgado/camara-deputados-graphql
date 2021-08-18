SHELL := /bin/bash

.DEFAULT_GOAL := help
.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Run the project using Docker Compose
	@docker-compose -f ./deployments/docker-compose.yml up

.PHONY: dev
dev: ## Run local dev environment
	npm run start:dev

dev-docker: ## Run dev environment with Docker Compose
	@docker-compose -f ./deployments/docker-compose-dev.yml up

down: ## Stop and kill all Docker containers
	@docker-compose -f ./deployments/docker-compose.yml down --remove-orphans --volumes
	@docker-compose -f ./deployments/docker-compose.yml rm -f
	@docker-compose -f ./deployments/docker-compose-dev.yml down --remove-orphans --volumes
	@docker-compose -f ./deployments/docker-compose-dev.yml rm -f

rebuild: ## Stop, remove and rebuild all Docker containers
	@docker-compose -f ./deployments/docker-compose.yml down --remove-orphans --volumes
	@docker-compose -f ./deployments/docker-compose.yml --verbose build

.PHONY: deps
deps: ## Install dependencies on CI environment
	npm ci

.PHONY: test
test: ## Run tests for CI
	npm run test:ci
	npm run test:coverage:upload

lint: ## Run all lint and code style tools
	npm run lint
	npm run prettier:ci

nvm: ## Install Node.js version described on .nvmrc
	[ -s "$$HOME/.nvm/nvm.sh" ] && . "$$HOME/.nvm/nvm.sh" && \
	nvm install $$(cat .nvmrc) && \
	nvm use
