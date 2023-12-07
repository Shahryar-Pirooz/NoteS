# NoteS

## Simple Task Management CLI Application

This is a command-line interface (CLI) application built with Node.js that allows users to manage tasks.

Features
Add Task: Add a new task with a title and optional content.
Delete Task: Remove a task by its ID.
Update Task: Update the title, content, or completion status of a task.
Show Tasks: Display all tasks or a specific task by its ID.
Installation
Clone the repository or download the ZIP file.
Install the required dependencies using npm install.
Usage
To add a new task:

csharp
Copy code
node index.js add --title "Your Title" --content "Task Content"
To delete a task by ID:

sql
Copy code
node index.js delete --id 1
To update a task by ID:

css
Copy code
node index.js update --id 1 --title "New Title" --content "New Content" --isDone true
To show all tasks or a specific task by ID:

bash
Copy code
node index.js list --id 1
Commands
add: Add a new task.
delete: Remove a task by its ID.
update: Update a task by its ID.
list: Display all tasks or a specific task by its ID.
Contributing
Contributions are welcome! Please create a pull request with your suggested changes.

License
This project is licensed under the MIT License - see the LICENSE file for details.
