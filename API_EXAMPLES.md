# API Testing Examples

This file contains example requests for testing the Todo CRUD API.

## Base URL
- Local: `http://localhost:3000`
- Production: `https://your-deployed-app.com`

## 1. Health Check
```bash
curl -X GET http://localhost:3000/health
```

## 2. Get All Todos (Empty initially)
```bash
curl -X GET http://localhost:3000/todos
```

## 3. Create First Todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js fundamentals course",
    "completed": false
  }'
```

## 4. Create Second Todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build REST API",
    "description": "Create a todo API with Express.js"
  }'
```

## 5. Get All Todos (Should show 2 todos)
```bash
curl -X GET http://localhost:3000/todos
```

## 6. Update Todo (Mark as completed)
Replace `{id}` with actual todo ID from previous responses:
```bash
curl -X PUT http://localhost:3000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "title": "Learn Node.js - COMPLETED"
  }'
```

## 7. Delete Todo
Replace `{id}` with actual todo ID:
```bash
curl -X DELETE http://localhost:3000/todos/{id}
```

## 8. Test Validation (Should fail)
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "",
    "completed": "not-a-boolean"
  }'
```

## 9. Test 404 (Should fail)
```bash
curl -X GET http://localhost:3000/todos/nonexistent-id
```

## Postman Collection

You can also import these requests into Postman:

1. Create a new collection called "Todo API"
2. Add requests for each endpoint above
3. Set the base URL as an environment variable
4. Test all endpoints

## Expected Response Formats

### Success Response
```json
{
  "success": true,
  "data": { /* todo object or array */ },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error details"]
}
```