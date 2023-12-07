# Simple Task Management CLI Application

This is a command-line interface (CLI) application built with Node.js that allows users to manage tasks.

## Features

- **Add Task**: Add a new task with a title and optional content.
- **Delete Task**: Remove a task by its ID.
- **Update Task**: Update the title, content, or completion status of a task.
- **Show Tasks**: Display all tasks or a specific task by its ID.

## Installation

1. Clone the repository or download the ZIP file.
2. Install the required dependencies using `npm install`.

## Usage

This CLI application allows you to manage tasks using the following commands:

### Add a Task

To add a new task, use the following command:

```bash
node index.js add --title "Your Title" [--content "Task Content"]
```

Replace **"Your Title"** with the title of the task and optionally include `--content` **"Task Content"** to add specific content.

### Delete a Task

To delete a task by its ID, use the following command:

```bash
node index.js delete --id [TaskID]
```
Replace **[TaskID]** with the ID of the task you want to remove.

### Update a Task

To update a task by its ID, you can modify its title, content, or completion status. Use the following command:

```bash
node index.js update --id [TaskID] [--title "New Title"] [--content "New Content"] [--isDone true/false]
```
Replace **[TaskID]** with the ID of the task you want to update. Include options like `--title`, `--content`, or `--isDone` followed by the new values to update the task properties.

### Show Tasks

To display all tasks or a specific task by its ID, use the following command:

```bash
node index.js list [--id [TaskID]]
```
Replace **[TaskID]** with the ID of the specific task you want to display. Omit **[TaskID]** to view all tasks.

## Contributing
Contributions are welcome! Please create a pull request with your suggested changes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

###### Text generated with the assistance of ChatGPT.


