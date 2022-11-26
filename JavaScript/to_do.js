/* This function adds the inputted task to the get_todos function array */
function add() {
  /* this takes the inputted task and creates a variable of it */
  var task = document.getElementById ('task').value;

  var todos = get_todos();
  /* this adds a new task the end of the array*/
  todos.push(task);

  /*this converts the task input to a JSON string */
  localStorage.setItem("todo", JSON.stringify(todos));
  document.getElementById("task").value = "";
  show();
  window.location.reload();

  return false;

}


/* This checks to see if user has clicked enter when typing in the input field if true, it runs the add() function */
task.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    add(); get_todos();
  }
});


/* this function gets the task from input field */
function get_todos() {
  /* this creates an array of task that are inputted */
  var todos = new Array();
  /* this pulls the task that was saved in the web browser memory */
  var todos_str = localStorage.getItem("todo");
  /* if the input is not null then JSON.parse will communicate with the web browser to make the task a JavaScript object */
  if (todos_str !== "undefined") {
    todos = JSON.parse(todos_str);
  }
  return todos;
}



/* this function keeps the tasks permanently displayed on the screen*/
function show() {
  /* this sets the task that was retrieved as ta variable */
  var todos = get_todos();

  /* this sets up each task as unordered list*/
  var html = "<ul>";

  if ( todos !== null ) {
  /* this displays a task to the list in the order that it is inputted */
  for (var i = 0; i < todos.length; i++) {
  }

  /* this displays a task to the list in the order that it is inputted */
  for (var i = 0; i < todos.length; i++) {
    /* this also displays the tasks as a list and creates the button with a "x" */
    html +=
      "<li>" + '<button class="remove" ' + i + "> x </button> " + todos[i];
    ("</li>");
  }
  html += "</ul>";
  /* this displays the task as a list */
  document.getElementById("todos").innerHTML = html;
}
}


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
  window.location.reload();
}
/* this tells the browser how to display the todo array after an item as been removed */
var buttons = document.getElementsByClassName("remove");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", remove);
}
