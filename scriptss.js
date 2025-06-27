function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const timestamp = new Date().toLocaleString();
  const task = createTaskElement(taskText, timestamp, false);
  document.getElementById("pendingList").appendChild(task);

  input.value = "";
}

function createTaskElement(text, time, completed) {
  const li = document.createElement("li");
  li.className = "task-item";

  const span = document.createElement("span");
  span.textContent = text;

  const timeDiv = document.createElement("div");
  timeDiv.className = "timestamp";
  timeDiv.textContent = completed
    ? `Completed: ${time}`
    : `Added: ${time}`;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️ Edit";
  editBtn.onclick = () => editTask(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️ Delete";
  deleteBtn.onclick = () => li.remove();

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = completed ? "↩️ Undo" : "✅ Complete";
  toggleBtn.onclick = () => {
    li.remove();
    const newTimestamp = new Date().toLocaleString();
    const newTask = createTaskElement(text, newTimestamp, !completed);
    if (completed) {
      document.getElementById("pendingList").appendChild(newTask);
    } else {
      document.getElementById("completedList").appendChild(newTask);
    }
  };

  actions.appendChild(editBtn);
  actions.appendChild(toggleBtn);
  actions.appendChild(deleteBtn);

  const taskContent = document.createElement("div");
  taskContent.appendChild(span);
  taskContent.appendChild(timeDiv);

  li.appendChild(taskContent);
  li.appendChild(actions);

  return li;
}

function editTask(span) {
  const newText = prompt("Edit task:", span.textContent);
  if (newText !== null && newText.trim() !== "") {
    span.textContent = newText.trim();
  }
}
