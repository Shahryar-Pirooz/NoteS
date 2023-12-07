import { existsSync, readFileSync, writeFileSync } from "fs"; // Importing necessary functions from the fs module
import { fileURLToPath } from "url"; // Importing the fileURLToPath function from the url module
import { dirname, join } from "path"; // Importing the dirname and join functions from the path module
import yargs from "yargs"; // Importing the yargs module
import { hideBin } from "yargs/helpers"; // Importing the hideBin function from the yargs/helpers module
import chalk from "chalk"; // Importing the chalk module for colorful console output

const __filename = fileURLToPath(import.meta.url); // Getting the current file's path
const __dirname = dirname(__filename); // Getting the current file's directory path
const dataPath = join(__dirname, "data.json"); // Creating the path to the data.json file

let tasks = []; // Initializing an empty array to store tasks

const loadData = () => {
  if (existsSync(dataPath)) {
    // Checking if the data.json file exists
    const data = readFileSync(dataPath, "utf-8"); // Reading the contents of the data.json file
    tasks = JSON.parse(data); // Parsing the JSON data and storing it in the tasks array
  } else {
    writeFileSync(dataPath, "[]"); // Creating an empty data.json file if it doesn't exist
  }
};

const saveData = () => {
  const newData = JSON.stringify(tasks); // Converting the tasks array to JSON string
  writeFileSync(dataPath, newData); // Writing the JSON data to the data.json file
};

const addTask = (id, args) => {
  tasks.push({ id, ...args }); // Adding a new task object to the tasks array
  saveData(); // Saving the updated tasks array to the data.json file
  console.log(
    `Task added:\nID:\t${id}\nTitle:\t${args.title}\nContent:\t${args.content}`
  ); // Logging the details of the added task to the console
};

const deleteTask = (id) => {
  tasks = tasks.filter((item) => item.id !== id); // Removing the task with the specified ID from the tasks array
  saveData(); // Saving the updated tasks array to the data.json file
};

const updateTask = (id, args) => {
  const taskToUpdate = tasks.find((task) => task.id === id); // Finding the task with the specified ID in the tasks array

  if (taskToUpdate) {
    if (args.title) {
      taskToUpdate.title = args.title; // Updating the title of the task if a new title is provided
    }
    if (args.content) {
      taskToUpdate.content = args.content; // Updating the content of the task if new content is provided
    }
    if (args.isDone !== undefined) {
      taskToUpdate.isDone = args.isDone; // Updating the completion status of the task if a new status is provided
    }

    saveData(); // Saving the updated tasks array to the data.json file
    console.log(`Task ${id} updated successfully.`); // Logging a success message to the console
  } else {
    console.log(`Task with ID ${id} not found.`); // Logging an error message to the console if the task is not found
  }
};

const showTasks = (id) => {
  if (id && id !== 0) {
    const task = tasks.find((task) => task.id === id); // Finding the task with the specified ID in the tasks array
    if (task) {
      console.log(
        `${chalk.bold(task.title)}: ${
          task.isDone ? chalk.dim("completed") : chalk.dim("not completed")
        }`
      ); // Logging the title and completion status of the task to the console
      console.log(chalk.bgBlack(task.content)); // Logging the content of the task to the console with a black background
    } else {
      console.log(`Task with ID ${id} not found.`); // Logging an error message to the console if the task is not found
    }
  } else {
    console.log("---------------------------------------");
    console.log("| ID\t| Title\t| Content\t| Completed\t|");
    console.log("---------------------------------------");
    tasks.forEach((task) => {
      const truncatedTitle =
        task.title.length > 10 ? `${task.title.slice(0, 10)}...` : task.title; // Truncating the title if it exceeds 10 characters
      const truncatedContent =
        task.content.length > 10
          ? `${task.content.slice(0, 10)}...`
          : task.content; // Truncating the content if it exceeds 10 characters
      const status = task.isDone
        ? chalk.strikethrough("completed")
        : "not completed"; // Formatting the completion status of the task
      console.log(
        `| ${task.id}\t| ${truncatedTitle}\t| ${truncatedContent}\t| ${status}\t|`
      ); // Logging the ID, truncated title, truncated content, and completion status of the task to the console
      console.log("---------------------------------------");
    });
  }
};

const y = yargs(hideBin(process.argv)); // Creating a new yargs instance

y.version("0.1.0"); // Setting the version of the CLI tool

const title = chalk.bold.red; // Creating a chalk style for bold red text
const content = chalk.bgBlack; // Creating a chalk style for black background text
const dim = chalk.dim; // Creating a chalk style for dim text
const done = chalk.strikethrough; // Creating a chalk style for strikethrough text

y.command(
  "add",
  "Add a new task",
  {
    title: {
      alias: "t",
      demandOption: true,
      type: "string",
      describe: "Add title (Required)",
    },
    content: {
      alias: "c",
      default: "Add a content for your task",
      type: "string",
    },
  },
  ({ title, content }) => {
    const id = tasks.length + 1; // Generating a new ID for the task
    addTask(id, { title, content }); // Adding the task with the provided title and content
  }
);

y.command(
  "delete",
  "Remove a task by ID",
  {
    id: {
      demandOption: true,
      type: "number",
      describe: "The ID of the task to remove (Required)",
    },
  },
  ({ id }) => {
    deleteTask(id); // Deleting the task with the specified ID
  }
);

y.command(
  "update",
  "Update a task by ID",
  {
    id: {
      demandOption: true,
      type: "number",
      describe: "The ID of the task to update (Required)",
    },
    title: {
      alias: "t",
      type: "string",
      describe: "New title for the task",
    },
    content: {
      alias: "c",
      type: "string",
      describe: "New content for the task",
    },
    isDone: {
      alias: "d",
      type: "boolean",
      describe: "Set task completion status (true/false)",
    },
  },
  ({ id, title, content, isDone }) => {
    updateTask(id, { title, content, isDone }); // Updating the task with the specified ID and provided details
  }
);

y.command(
  ["$0", "list"],
  "Print all tasks or a specific task by ID",
  {
    id: {
      alias: "i",
      default: 0,
      describe: "Find and print a task by ID",
      type: "number",
    },
  },
  ({ id }) => {
    showTasks(id); // Showing the tasks with the specified ID or all tasks if no ID is provided
  }
);

loadData(); // Loading the tasks data from the data.json file
y.parse(); // Parsing the command line arguments and executing the corresponding command
