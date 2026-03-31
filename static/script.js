async function fetchTasks() {
  const response = await fetch("/tasks");
  const tasks = await response.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-buttons">
        <button class="complete-btn" onclick="toggleTask(${index})">
          ${task.done ? "Undo" : "Done"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (!task) return;

  await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });

  input.value = "";
  fetchTasks();
}

async function toggleTask(index) {
  await fetch(`/tasks/${index}`, { method: "PUT" });
  fetchTasks();
}

async function deleteTask(index) {
  await fetch(`/tasks/${index}`, { method: "DELETE" });
  fetchTasks();
}

window.onload = fetchTasks;