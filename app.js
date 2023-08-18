const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const contactRoutes = require('./routes/contactRoute');
const applicationRoutes = require('./routes/applicationRoute');
const { addBaseURL } = require('./middleware/custom');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(addBaseURL)
app.use(express.static('public'));

// Routes
app.use('/api/send-feedback', contactRoutes);
app.use('/api/applications', applicationRoutes);

// Handle 404 routes
app.use((req, res, next) => {
    const error = new Error('Api Route not found');
    error.status = 404;
    next(error);
});

// Centralized Error Handling
app.use(errorHandler);

module.exports = app;
