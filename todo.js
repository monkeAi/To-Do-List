const ul = document.querySelector("#main-done-ul")
const ol = document.querySelector("#main-ol");
const submitBtn = document.getElementById("main-button");
const submitInput = document.getElementById("main-input");
if (!window.localStorage.getItem("tasks")) {
    window.localStorage.setItem("tasks", JSON.stringify([]));
}
let tasks = JSON.parse(window.localStorage.getItem("tasks"));
renderTasks();
renderDoneTasks();

submitInput.addEventListener("keyup", function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        submitBtn.click();
    }
})

function clicked() {
  var inputValue = submitInput.value;
  var trimedInput = inputValue.trim();
  submitInput.value = null;
  
  if (trimedInput !== "") {
      tasks.push({name:inputValue, done:false});
      renderTasks();
  }
}
function renderDoneTasks() {
    ul.innerHTML = '';
    tasks.forEach((task, i) => {
        if (task.done){
            var listItem = document.createElement("li"); 
            var pItem = document.createElement('p');
            var pText = document.createTextNode(task.name);

            pItem.appendChild(pText);
            listItem.appendChild(pItem);

            ul.appendChild(listItem);
        }
    });
}

function renderTasks() {
  ol.innerHTML = '';
  saveTasks();
  tasks.forEach((task, i) => {
    if (!task.done) {
      var listItem = document.createElement("li");
      var pItem = document.createElement('p');
      var pText = document.createTextNode(task.name);
      var doneBtn = document.createElement("button");
      var btnText = document.createTextNode("Done");

      doneBtn.appendChild(btnText);
      doneBtn.setAttribute('onclick', 'itemDone('+ i +')');

      pItem.appendChild(pText);
      listItem.appendChild(pItem);
      listItem.appendChild(doneBtn);

      ol.appendChild(listItem);   
    }
  });
  renderDoneTasks();
}

function clearAll() {
    tasks = [];
    renderTasks(); 
}

function itemDone(index) {
    tasks[index].done = true;
    renderTasks();
}

function completeAll() {
    tasks.forEach(task => {
        task.done = true;
    });
    renderTasks();
}

function saveTasks() {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}
