const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click",() => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")){
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme","dark");
  }else{
    toggleBtn.tectContent = "🌙 Dark Mode";
    localStorage.setItem("theme","light");
  }
})


//remember the theme on reload
if (localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light Mode";
}  

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks on page load
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}

renderTasks();

// Add new task
addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
});
