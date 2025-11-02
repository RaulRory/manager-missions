# Space Mission

A RESTful API for managing space missions built with Node.js, Fastify, and SQLite. This project allows you to create, read, update, and delete space missions with comprehensive validation and testing.

This project demonstrates modern Node.js development practices with comprehensive testing, validation, and clean architecture patterns.

## 🏗️ Project Architecture

```
manager-missions/
├── src/
│   ├── app.js                 # Fastify app configuration
│   ├── controllers/
│   │   └── mission.js         # Mission route handlers
│   ├── database/
│   │   ├── config.js          # Database configuration and setup
│   │   └── mission.js         # Mission data access layer
│   ├── models/
│   │   └── mission.js         # Mission entity model
│   ├── routes/
│   │   └── mission.js         # Mission route definitions
│   └── validators/
│       └── mission.js         # Joi validation schemas
├── tests/
│   ├── fixtures/
│   │   └── mission-factorie.js # Test data factory
│   ├── integration/
│   │   ├── controllers/
│   │   │   └── missions.test.js # API endpoint tests
│   │   └── server.test.js      # Server health tests
│   └── unit/
│       ├── models/
│       │   └── mission.test.js # Mission model tests
│       └── validators/
│           └── mission.test.js # Validation tests
├── package.json
├── server.js                  # Application entry point
├── eslint.config.js          # ESLint configuration
└── readme.md
```

## 🛸 API Routes

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/missions` | Create a new mission | Mission object |
| `GET` | `/missions` | List all missions | - |
| `GET` | `/missions/:id` | Get mission by ID | - |
| `PUT` | `/missions/:id` | Update mission by ID | Partial mission object |
| `DELETE` | `/missions/:id` | Delete mission by ID | - |

### Mission Object Schema

```json
{
  "id": "string (UUID, auto-generated)",
  "name": "string (3-100 chars, required)",
  "crew": "string (2-200 chars, required)",
  "spacecraft": "string (2-100 chars, required)",
  "destination": "string (2-100 chars, required)",
  "status": "string (active|completed|failed, required)",
  "duration": "number (1-10000 days, required)"
}
```

### Example Requests

#### Create Mission
```bash
curl -X POST http://localhost:3000/missions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Apollo 11",
    "crew": "Neil Armstrong, Buzz Aldrin, Michael Collins",
    "spacecraft": "Apollo Command Module",
    "destination": "Moon",
    "status": "completed",
    "duration": 8
  }'
```

#### Update Mission (Partial)
```bash
curl -X PUT http://localhost:3000/missions/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed",
    "duration": 10
  }'
```

## 🧪 Running Tests

### Test Commands with npm

```bash
# Run all tests (unit + integration)
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests  
npm run test:integration

# Run tests with coverage report
npm run test:coverage
```

## 🚀 Getting Started

### Prerequisites
- Node.js 22.21.0 or higher
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd manager-missions

# Install dependencies
npm install

# Start development server
npm run start:dev
```

### Environment Setup

Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

## 📝 API Response Examples

### Success Response
```json
{
  "message": "Mission created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Apollo 11",
    "crew": "Neil Armstrong, Buzz Aldrin",
    "spacecraft": "Apollo Command Module",
    "destination": "Moon",
    "status": "completed",
    "duration": 8
  }
}
```

### Error Response
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Mission name must be at least 3 characters long",
      "value": "AB"
    }
  ]
}
```
