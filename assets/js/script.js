var taskForm = document.querySelector("#task-form");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");

var addTaskHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskCategoryInput = document.querySelector("select[name='task-category']").value;

    var taskDataObj = {
        name: taskNameInput,
        category: taskCategoryInput
    };

    createNewList(taskDataObj)

};

var createNewList = function(taskDataObj) {

    var newList = document.createElement("li");
    newList.className = "task-item";
    
    var listInformation = document.createElement("div");
    listInformation.className = "task-info"
    listInformation.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.category + "</span>";

    newList.append(listInformation);

    taskToDoContainer.append(newList);
}

taskForm.addEventListener("submit", addTaskHandler);