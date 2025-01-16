const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { subDays } = require('date-fns');

// Create /logs folder if it doesn't exist
const logFolderPath = path.join(__dirname, 'logs');
if (!fs.existsSync(logFolderPath)) {
  fs.mkdirSync(logFolderPath);
}

// Function to generate a log file with random content
function generateLogFile() {
  const logFileName = path.join(logFolderPath, 'log.txt');
  const randomContent = `Log entry at ${new Date().toISOString()} - Random content.\n`;
  
  // Append the content to the log.txt file
  fs.appendFileSync(logFileName, randomContent);
  console.log('Generated log.txt with random content');
}

// Function to clean up old log files (older than 1 day)
function cleanOldLogFiles() {
  const files = fs.readdirSync(logFolderPath);
  const oneDayAgo = subDays(new Date(), 1);  // Get the date 1 day ago

  // Loop through each file in the logs folder
  files.forEach(file => {
    const filePath = path.join(logFolderPath, file);
    const stats = fs.statSync(filePath);
    const fileAge = stats.mtime;

    // If the file is older than 1 day, delete it
    if (fileAge < oneDayAgo) {
      fs.unlinkSync(filePath);
      console.log(`Deleted old log file: ${file}`);
    }
  });
}

// Schedule the cleanup job to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Running cleanup job...');
  cleanOldLogFiles();
});

// Generate log file every minute
setInterval(generateLogFile, 60000);  // Generate log file every minute
