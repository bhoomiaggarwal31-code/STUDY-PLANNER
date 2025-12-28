document.addEventListener("DOMContentLoaded", () => {

    /* ---------- DARK MODE ---------- */
    const toggleBtn = document.getElementById("themeToggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                toggleBtn.textContent = "☀️ Light Mode";
                localStorage.setItem("theme", "dark");
            } else {
                toggleBtn.textContent = "🌙 Dark Mode";
                localStorage.setItem("theme", "light");
            }
        });

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
            toggleBtn.textContent = "☀️ Light Mode";
        }
    }

    /* ---------- TASKS ---------- */
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // ❗ If task section doesn't exist, STOP safely
    if (!taskInput || !addTaskBtn || !taskList) {
        console.warn("Task elements not found, skipping task logic.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((taskObj, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
        if (taskObj.done) li.classList.add("done");

        const span = document.createElement("span");
        span.textContent = taskObj.text;

        // Toggle done
        span.addEventListener("click", () => {
            taskObj.done = !taskObj.done;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

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

    addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        done: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
});

});
