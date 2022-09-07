var taskForm = document.querySelector("#task-form");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");

var addTask = function(event) {

    event.preventDefault();

    var newList = document.createElement("li");
    newList.className = "task-item";
    newList.innerText = "This is a new task!";
    taskToDoContainer.append(newList);

};

taskForm.addEventListener("submit", addTask);