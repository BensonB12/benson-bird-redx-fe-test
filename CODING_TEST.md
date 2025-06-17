# RedX Frontend Coding Test

## Overview
This is a React Router v7 application with TypeScript, PostgreSQL, and intentionally poor implementation. The app demonstrates basic full-stack development but has various issues. **Your job is to improve it.**

## Tech Stack
- **React Router v7** with Server-Side Rendering (SSR)
- **TypeScript**
- **PostgreSQL** database with 150 sample users
- **Prisma** ORM for database operations
- **Docker** for database containerization

## Current State

### ✅ What Works
- Fetches user data from `/api/users` endpoint
- Real-time client-side search (name and email)
- Displays all users in a div-based layout
- Basic loading and error states

### ❌ Areas for Improvement
The application has intentional issues across code quality, user experience, performance, and architecture.

## Getting Started

### Prerequisites
- Node.js 18+
- Docker
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start PostgreSQL database
npm run docker:up

# Run database migrations  
npm run db:migrate

# Seed database with 150 fake users
npm run db:seed

# Start development server
npm run dev

# Open http://localhost:5173
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Reseed database
- `npm run docker:up/down` - Manage PostgreSQL container

## API Documentation

### GET `/api/users`
Returns all users for client-side filtering.

**Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": "clxxxxx",
      "name": "John Doe", 
      "email": "john.doe@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalCount": 150,
  "message": "All users returned"
}
```

## Your Mission

Improve this application using modern development best practices. Consider:

- **TypeScript best practices**
- **React performance and patterns**
- **User experience and interface design**
- **Accessibility and responsive design**
- **Scalability for larger datasets**
- **Performance optimization**
- **Code organization and maintainability**

## Deliverables

- **Improved Application**: Your enhanced version of the codebase
- **DECISIONS.md**: Document your choices, reasoning, and future considerations

## Evaluation

We're interested in your approach to:
- Code quality and TypeScript usage
- UI/UX design decisions
- Performance considerations (think that we may have tens of thousands of users in the user table, and we may have hundreds of thousands of users querying that table)
- System architecture thinking
- Communication of technical decisions
- Network and security best practices.

---

**Time Limit**: 60-90 minutes. Focus on demonstrating your skills and judgment. Document what you'd do with more time on an MD file. 