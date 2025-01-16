# Task Automation System with Node.js and Cron Jobs

## Overview
This project demonstrates a **Task Automation System** built using **Node.js** and **cron jobs**. It includes dynamic task scheduling, RESTful API integration, and file-based logging and reporting.

---

## Features
### 1. RESTful API for Task Management
- **GET /tasks**: Fetch all tasks.
- **POST /tasks**: Create a new task with the following fields:
  - `title` (string)
  - `description` (string)
  - `status` (Pending, In Progress, Completed)
  - `dueDate` (ISO date string)
- **PUT /tasks/:id**: Update an existing task.
- **DELETE /tasks/:id**: Delete a task by its ID.

### 2. Scheduled Jobs Using `node-cron`
- **Log Cleanup**:
  - Deletes log files older than 1 day from the `/logs` folder.
  - Runs every hour.
- **Generate Summary Reports**:
  - Creates hourly summary reports in the `/reports` folder.
- **Simulate Notifications**:
  - Logs simulated notifications (email/SMS) every 10 minutes in `/logs/notifications.log`.

### 3. Dynamic Scheduling
- Reads job schedules from `scheduleConfig.json` and allows updates without restarting the application.

### 4. Error Handling
- Logs errors in `/logs/errors.log` for debugging and monitoring.

---
## Folder Structure for "Tasks with Node.js and Cron Jobs"

tasks-node-cron/ ├── node_modules/ # Installed dependencies ├── src/ │ ├── controllers/ # Controller files for handling logic │ ├── models/ # Model files for task-related schemas │ ├── routes/ # API routes │ ├── services/ # Service layer for task automation │ └── cronJobs/ # Cron job scripts for task scheduling ├── .env # Environment variables ├── .gitignore # Ignored files for Git ├── app.js # Main app file ├── package.json # Project dependencies and scripts ├── package-lock.json # Exact version of dependencies └── README.md # Project documentation

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend application.
- **Express**: Framework for creating RESTful APIs and handling HTTP requests.
- **node-cron**: A library used to schedule and manage cron jobs for automating tasks.
- **date-fns**: A modern JavaScript date utility library used for date manipulation and formatting.
- **fs (File System)**: Native Node.js module for file operations such as reading, writing, and deleting files.
