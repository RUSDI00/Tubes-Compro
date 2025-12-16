const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./src/config/db');
const swaggerSpecs = require('./src/config/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS Configuration - Localhost only
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/menu', require('./src/routes/menuRoutes'));
app.use('/api/interests', require('./src/routes/interestsRoutes'));
app.use('/api/courses', require('./src/routes/courseRoutes'));
app.use('/api/simulation', require('./src/routes/simulationRoutes'));

// Default route
app.get('/', (req, res) => {
  res.send('API Mahasiswa Backend is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
});
