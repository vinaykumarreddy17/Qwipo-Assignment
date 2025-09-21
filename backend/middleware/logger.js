const fs = require('fs');
const path = require('path');

const logsDir = path.resolve(__dirname, '../../logs');
const logFile = path.join(logsDir, 'server.log');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = (req, res, next) => {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  fs.appendFile(logFile, logEntry, err => {
    if (err) console.error('Failed to write log:', err);
  });
  next();
};

module.exports = logger;