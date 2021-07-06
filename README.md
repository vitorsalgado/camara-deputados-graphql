<a href="https://github.com/vitorsalgado/camara-deputados-graphql" target="_blank"><img src="docs/assets/logo.png" alt="Câmera dos Deputados GraphQL Logo" width="85px" align="right" /></a>

# GraphQL - Brazilian Chamber of Deputies API

[![ci](https://github.com/vitorsalgado/camara-deputados-graphql/actions/workflows/ci.yml/badge.svg)](https://github.com/vitorsalgado/camara-deputados-graphql/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/vitorsalgado/camara-deputados-graphql/branch/main/graph/badge.svg?token=24HGDVTL7W)](https://codecov.io/gh/vitorsalgado/camara-deputados-graphql)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![GitHub top language](https://img.shields.io/github/languages/top/vitorsalgado/camara-deputados-graphql)

## Other Languages

* [Português Brasil](README.pt-br.md)

## Overview

Application that exposes Brazilian Chamber of Deputies REST API through a **GraphQL**.  
This project is intended to serve as a learning experience for GraphQL and also to explore NodeJS architecture models
with TypeScript.  
It is still a **Work in Progress**.

## Demo

A **demo** application is available
on: [https://graphql-chamber-deputies-br.herokuapp.com/playground](https://graphql-chamber-deputies-br.herokuapp.com/playground)

## Open Data - Chamber of Deputies API

This is the [Swagger](https://dadosabertos.camara.leg.br/swagger/api.html) documentation for the API which this
application uses to get all data.

## Tech

* **TypeScript**
* Fastify
* Drizzle-Http
* Mercuries
* Pino
* Redis
* Jest / Nock / Supertest
* Docker / Docker Compose
* ESLint / Prettier / Husky / Lint Staged

## Dev

This project uses a mix of tools to enforce code-style and quality.  
**ESLint** is used for lint, **Husky**, **Pretties** and **Lint Staged** when configured, ensures that no files are
committed without following project standards.

## Configurations

The application **Environment Variables** for configurations and the lib **DotEnv** allows you to change values on local
environment. Create a file **.env** on project root and place there the env vars you want to change.  
Check this **[Joi schema](src/config/env/env.schema.ts)**, all application environment variables are here.

## Running

### Installing Dependencies

This project uses **Yarn 2** for dependencies management.  
Run:

```
yarn
```

### Local Development

On development environments, use the command below to start the application with **Nodemon**:

```
yarn start:dev
```

### Local Development with Docker Compose

To execute a environment with Docker Compose, execute:

```
make dev
```

This **Docker Compose** contains a container that executes the application with **Nodemon** and a container for **
Redis**.

### Build and Run

To build TypeScript and execute the application, run:

```
yarn build
yarn start
```

### Docker

This [Dockerfile](build/Dockerfile) generates a minimalist docker image for the application.  
To execute an environment with a **Redis** instance and minimalist application container, execute:

```
make up
```

## Tests &middot; [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Tests are base on **Jest** and for the features, **SuperTest** and **Nock** are used for integration tests, simulating
API integrations.  
To execute the tests, run:

```
yarn test
```

## Project Structure

The project structure groups business code by **domain** instead of the traditional *controllers, services,
repositories, models* and is part based on [Go Project Layout](https://github.com/golang-standards/project-layout),
which is actually a Go pattern but, the idea is interesting. The source structure explanation below:

- deployments - Deployments files for any environment
- docs - Project documentations
- scripts - Support scripts for the project
- src
  - cmd - Start scripts, separated by folders. Could contain the start script for HTTP Server and Worker.
  - config - Application configurations
  - data - Shared data components. In this case, the Chamber of Deputies API is here because it is the base and shared
    for all features.
  - features - All feature components goes here separated by *domain*
    - deputies
    - parties
  - srv - Application Server components
  - utils - Support code for application. Utilities specific for a domain needs to go on the respective domain folder
    inside *features*

## License

This project is [Apache Licensed](LICENSE).
