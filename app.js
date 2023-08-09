const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contactRoute');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/send-feedback', contactRoutes);

// Handle 404 routes
app.use((req, res, next) => {
    const error = new Error('Api Route not found');
    error.status = 404;
    next(error);
});

// Centralized Error Handling
app.use(errorHandler);

module.exports = app;
