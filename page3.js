function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return; // Don't add empty tasks
    }

    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        ${taskText}
        <button onclick="removeTask(this)">Remove</button>
    `;

    taskList.appendChild(newTask);
    taskInput.value = '';
}

function removeTask(button) {
    const taskList = document.getElementById('task-list');
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);
}
// Updated function to add a task to the appropriate column and store it in local storage
function addTask() {
    const taskInput = document.getElementById('task');
    const taskDateInput = document.getElementById('task-date');
    const taskTimeInput = document.getElementById('task-time');
    const taskCategorySelect = document.getElementById('task-category');
    const selectedCategory = taskCategorySelect.value;

    const taskText = taskInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;

    if (taskText === '' || taskDate === '' || taskTime === '') {
        alert('Please fill in all fields.');
        return;
    }

    const taskList = document.getElementById(`${selectedCategory}-tasks`).querySelector('ul');
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="checkbox" onchange="toggleCompletion(this.parentElement)">
        <span class="task-text">${taskText}</span> (Date: ${taskDate}, Time: ${taskTime})
        <button onclick="editTask(this.parentElement)">Edit</button>
        <button onclick="removeTask(this)">Remove</button>
    `;

    taskList.appendChild(newTask);
    taskInput.value = '';
    taskDateInput.value = '';
    taskTimeInput.value = '';

    // Save the task in local storage
    saveTask(selectedCategory, taskText, taskDate, taskTime);
}

// Updated function to load and display tasks from local storage
function loadTasks() {
    const categories = ['vacation', 'study'];

    categories.forEach(category => {
        const taskList = document.getElementById(`${category}-tasks`).querySelector('ul');
        taskList.innerHTML = '';

        const tasks = JSON.parse(localStorage.getItem(category)) || [];

        tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <input type="checkbox" onchange="toggleCompletion(this.parentElement)">
                <span class="task-text">${task.text}</span> (Date: ${task.date}, Time: ${task.time})
                <button onclick="editTask(this.parentElement)">Edit</button>
                <button onclick="removeTask(this)">Remove</button>
            `;
            taskList.appendChild(newTask);
        });
    });
}

// Load tasks from local storage on page load
window.onload = function () {
    loadTasks();
};

