document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const newTaskInput = document.getElementById("new-task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoColumn = document.getElementById("todo");
  const inProgressColumn = document.getElementById("in-progress");
  const doneColumn = document.getElementById("done");

  // Add new task
  addTaskBtn.addEventListener("click", addNewTask);
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addNewTask();
  });

  // Initialize drag-and-drop
  initDragAndDrop();

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
    
    // Add remove functionality
    task.querySelector(".remove-btn").addEventListener("click", () => {
      task.remove();
    });
    
    return task;
  }

  function initDragAndDrop() {
    let draggedItem = null;

    // Add event listeners to all task elements
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

    // Column event listeners
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
          // For Done column: Remove the remove button
          if (column.id === "done") {
            draggedItem.querySelector(".remove-btn").style.display = "none";
          } else {
            draggedItem.querySelector(".remove-btn").style.display = "block";
          }
          
          column.querySelector(".tasks").appendChild(draggedItem);
        }
      });
    });
  }
});
