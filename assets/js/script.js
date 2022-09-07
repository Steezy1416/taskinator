var taskForm = document.querySelector("#task-form");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");
var taskOnCounter = 0

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

    //gives the newlist a data attribute and sets it to the counter everytime a new list is created
    newList.setAttribute("data-task-on", taskOnCounter);
    
    var listInformation = document.createElement("div");
    listInformation.className = "task-info"
    listInformation.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.category + "</span>";

    newList.append(listInformation);

    //taskaction takes in the button container from the create buttons function
    var taskAction = createButtonActions(taskOnCounter);
    newList.append(taskAction);

    taskToDoContainer.append(newList);

    //increments the task on counter
    taskOnCounter++;
}

var createButtonActions = function(taskOnCounter) {

    //creates div element that will contain all the buttons
    var buttonContainer = document.createElement("div");
    buttonContainer.className = "task-actions"

    //creates edit button
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "btn edit-btn";
    editButton.setAttribute("data-task-on", taskOnCounter);

    buttonContainer.append(editButton);

    //creates delete button
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "btn delete-btn";
    deleteButton.setAttribute("data-task-on", taskOnCounter);

    buttonContainer.append(deleteButton);

    //creates the select status dropdown
    var taskStatusSelect = document.createElement("select");
    taskStatusSelect.className = "select-status";
    taskStatusSelect.setAttribute("name", "status-change")
    taskStatusSelect.setAttribute("data-task-on", taskOnCounter)

    //creates a loop that will create options for the select and will give its text based on the arrays incrementation
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for(var i = 0; i < statusChoices.length; i++) {
        var taskStatusOption = document.createElement("option")
        taskStatusOption.innerText = statusChoices[i]
        taskStatusOption.setAttribute("value", statusChoices[i])

        taskStatusSelect.append(taskStatusOption);
    }
    
    buttonContainer.append(taskStatusSelect)

    //returns the completed button container
    return(buttonContainer);
};

taskForm.addEventListener("submit", addTaskHandler);