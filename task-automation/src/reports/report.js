const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { format } = require('date-fns');

// Create /reports folder if it doesn't exist
const reportsFolderPath = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsFolderPath)) {
  fs.mkdirSync(reportsFolderPath);
}

// Function to generate an hourly summary report
function generateHourlyReport() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd_HH');
  const reportFileName = `report-${formattedDate}.txt`;
  const reportFilePath = path.join(reportsFolderPath, reportFileName);

  // Summary of the hour's activities
  const summary = `
    Hourly Summary Report
    Date and Hour: ${formattedDate}
    --------------------------
    Activities Summary:
    - Log files generated.
    - Notifications sent every 10 minutes.
    - Old log files cleaned every hour.

    Generated at: ${format(currentDate, 'yyyy-MM-dd HH:mm:ss')}
  `;

  // Write the summary to a report file
  fs.writeFileSync(reportFilePath, summary);
  console.log(`Hourly summary report generated: ${reportFileName}`);
}

// Schedule the job to run every hour
cron.schedule('0 * * * *', () => {
  console.log('Generating hourly summary report...');
  generateHourlyReport();
});
