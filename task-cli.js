const fs =  require("fs");

const fileName = "tasks.json"


function readTask() {
    if(!fs.existsSync(fileName)){
        fs.writeFileSync(fileName, "[]");
    }

    const data = fs.readFileSync(fileName, "utf-8");
    
    return JSON.parse(data);

}

function saveTask(tasks) {
    fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    const tasks = readTask();

    const waktuSekarang = new Date().toISOString();

    if (!description) {
        console.log("Error: task description is required");
        return;
    }

    const newTask = {
        id: tasks.length + 1,
        description: description,
        status: "todo",
        createdAt: waktuSekarang,
        updatedAt: waktuSekarang,
    };

    tasks.push(newTask);

    saveTask(tasks);

    console.log("Task added successfully (ID: " + newTask.id + ")");
}


function listTask() {
    const tasks = readTask();

    if (tasks.length === 0) {
        console.log("No tasks found");
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
    }
}

function updateTask(id, newDescription) {
    const tasks = readTask();
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === Number(id)) {
            tasks[i].description = newDescription;
            tasks[i].updatedAt = new Date().toISOString();

            saveTask(tasks);
            console.log("Task updated successfully");
            return;
        }
    }
    console.log("Task not found");
    
}

function deleteTask(id) {
    const tasks = readTask();

    let newTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== Number(id)) {
            newTasks.push(tasks[i]);
        }
    }
    
    saveTask(newTasks);

    console.log("Task deleted successfully");
}

function markTask(id, status) {
    const tasks = readTask();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === Number(id)) {
            tasks[i].status = status;
            tasks[i].updatedAt = new Date().toISOString();
            
            saveTask(tasks);
            console.log("Task status updated to:", status);
            return;
        }
    }
    console.log("Task not found");
}

const command = process.argv[2];
const input1 = process.argv[3];
const input2 = process.argv[4];

if (command === "add") {
    addTask(input1);
} else if (command === "list") {
    listTask();
} else if (command === "update") {
    updateTask(input1, input2);
} else if (command === "delete") {
    deleteTask(input1);
} else if (command === "mark-in-progress") {
    markTask(input1, "in-progress");
} else if (command === "mark-done") {
    markTask(input1, "done");
} else {
   console.log("Unknown command");
   console.log('Example: node task-cli.js add "Learn Node.js"');
}