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

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const span = document.createElement("span");
        span.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
