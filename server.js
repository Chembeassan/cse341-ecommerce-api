const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const swaggerConfig = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

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

// Swagger documentation
swaggerConfig(app);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`🛒 E-commerce API running on port ${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api-docs`);
  }
});