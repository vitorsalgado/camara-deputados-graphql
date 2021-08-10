<h1 align='center'>GraphQL API &middot; Chamber of Deputies of Brazil</h1>

<p align='center'>
  <img src="docs/assets/logo.png" alt="Repository Logo" width="85px" height='85px' />
  <br />
  <i>Proxy GraphQL exposing Brazilian Chamber of Deputies Rest API using TypeScript.</i>
</p>

<p align='center'>
  <a href='https://graphql-chamber-deputies-br.herokuapp.com/graphiql' target='_blank'><strong>graphql-chamber-deputies-br.herokuapp.com/graphiql</strong></a>
</p>

<p align='center'>
  <a href="https://github.com/vitorsalgado/camara-deputados-graphql/actions/workflows/ci.yml">
    <img src="https://github.com/vitorsalgado/camara-deputados-graphql/actions/workflows/ci.yml/badge.svg" alt="GitHub Action Status" />
  </a>
  <a href="https://codecov.io/gh/vitorsalgado/camara-deputados-graphql">
    <img src="https://codecov.io/gh/vitorsalgado/camara-deputados-graphql/branch/main/graph/badge.svg?token=24HGDVTL7W" alt="Codecov" />
  </a>
  <a href="https://codeclimate.com/github/vitorsalgado/camara-deputados-graphql/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/0755f928bd5117d669a9/maintainability" alt="Maintainability" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="Prettier"/>
  </a>
  <a href="https://conventionalcommits.org">
    <img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits"/>
  </a>
  <a href="https://github.com/vitorsalgado/camara-deputados-graphql">
    <img src="https://img.shields.io/github/languages/top/vitorsalgado/camara-deputados-graphql" alt="Top Language"/>
  </a>
</p>

## Other Languages

- [Português Brasil](README.pt-br.md)

## Overview

Application that exposes Brazilian Chamber of Deputies REST API through a **GraphQL**.  
This project is intended to serve as a learning experience for GraphQL and also to explore NodeJS architecture models
with TypeScript.  
This is a **Work in Progress**.

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

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This project uses a mix of tools to enforce code-style and quality.  
**ESLint** is used for lint, **Husky**, **Pretties** and **Lint Staged** when configured, ensures that no files will be
committed without following project standards.

## Configurations

The application **Environment Variables** for configurations and the lib **DotEnv** allows you to change values on local
environment. Create a file **.env** on project root and place there the env vars you want to change.  
Check this **[Joi schema](src/config/env/env.schema.ts)**, all application environment variables are there.

## Running

### Installing Dependencies

**NPM** is the chosen package manager for this project.  
To install dependencies, run:

```
npm i
```

### Local Development

To start a local development environment with **Nodemon**, run:

```
npm run start:dev
```

### Local Development with Docker Compose

To start a local development environment with Docker Compose, run:

```
make dev-docker
```

This **Docker Compose** contains a container that executes the application with **Nodemon**
and a container for **Redis**.

### Build and Run

To build TypeScript and execute the application, run:

```
npm run build
npm start
```

### Docker

This [Dockerfile](Dockerfile) generates a minimalist docker image for the application.  
To execute an environment with a **Redis** instance and minimalist application container, execute:

```
make up
```

## Tests

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

The test framework of this project is **Jest**.  
**SuperTest** and **Nock** are used for integration tests, simulating API integrations.  
To execute the tests, run:

```
npm test
```

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvitorsalgado%2Fcamara-deputados-graphql.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fvitorsalgado%2Fcamara-deputados-graphql?ref=badge_shield)

This project is [Apache Licensed](LICENSE).
