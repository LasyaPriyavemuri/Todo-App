let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "active")
            return !task.completed;

        if (filter === "completed")
            return task.completed;

        return true;
    });

    filteredTasks.forEach((task, index) => {

        let li = document.createElement("li");

        if (task.completed)
            li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>

            <div>
                <button class="completeBtn">✓</button>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </div>
        `;

        li.querySelector(".completeBtn").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks(filter);
        };

        li.querySelector(".editBtn").onclick = () => {
            let newTask = prompt("Edit Task", task.text);

            if (newTask) {
                task.text = newTask;
                saveTasks();
                displayTasks(filter);
            }
        };

        li.querySelector(".deleteBtn").onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks(filter);
        };

        taskList.appendChild(li);
    });
}

addBtn.onclick = () => {

    let text = taskInput.value.trim();

    if (text === "")
        return;

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
};

document.querySelectorAll(".filter-btn").forEach(button => {

    button.onclick = () => {
        let filter = button.dataset.filter;
        displayTasks(filter);
    };

});

function updateCounter(){
    document.getElementById("taskCounter").innerHTML =
    `Total Tasks : ${tasks.length}`;
}

setInterval(()=>{
    document.getElementById("datetime").innerHTML =
    new Date().toLocaleString();
},1000);

updateCounter();

displayTasks();