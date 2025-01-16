const fs = require('fs');
const path = require('path');
const { format } = require('../utils/dateUtils');
const { logError } = require('../utils/errorLogger');

const logsFolderPath = path.join(__dirname, '../logs');
const notificationLogFilePath = path.join(logsFolderPath, 'notifications.log');

// Function to simulate sending notifications
function simulateNotification() {
  try {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const notificationTypes = ['Email', 'SMS'];
    const notificationType =
      notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const message = `[${timestamp}] Notification Sent: Type=${notificationType}`;

    // Append to the notifications log file
    fs.appendFileSync(notificationLogFilePath, message + '\n');
    console.log(message);
  } catch (error) {
    logError(error, 'simulateNotification');
  }
}

module.exports = { simulateNotification };
