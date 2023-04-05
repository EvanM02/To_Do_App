/* this function gets the task from input */
function get_todos() {
  /* this creates an array of  task that are inputted */
  var todos = new Array();
  /* this pulls the task that was saved in the web browser memory */
  var todos_str = localStorage.getItem("todo");
  /* if the input is not null then JSON.parse will communicate with the web browser to make the task a JavaScript object */
  if (todos_str !== null) {
    todos = JSON.parse(todos_str);
  }
  return todos;
}
/* This function adds the inputted task to the todos array */
function add() {
  /* this takes the inputted task and creates a variable of it */
  var task = document.getElementById("task").value;

  /* Sanitize user input to prevent XSS attacks */
  task = DOMPurify.sanitize(task);

  // Check if the input field is empty
  if (task.trim() === "") {
    // create a new Audio object and set the source of the sound file
    var audio = new Audio("/Audio/error_sound.wav");
    // play the sound effect
    audio.play();
    // Add animation to the error message
    var newTask = document.querySelector("li:last-child");
    newTask.classList.add("animation", "add-animation");

    // Show a message to the user that the user needs to input something in the input field
    var messagetwo = document.createElement("div");
    messagetwo.textContent = "Please input a task !";
    messagetwo.classList.add("messagetwo");
    document.body.appendChild(messagetwo);

    // Remove the message after 1 seconds
    setTimeout(function () {
      messagetwo.parentNode.removeChild(messagetwo);
    }, 1000);

    // Reload the page after 2 seconds
    setTimeout(function () {
      window.location.reload();
    }, 1200);

    return;
  }
  var todos = get_todos();
  /* this adds a new task the end of the array*/
  todos.push(task);
  /*this converts the task input to a JSON string */
  localStorage.setItem("todo", JSON.stringify(todos));
  document.getElementById("task").value = "";
  show();

  // Add animation to the new task
  var newTask = document.querySelector("li:last-child");
  newTask.classList.add("animation", "add-animation");

  // Show a message to the user that the task was added
  var message = document.createElement("div");
  message.textContent = "Task added successfully";
  message.classList.add("message");
  document.body.appendChild(message);

  // create a new Audio object and set the source of the sound file
  var audio = new Audio("/Audio/add_sound.wav");
  // play the sound effect
  audio.play();

  // Remove the message after 2 seconds
  setTimeout(function () {
    message.parentNode.removeChild(message);
  }, 2000);

  // Reload the page after 2 seconds
  setTimeout(function () {
    window.location.reload();
  }, 2200);
}

/* this function keeps the tasks permanently displayed on the screen*/
function show() {
  /* this sets the task that was retrieved as ta variable */
  var todos = get_todos();

  /* this sets up each task as unordered list*/
  var html = "<ul>";
  /* this displays a task to the list in the order that it is inputted */
  for (var i = 0; i < todos.length; i++) {
    /* this also displays the tasks as a list and creates the button with a "x" */
    html +=
      "<li>" +
      '<button class="remove" id="' +
      i +
      '"> x </button> ' +
      todos[i] +
      "</li>";
  }
  html += "</ul>";
  /* this displays the task as a list */
  document.getElementById("todos").innerHTML = html;
}

/* This checks to see if user has clicked enter when typing in the input field if true, it runs the add() function */
task.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    add();
  }
});

/* this displays the inputted task when the "add item" button is clicked*/
document.getElementById("add").addEventListener("click", add);
/* this will keep the inputs displayed permanently on the screen*/
show();

/* this will remove items in the array when you click on the x */
function remove() {
  var id = this.getAttribute("id");
  var todos = get_todos();
  todos.splice(id, 1);
  localStorage.setItem("todo", JSON.stringify(todos));

  // Update the UI to remove the task
  show();

  // Add animation to the removed task
  var removedTask = document.querySelector(
    "li:nth-child(" + (parseInt(id) + 1) + ")"
  );

  // Add animation to the removed task
  removedTask.classList.add("animation", "remove-animation");

  // Show a message to the user that the task was removed
  var message = document.createElement("div");
  message.textContent = "Task removed successfully";
  message.classList.add("message");
  document.body.appendChild(message);

  // create a new Audio object and set the source of the sound file
  var audio = new Audio("/Audio/remove_sound.wav");
  // play the sound effect
  audio.play();

  // Remove the message after 2 seconds
  setTimeout(function () {
    message.parentNode.removeChild(message);
  }, 2000);

  // Reload the page after 2 seconds
  setTimeout(function () {
    window.location.reload();
  }, 2200);
}
/* this tells the browser how to display the todo array after an item as been removed */
var buttons = document.getElementsByClassName("remove");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", remove);
}
