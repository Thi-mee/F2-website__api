const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
    level: 'error', // Set the minimum log level
    format: winston.format.json(), // Use JSON format for logs
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
        new winston.transports.Console(), // Log errors to the console
    ],
});

module.exports = logger;
