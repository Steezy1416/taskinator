var addTaskButton = document.querySelector("#add-task-btn");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");

var addTask = function() {
    var newList = document.createElement("li");
    newList.className = "task-item";
    newList.innerText = "This is a new task!";
    taskToDoContainer.append(newList);
};

addTaskButton.addEventListener("click", addTask);