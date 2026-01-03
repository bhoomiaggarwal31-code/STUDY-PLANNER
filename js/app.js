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

    const hideCompletedToggle = document.getElementById("hideCompletedToggle");
    let hideCompleted = JSON.parse(localStorage.getItem("hideCompleted")) || false;
    if (hideCompletedToggle) {
    hideCompletedToggle.checked = hideCompleted;

    hideCompletedToggle.addEventListener("change", () => {
        hideCompleted = hideCompletedToggle.checked;
        localStorage.setItem("hideCompleted", JSON.stringify(hideCompleted));
        renderTasks();
    });
}






    // ❗ If task section doesn't exist, STOP safely
    if (!taskInput || !addTaskBtn || !taskList) {
        console.warn("Task elements not found, skipping task logic.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((taskObj, index) => {
        if (hideCompleted && taskObj.done) return;
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

/* ---------- DAILY SCHEDULE ---------- */
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const subjectInput = document.getElementById("subjectInput");
const addScheduleBtn = document.getElementById("addScheduleBtn");
const scheduleList = document.getElementById("scheduleList");

let schedule = JSON.parse(localStorage.getItem("schedule")) || [];

function renderSchedule() {
    scheduleList.innerHTML = "";

    schedule.forEach((item) => {
        const row = document.createElement("tr");

        const startTd = document.createElement("td");
        startTd.textContent = item.start;

        const endTd = document.createElement("td");
        endTd.textContent = item.end;

        const subjectTd = document.createElement("td");
        subjectTd.textContent = item.subject;

        row.appendChild(startTd);
        row.appendChild(endTd);
        row.appendChild(subjectTd);

        scheduleList.appendChild(row);
    });
}


