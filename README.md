# Employee Management App (Angular)

[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev)
[![CI](https://github.com/Hussain-sindhi/Angular-Practice/actions/workflows/ci.yml/badge.svg)](https://github.com/Hussain-sindhi/Angular-Practice/actions/workflows/ci.yml)
[![Tests](https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)

A single-page Angular application for managing employee records. It covers user sign-up and login, token-based API access through an HTTP interceptor, and a screen to create, view, edit and delete employees against a REST API.

> **Note:** This repository contains the **frontend only**. It expects a separate REST API running at `http://localhost:3000` (the app's UI describes it as a Node.js REST API with PostgreSQL and JWT). The backend is not part of this repo.

## Features

- **Authentication**: sign-up and login screens that call the API, store the returned access token in `localStorage`, and support logout from the navbar.
- **HTTP interceptor**: a functional interceptor (`core/auth.interceptor.ts`) attaches the stored token as a `Bearer` header to outgoing requests.
- **Employee management**: a form plus table to create, list, edit and delete employees (name, email, department, designation, salary and more).
- **API service layer**: `EmployeeService` and `AuthService` wrap the REST endpoints, including support for pagination (`page`, `limit`) and department filtering in list requests.
- **Routing**: client-side routes for login, signup, home, about, profile and employee details (including an `:id` route parameter).
- **Forms**: template-driven forms (login, signup) and a reactive form (sign-in) with built-in and custom validators, for example a weak-password check.
- **Component communication**: a parent/child example using `@Input`, `@Output` and lifecycle hooks.
- **Tests**: unit-test specs for each component, run with `npm test` and in CI on every push.

## Tech stack

| Area | Technology |
|---|---|
| Framework | Angular 22 (standalone components) |
| Language | TypeScript |
| Reactive programming | RxJS |
| Build | `@angular/build` (Angular CLI) |
| Testing | Vitest with jsdom |
| Formatting | Prettier |

## Getting started

### Prerequisites

- Node.js and npm (a version supported by Angular 22)
- The companion REST API running at `http://localhost:3000`, exposing `/api/auth` and `/api/employees`

### Install and run

```bash
git clone https://github.com/Hussain-sindhi/Angular-Practice.git
cd Angular-Practice
npm install
npm start
```

Open `http://localhost:4200/`. The app reloads automatically when you change a source file.

### Other commands

```bash
npm run build   # production build into dist/
npm test        # run unit tests
npm run watch   # development build in watch mode
```

## Project structure

```text
src/app/
├── about/            # About page
├── core/
│   └── auth.interceptor.ts   # Adds the Bearer token to requests
├── empdetails/       # Employee create / list / edit / delete screen
├── employee/         # Employee model component
├── home/             # Home page (with child component demo)
├── login/            # Login form
├── my-self/          # Profile page with route-parameter navigation
├── navbar/           # Navigation and logout
├── services/
│   ├── auth.service.ts       # Register, login, token storage
│   └── employee.service.ts   # Employee REST calls
├── sign-in/          # Reactive form with custom validation
├── signup/           # Registration form
├── app.config.ts     # Providers: router and HTTP client with interceptor
└── app.routes.ts     # Route table
```

## API endpoints used

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in and receive an access token |
| GET | `/api/employees` | List employees (`page`, `limit`, `department`) |
| GET | `/api/employees/:id` | Get one employee |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

## Documentation

- [`EMPDETAILS_FIXES_EXPLAINED.md`](EMPDETAILS_FIXES_EXPLAINED.md): notes on bugs fixed in the employee details component.

## Roadmap

- [x] Move the API base URL into one shared config file (`src/app/core/api.config.ts`)
- [x] Remove the hardcoded default login from `AuthService`; users now log in through the login page
- [x] Merge the duplicate `empdetails` / `emp-details` routes (old URLs redirect)
- [x] Add a GitHub Actions workflow that runs the build and tests
- [ ] Add route guards for pages that require login
- [ ] Add screenshots and a short demo GIF

## Author

**Mohammad Hussain Sindhi**: [GitHub](https://github.com/Hussain-sindhi) · [LinkedIn](https://www.linkedin.com/in/mohammad-hussain-sindhi-007b4b255/)
