const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { format } = require('date-fns');

// Path for the notifications log file
const logsFolderPath = path.join(__dirname, 'logs');
const notificationLogFilePath = path.join(logsFolderPath, 'notifications.log');

// Create /logs folder if it doesn't exist
if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath);
}

// Function to simulate sending notifications
function simulateNotification() {
  const currentDate = new Date();
  const formattedTimestamp = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

  // Randomly choose a notification type (Email or SMS)
  const notificationTypes = ['Email', 'SMS'];
  const notificationType =
    notificationTypes[Math.floor(Math.random() * notificationTypes.length)];

  // Simulated notification message
  const message = `[${formattedTimestamp}] Notification Sent: Type=${notificationType}`;
  console.log(message);

  // Log the notification details to notifications.log
  fs.appendFileSync(notificationLogFilePath, message + '\n');
}

// Schedule the job to run every 10 minutes
cron.schedule('*/10 * * * *', () => {
  console.log('Sending scheduled notification...');
  simulateNotification();
});
