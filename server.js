const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize data file if it doesn't exist
async function initializeDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch (error) {
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

// Helper functions
async function readTodos() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeTodos(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2));
}

function validateTodo(todo) {
  const errors = [];
  
  if (!todo.title || typeof todo.title !== 'string' || todo.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }
  
  if (todo.completed !== undefined && typeof todo.completed !== 'boolean') {
    errors.push('Completed must be a boolean value');
  }
  
  return errors;
}

// Routes

// GET /todos - Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodos();
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve todos'
    });
  }
});

// POST /todos - Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    
    const todoData = { title, description, completed };
    const validationErrors = validateTodo(todoData);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    const todos = await readTodos();
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    await writeTodos(todos);
    
    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create todo'
    });
  }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const todos = await readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    
    const validationErrors = validateTodo({ ...todos[todoIndex], ...updateData });
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }
    
    todos[todoIndex] = {
      ...todos[todoIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    if (todos[todoIndex].title) {
      todos[todoIndex].title = todos[todoIndex].title.trim();
    }
    if (todos[todoIndex].description) {
      todos[todoIndex].description = todos[todoIndex].description.trim();
    }
    
    await writeTodos(todos);
    
    res.json({
      success: true,
      data: todos[todoIndex],
      message: 'Todo updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update todo'
    });
  }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const todos = await readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    await writeTodos(todos);
    
    res.json({
      success: true,
      data: deletedTodo,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete todo'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
async function startServer() {
  try {
    await initializeDataFile();
    app.listen(PORT, () => {
      console.log(`🚀 Todo API server running on port ${PORT}`);
      console.log(`📝 API endpoints:`);
      console.log(`   GET    /todos     - Get all todos`);
      console.log(`   POST   /todos     - Create a todo`);
      console.log(`   PUT    /todos/:id - Update a todo`);
      console.log(`   DELETE /todos/:id - Delete a todo`);
      console.log(`   GET    /health    - Health check`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();