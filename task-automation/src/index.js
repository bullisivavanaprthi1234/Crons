const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

// Job Imports
const { cleanUpOldLogs } = require('./jobs/cleanLogs');
const { generateReport } = require('./jobs/generateReports');
const { simulateNotification } = require('./jobs/sendNotifications');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// In-memory task storage (can be replaced by a database later)
let tasks = [];

// Schedule configuration
const configPath = path.join(__dirname, 'scheduleConfig.json');
let jobs = {};

// Function to load and schedule jobs dynamically
function loadAndScheduleJobs() {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  // Stop all existing jobs
  Object.values(jobs).forEach((job) => job.stop());
  jobs = {};

  // Schedule new jobs
  jobs.cleanLogs = cron.schedule(config.cleanLogs, cleanUpOldLogs);
  jobs.generateReports = cron.schedule(config.generateReports, generateReport);
  jobs.sendNotifications = cron.schedule(
    config.sendNotifications,
    simulateNotification
  );

  console.log('Jobs scheduled with updated configurations.');
}

// Watch for changes in the scheduleConfig.json file
fs.watchFile(configPath, () => {
  console.log('Detected changes in scheduleConfig.json, reloading jobs...');
  loadAndScheduleJobs();
});

// Initial load of jobs
loadAndScheduleJobs();

// REST API Endpoints
// GET /tasks: Fetch all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks: Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, status, dueDate } = req.body;

  // Validation (you can expand this later)
  if (!title || !description || !status || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newTask = {
    id: tasks.length + 1, // Auto-generated ID
    title,
    description,
    status,
    dueDate: new Date(dueDate).toISOString(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id: Update an existing task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update fields if provided in the request body
  const { title, description, status, dueDate } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;
  if (dueDate) task.dueDate = new Date(dueDate).toISOString();

  res.json(task);
});

// DELETE /tasks/:id: Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
