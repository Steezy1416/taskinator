var taskForm = document.querySelector("#task-form");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");

var addTask = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskCategoryInput = document.querySelector("select[name='task-category']").value;

    var newList = document.createElement("li");
    newList.className = "task-item";
    
    var listInformation = document.createElement("div");
    listInformation.className = "task-info"
    listInformation.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskCategoryInput + "</span>";

    newList.append(listInformation);

    taskToDoContainer.append(newList);

};

taskForm.addEventListener("submit", addTask);