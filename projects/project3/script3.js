document.addEventListener("DOMContentLoaded", () => {
  let draggedItem = null;

  // Initialize all task and column elements
  const tasks = document.querySelectorAll(".task");
  const columns = document.querySelectorAll(".column");

  // Add event listeners to tasks
  tasks.forEach(task => {
    task.addEventListener("dragstart", handleDragStart);
    task.addEventListener("dragend", handleDragEnd);
  });

  // Add event listeners to columns
  columns.forEach(column => {
    column.addEventListener("dragover", handleDragOver);
    column.addEventListener("dragenter", handleDragEnter);
    column.addEventListener("dragleave", handleDragLeave);
    column.addEventListener("drop", handleDrop);
  });

  // Event handlers
  function handleDragStart(e) {
    draggedItem = this;
    this.classList.add("dragging");
    e.dataTransfer.setData("text/plain", this.textContent);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragEnd() {
    this.classList.remove("dragging");
    columns.forEach(col => col.classList.remove("highlight"));
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add("highlight");
  }

  function handleDragLeave() {
    this.classList.remove("highlight");
  }

  function handleDrop(e) {
    e.preventDefault();
    this.classList.remove("highlight");

    // Don't do anything if dropping on same column
    if (draggedItem.parentElement === this) return;

    // Create a new task element
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.draggable = true;
    newTask.textContent = draggedItem.textContent;
    
    // Add event listeners to the new task
    newTask.addEventListener("dragstart", handleDragStart);
    newTask.addEventListener("dragend", handleDragEnd);
    
    // Append to the new column
    this.appendChild(newTask);
    
    // Remove the original task
    draggedItem.remove();
  }
});
