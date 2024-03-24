const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'info.log' }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});

module.exports = logger;
