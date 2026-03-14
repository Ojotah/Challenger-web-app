# Challenger Web App

A full-stack challenge tracking application built with **Laravel 11**, **Inertia.js**, **React**, and **Tailwind CSS**.

This project allows authenticated users to manage:
- **Categories** (grouping challenges)
- **Challenges** (with status, difficulty, deadlines, and assignees)
- **Users** (for assignment and ownership)
- **Profile settings**

---

## Tech Stack

### Backend
- PHP 8.2+
- Laravel 11
- Laravel Sanctum
- MySQL 8

### Frontend
- React 18
- Inertia.js (`@inertiajs/react`)
- Vite 5
- Tailwind CSS

### Tooling
- Pest (testing)
- Laravel Pint (code style)
- Laravel Sail (Docker-based local development)

---

## Features

- Authentication (register, login, password reset, email verification)
- Dashboard overview
- Category CRUD
- Challenge CRUD
  - Status tracking (`pending`, `in_progress`, `completed`)
  - Difficulty levels (`low`, `medium`, `high`)
  - Assignment to users
  - Optional deadline and image
- User CRUD
- Profile management

---

## Project Structure

```text
app/                    # Laravel application code (models, controllers, requests, resources)
resources/js/           # Inertia React frontend
resources/js/Pages/     # Feature pages (Dashboard, Category, Challenge, User, Auth, Profile)
routes/                 # Web/auth/console route definitions
database/migrations/    # Database schema
database/seeders/       # Seed data
```

---

## Requirements

Choose one development approach:

### Option A: Local PHP/MySQL setup
- PHP 8.2+
- Composer
- Node.js 18+ and npm
- MySQL 8+

### Option B: Docker with Laravel Sail
- Docker + Docker Compose

---

## Quick Start (Local)

```bash
git clone <your-repository-url>
cd Challenger-web-app
cp .env.example .env
composer install
npm install
php artisan key:generate
```

Set your `.env` database values, then run:

```bash
php artisan migrate --seed
php artisan storage:link
```

Run the app in two terminals:

```bash
php artisan serve
npm run dev
```

Open: [http://localhost:8000](http://localhost:8000)

---

## Quick Start (Laravel Sail / Docker)

```bash
cp .env.example .env
composer install
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

App URL is based on `APP_PORT` in `.env` (defaults to `http://localhost`).

---

## Default Seed Users

When running `php artisan migrate --seed`, sample users are created:

- `challenger1@example.com` / `1234`
- `challengerw@example.com` / `1234`

> Change these credentials for non-local environments.

---

## Useful Commands

```bash
# Run tests
php artisan test

# Code style check/fix
./vendor/bin/pint

# Build frontend assets for production
npm run build
```

---

## Environment Variables

Common `.env` variables to review:

- `APP_NAME`, `APP_URL`, `APP_ENV`
- `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`
- `VITE_APP_NAME`

If you're using Sail, also check:
- `APP_PORT`
- `FORWARD_DB_PORT`
- `VITE_PORT`

---

## Troubleshooting

- **Vite assets not loading**: ensure `npm run dev` is running.
- **Database connection errors**: verify `.env` DB values and DB service availability.
- **Storage/image issues**: run `php artisan storage:link`.
- **Missing Composer dependencies**: run `composer install`.

---

## License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
