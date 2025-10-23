# Simple To-Do CRUD API

A RESTful API for managing to-do items built with Node.js and Express.js. Features complete CRUD operations with JSON file storage and input validation.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete todos
- **JSON File Storage**: Persistent data storage without database setup
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Proper HTTP status codes and error messages
- **CORS Support**: Cross-origin resource sharing enabled
- **Security**: Helmet.js for basic security headers
- **Completed Status**: Boolean field to track todo completion

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a specific todo |
| DELETE | `/todos/:id` | Delete a specific todo |
| GET | `/health` | Health check endpoint |

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/1234-ad/simple-todo-crud-api.git
   cd simple-todo-crud-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Server will start on port 3000**
   ```
   🚀 Todo API server running on port 3000
   ```

## 📝 API Usage Examples

### Get All Todos
```bash
curl -X GET http://localhost:3000/todos
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1698067200000",
      "title": "Learn Node.js",
      "description": "Complete the Node.js tutorial",
      "completed": false,
      "createdAt": "2023-10-23T12:00:00.000Z",
      "updatedAt": "2023-10-23T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create a New Todo
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express.js",
    "description": "Build a REST API with Express",
    "completed": false
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1698067260000",
    "title": "Learn Express.js",
    "description": "Build a REST API with Express",
    "completed": false,
    "createdAt": "2023-10-23T12:01:00.000Z",
    "updatedAt": "2023-10-23T12:01:00.000Z"
  },
  "message": "Todo created successfully"
}
```

### Update a Todo
```bash
curl -X PUT http://localhost:3000/todos/1698067260000 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Master Express.js",
    "completed": true
  }'
```

### Delete a Todo
```bash
curl -X DELETE http://localhost:3000/todos/1698067260000
```

## 🔧 Data Structure

### Todo Object
```json
{
  "id": "string",           // Unique identifier (timestamp)
  "title": "string",        // Required: Todo title
  "description": "string",  // Optional: Todo description
  "completed": "boolean",   // Default: false
  "createdAt": "string",    // ISO timestamp
  "updatedAt": "string"     // ISO timestamp
}
```

## ✅ Input Validation

- **Title**: Required, non-empty string
- **Description**: Optional string
- **Completed**: Optional boolean (defaults to false)

## 🚀 Deployment

### Deploy to Render

1. **Connect your GitHub repository to Render**
2. **Set build command**: `npm install`
3. **Set start command**: `npm start`
4. **Deploy!**

### Deploy to Railway

1. **Connect your GitHub repository to Railway**
2. **Railway will auto-detect the Node.js app**
3. **Deploy automatically**

### Environment Variables

- `PORT`: Server port (default: 3000)

## 📁 Project Structure

```
simple-todo-crud-api/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── todos.json         # Data storage file (auto-created)
└── README.md          # This file
```

## 🧪 Testing the API

You can test the API using:
- **curl** (examples above)
- **Postman**
- **Thunder Client** (VS Code extension)
- **Any HTTP client**

## 🔒 Security Features

- **Helmet.js**: Basic security headers
- **CORS**: Cross-origin resource sharing
- **Input validation**: Prevents invalid data
- **Error handling**: Secure error responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Next Steps

- Add user authentication
- Implement database storage (MongoDB/PostgreSQL)
- Add unit tests
- Add API documentation with Swagger
- Implement pagination for large datasets
- Add search and filtering capabilities