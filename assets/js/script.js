var tasks = [];

var taskForm = document.querySelector("#task-form");
var taskToDoContainer = document.querySelector("#tasks-to-do-container");
var pageContent = document.querySelector("#page-content");
var tasksInProgress = document.querySelector("#tasks-in-progress");
var tasksCompleted = document.querySelector("#tasks-completed");
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

    var isEdit = taskForm.hasAttribute("data-task-on");
    
    if (isEdit) {
        var taskId = taskForm.getAttribute("data-task-on");
        completeEditTask(taskNameInput, taskCategoryInput, taskId)
    }

    else {
        var taskDataObj = {
            name: taskNameInput,
            category: taskCategoryInput,
            status: "to do"
        };
    
        createNewList(taskDataObj)
    }

    //resets the form
    taskForm.reset();

};

var createNewList = function(taskDataObj) {

    var newList = document.createElement("li");
    newList.className = "task-item";

    //gives the newlist a data attribute and sets it to the counter everytime a new list is created
    newList.setAttribute("data-task-on", taskOnCounter);
    
    var listInformation = document.createElement("div");
    listInformation.className = "task-info"
    listInformation.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-category'>" + taskDataObj.category + "</span>";

    newList.append(listInformation);

    //taskaction takes in the button container from the create buttons function
    var taskAction = createButtonActions(taskOnCounter);
    newList.append(taskAction);

    taskToDoContainer.append(newList);

    taskDataObj.id = taskOnCounter;
    tasks.push(taskDataObj)

    //increments the task on counter
    taskOnCounter++;

    console.log(taskDataObj)
    console.log(taskDataObj.status)
}

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-on='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-category").textContent = taskType;

    for(var i = 0; i <tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    alert("Task Updated!");

    taskForm.removeAttribute("data-task-on");
    document.querySelector("#save-task").innerText = "Add Task";

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

var taskButtonHandler = function(event) {
    var  eventTarget = event.target;
    console.log(eventTarget);

    if (event.target.matches(".edit-btn")) {
        var taskId = eventTarget.getAttribute("data-task-on");
        editTask(taskId);
    }
    else if(event.target.matches(".delete-btn")) {
        var taskId = eventTarget.getAttribute("data-task-on");
        deleteTask(taskId);
    }
    
};

var taskStatusChangeHandler = function(event) {
      // get the task item's id
  var taskId = event.target.getAttribute("data-task-on");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-on='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDo.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgress.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompleted.appendChild(taskSelected);
  }

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
    }
  }
  console.log(tasks);

}

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-on='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").innerText;

    var taskType = taskSelected.querySelector("span.task-category").innerText;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-category']").value = taskType;

    document.querySelector("#save-task").innerText = "Save task";
    taskForm.setAttribute("data-task-on", taskId)
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-on='" + taskId + "']");
    taskSelected.remove()

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
    }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
};


pageContent.addEventListener("click", taskButtonHandler);
pageContent.addEventListener("change", taskStatusChangeHandler);