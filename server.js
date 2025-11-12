const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerConfig = require('./swagger');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 8080;

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Basic middleware
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/products', require('./routes/products'))
  .use('/orders', require('./routes/orders'));

// Try to load auth routes if they exist
try {
  app.use('/auth', require('./routes/auth'));
  console.log('🔐 Auth routes loaded');
} catch (error) {
  console.log('⚠️  Auth routes not available:', error.message);
}

// Swagger documentation
swaggerConfig(app);

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'E-commerce API',
    endpoints: {
      products: '/products',
      orders: '/orders', 
      documentation: '/api-docs'
    }
  });
});

// Simple authentication check
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Authentication required',
    authenticated: false
  });
};

// Protected route example
app.get('/protected', isAuthenticated, (req, res) => {
  res.json({
    message: 'This is a protected route',
    authenticated: true
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`🛒 E-commerce API running on port ${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
  }
});