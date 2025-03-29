
document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.querySelectorAll(".task");
  const columns = document.querySelectorAll(".column");

  tasks.forEach(task => {
    task.addEventListener("dragstart", dragStart);
  });

  columns.forEach(column => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("drop", drop);
  });

  function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.textContent);
    e.target.classList.add("dragging");
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const taskText = e.dataTransfer.getData("text/plain");
    const newTask = document.createElement("div");
    newTask.className = "task";
    newTask.draggable = true;
    newTask.textContent = taskText;
    newTask.addEventListener("dragstart", dragStart);
    e.target.appendChild(newTask);
    
    // Remove the original task if it exists in another column
    const draggingTask = document.querySelector(".dragging");
    if (draggingTask) draggingTask.remove();
  }
});
