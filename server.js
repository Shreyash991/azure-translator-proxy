require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const translateRoutes = require('./src/routes/translate');
const app = express();

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/translate', translateRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});

