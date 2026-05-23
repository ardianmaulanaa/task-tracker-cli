const fs =  require("fs");

const fileName = "tasks.json"


function readTask(tasks) {
    if(!fs.existsSync(fileName)){
        fs.writeFileSync(fileName, "[]");
    }

    const data = fs.readFileSync(fileName, "utf-8");
    
    return JSON.parse(data);

    const task = readTasks();
    console.log(tasks);
}

function addTask(description) {

}

function listTask() {

}

function updateTask(id, newDescriiption) {

}

function deleteTask(id) {

}

function markTask(id, status) {

}