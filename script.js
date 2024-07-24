// variable declarations
let greeting = document.querySelector('.greeting');
let form = document.querySelector('.form');
let taskInput = document.querySelector('.task');
let descriptionInput = document.querySelector('.description');
let deleteBtn = document.querySelectorAll('.delete');
let all_tasks_div = document.querySelector('.all_tasks_div');
let inputValues = {}
let allTasks = localStorage.getItem('allTasks');

if (allTasks === null || undefined) {
    localStorage.setItem('allTasks', JSON.stringify([]));
};

let tasks = JSON.parse(allTasks) || [];
console.log(tasks);

// greeting
const currentHour = new Date().getHours();
if (currentHour < 12) {
    greeting.textContent = 'Good Morning';
} else if (currentHour < 18) {
    greeting.textContent = 'Good Afternoon';
} else {
    greeting.textContent = 'Good Evening';
}

// Add Task to DOM
tasks.map((task) => {
    let taskDiv = document.createElement('div');
    let updateForm = document.createElement('form');
    let updateInput = document.createElement('input');
    taskDiv.innerHTML = `
        <div class="m-2 bg-gray-900 rounded-lg p-2 border-l-8 border-green-400 text-gray-300">
            <h2 class="text-2xl text-green-500 font-bold">${task.task}</h2>
            <p>${task.description}</p>
            <div class="grid grid-cols-2 items-center">
                <img 
                    onclick="handleDelete(${task.task_id})" 
                    class="delete w-6 cursor-pointer" src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt="Delete Icon">
                <img 
                    onclick="handleUpdate(${task.task_id})" 
                    class="update w-6 cursor-pointer" src="https://cdn-icons-png.flaticon.com/128/1160/1160758.png" alt="Update Icon">
            </div>
        </div>
    `;

    all_tasks_div.appendChild(taskDiv);
});

// User Input Handler
function handleInputChange(e) {
    inputValues = {...inputValues, [e.target.name]: e.target.value, task_id: tasks.length + 1};
}

// handleUpdate
function handleUpdate(task_id){
    const task = tasks.find((task) => task.task_id === task_id);
    task.task = inputValues.task;
    task.description = inputValues.description;
    localStorage.setItem('allTasks', JSON.stringify(tasks));

    window.location.reload();

}

// handleDelete
function handleDelete(task_id) {
    tasks = tasks.filter((task) => task.task_id !== task_id);
    localStorage.setItem('allTasks', JSON.stringify(tasks));

    window.location.reload();
}

// Clear All Tasks
function clearAllTasks() {
    tasks = [];
    localStorage.setItem('allTasks', JSON.stringify(tasks));
}

// Form Handler
function handleSubmit(e){
    // e.preventDefault();
    // e.target.reset();
    tasks.unshift(inputValues);

    localStorage.setItem('allTasks', JSON.stringify(tasks));
};

taskInput.addEventListener('change', handleInputChange);
descriptionInput.addEventListener('change', handleInputChange);
form.addEventListener('submit', handleSubmit);