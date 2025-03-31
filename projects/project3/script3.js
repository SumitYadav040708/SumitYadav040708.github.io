document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const newTaskInput = document.getElementById("new-task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoColumn = document.getElementById("todo");

  // Add new task
  addTaskBtn.addEventListener("click", addNewTask);
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addNewTask();
  });

  // Initialize drag-and-drop
  initDragAndDrop();

  // Add event delegation for remove buttons
  document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-btn")) {
        // Only allow removal from To Do and Done columns
        if (column.id === "in-progress") return;
        e.target.closest(".task").remove();
      }
    });
  });

  function addNewTask() {
    const taskText = newTaskInput.value.trim();
    if (!taskText) return;

    const taskElement = createTaskElement(taskText);
    todoColumn.querySelector(".tasks").appendChild(taskElement);
    newTaskInput.value = "";
  }

  function createTaskElement(text) {
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    
    task.innerHTML = `
      <span>${text}</span>
      <button class="remove-btn">×</button>
    `;
    
    return task;
  }

  function initDragAndDrop() {
    let draggedItem = null;

    document.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("task")) {
        draggedItem = e.target;
        e.target.classList.add("dragging");
      }
    });

    document.addEventListener("dragend", (e) => {
      if (e.target.classList.contains("task")) {
        e.target.classList.remove("dragging");
      }
    });

    document.querySelectorAll(".column").forEach(column => {
      column.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("highlight");
      });

      column.addEventListener("dragleave", () => {
        column.classList.remove("highlight");
      });

      column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("highlight");
        
        if (draggedItem) {
          // Remove from previous column
          draggedItem.remove();
          
          // Clone the task to preserve event listeners
          const newTask = draggedItem.cloneNode(true);
          newTask.querySelector(".remove-btn").style.display = 
            column.id === "in-progress" ? "none" : "block";
            
          column.querySelector(".tasks").appendChild(newTask);
        }
      });
    });
  }
});
