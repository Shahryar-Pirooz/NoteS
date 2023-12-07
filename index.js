import { existsSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, "data.json");

let tasks = [];

const loadData = () => {
  if (existsSync(dataPath)) {
    const data = readFileSync(dataPath, "utf-8");
    tasks = JSON.parse(data);
  } else {
    writeFileSync(dataPath, "[]");
  }
};

const saveData = () => {
  const newData = JSON.stringify(tasks);
  writeFileSync(dataPath, newData);
};

const addTask = (id, args) => {
  tasks.push({ id, ...args });
  saveData();
  console.log(
    `Task added:\nID:\t${id}\nTitle:\t${args.title}\nContent:\t${args.content}`
  );
};

const deleteTask = (id) => {
  tasks = tasks.filter((item) => item.id !== id);
  saveData();
};

const updateTask = (id, args) => {
  const taskToUpdate = tasks.find((task) => task.id === id);

  if (taskToUpdate) {
    if (args.title) {
      taskToUpdate.title = args.title;
    }
    if (args.content) {
      taskToUpdate.content = args.content;
    }
    if (args.isDone !== undefined) {
      taskToUpdate.isDone = args.isDone;
    }

    saveData();
    console.log(`Task ${id} updated successfully.`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
};

const showTasks = (id) => {
  if (id && id !== 0) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      console.log(
        `${chalk.bold(task.title)}: ${
          task.isDone ? chalk.dim("completed") : chalk.dim("not completed")
        }`
      );
      console.log(chalk.bgBlack(task.content));
    } else {
      console.log(`Task with ID ${id} not found.`);
    }
  } else {
    console.log("---------------------------------------");
    console.log("| ID\t| Title\t| Content\t| Completed\t|");
    console.log("---------------------------------------");
    tasks.forEach((task) => {
      const truncatedTitle =
        task.title.length > 10 ? `${task.title.slice(0, 10)}...` : task.title;
      const truncatedContent =
        task.content.length > 10
          ? `${task.content.slice(0, 10)}...`
          : task.content;
      const status = task.isDone
        ? chalk.strikethrough("completed")
        : "not completed";
      console.log(
        `| ${task.id}\t| ${truncatedTitle}\t| ${truncatedContent}\t| ${status}\t|`
      );
      console.log("---------------------------------------");
    });
  }
};

const y = yargs(hideBin(process.argv));

y.version("0.1.0");

const title = chalk.bold.red;
const content = chalk.bgBlack;
const dim = chalk.dim;
const done = chalk.strikethrough;

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
    const id = tasks.length + 1;
    addTask(id, { title, content });
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
    deleteTask(id);
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
    updateTask(id, { title, content, isDone });
  }
);

y.command(
  "list",
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
    showTasks(id);
  }
);

y.command(
  "$0",
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
    showTasks(id);
  }
);

loadData();
y.parse();
