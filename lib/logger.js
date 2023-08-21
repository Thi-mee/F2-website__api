const winston = require("winston");

// Configure logger
const logger = winston.createLogger({
  level: "error", // Set the minimum log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to the log entries
    winston.format.json() // Use JSON format for logs
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Colorize console output
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }), // Log errors to the console
  ],
});


module.exports = logger;
