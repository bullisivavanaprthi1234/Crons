const fs = require('fs');
const path = require('path');
const { logError } = require('../utils/errorLogger');
const { isOlderThanDays } = require('../utils/dateUtils');

const logsFolderPath = path.join(__dirname, '../logs');

function cleanUpOldLogs() {
  try {
    const files = fs.readdirSync(logsFolderPath);

    files.forEach(file => {
      const filePath = path.join(logsFolderPath, file);
      if (isOlderThanDays(filePath, 1)) {
        fs.unlinkSync(filePath); // Delete the file
        console.log(`Deleted old log file: ${file}`);
      }
    });
  } catch (error) {
    logError(error, 'cleanUpOldLogs');
  }
}

module.exports = { cleanUpOldLogs };
