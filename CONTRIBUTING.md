# Contributing

This document contains all guidelines to contribute to this repository.  
Before reading this, it's a good idea to read first the [README.md](README.md) to get a good overview about this
project.

## Code Style

This project uses **ESLint** and **Prettier** to ensure code conventions and style.  
We also use a mix of tools to ensure that no code will be committed without the correct style. These tools are: **Commit
Lint**, **Lint Staged** and **Husky**.  
These tools will be installed and configured by the **postinstall** script, on [package.json](package.json).

## Commit

Commits should follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification and should be
focused.  
**Commit Lint** along with **Husky**, will enforce that your commit messages follow the specification.
