const fs = require('fs');
const path = require('path');
const { format } = require('../utils/dateUtils');
const { logError } = require('../utils/errorLogger');

const reportsFolderPath = path.join(__dirname, '../reports');

// Function to generate a report
function generateReport() {
  try {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
    const reportFileName = `report-${timestamp}.txt`;
    const reportContent = `Report generated at ${timestamp}\nSummary of activities: ...`;
    const reportFilePath = path.join(reportsFolderPath, reportFileName);

    fs.writeFileSync(reportFilePath, reportContent);
    console.log(`Report generated: ${reportFileName}`);
  } catch (error) {
    logError(error, 'generateReport');
  }
}

module.exports = { generateReport };
