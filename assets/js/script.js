var taskForm = document.querySelector("#task-form");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");

/*
When the task form button is clicked (button becase the event its listening for is submit which listents for buttons in the container or the enter key) the add task function is called.

Then the submit event is stored in "event" and event.preventdefault is there to make the form not refresh because that would be its default setting

Then it gets the input value from the input in html and stores the value in a variable
Then it gets the selected value from the select options and stores that value in a variable

After the variables are made an object is storing those values and a new function is called with the object inside it, (kinda like a trojan horse)


After all that in the function it creates new div to store all the dask data and its given a class name and inner html which calls the values inside the object and displays the task with all the information in the browser
*/ 

var addTaskHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskCategoryInput = document.querySelector("select[name='task-category']").value;

    //Checks if the inputs are empty and if so it will alert an error
    if(!taskNameInput || !taskCategoryInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    var taskDataObj = {
        name: taskNameInput,
        category: taskCategoryInput
    };

    //resets the form
    taskForm.reset();

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