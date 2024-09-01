// Selecting
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const tasksBody = document.querySelector("#tasksBody");

const alertTooltip = document.querySelector("#alertTooltip");

let tasks = [];

let editIndex = null;

// Functions

let getTaskData = function () {
  let task = {
    status: false,
    task: taskInput.value,
    id: new Date().getTime(),
  };

  tasks.unshift(task);
};

let removeEmptyImg = function () {
  if (tasks != []) {
    emptyImg.className = "hidden";
  } else {
    emptyImg.className = "";
  }
};

let showTask = function () {
  let date = new Date();
  let day = String(date.getDate());
  let month = String(date.getMonth() + 1);

  let content = "";

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status == false) {
      content += `<tr>
              <th>
                <i onclick="checked(${i})" class="fa-regular fa-square-check text-primary hover:text-text"></i>
              </th>
              <th>${tasks[i].task}</th>
              <th class="task-date flex justify-center"><span>${day}</span> / <span>${month}</span></th>
              <th><button><i onclick="deleteTask(${i})" class="fa-solid fa-trash-arrow-up text-primary hover:text-text"></i></button></th>
              <th><button><i onclick="editTask(${i})" class="fa-solid fa-file-pen text-primary hover:text-text"></i></button></th>
            </tr>`;
    } else {
      content += `<tr>
              <th><i onclick="checked(${i})" class="fa-solid fa-square-check d-none text-primary hover:text-text"></i>
              </th>
              <th class="line-through decoration-red-600">${tasks[i].task}</th>
              <th class="line-through decoration-red-600 flex justify-center"><span>${day}</span> / <span>${month}</span></th>
              <th><button><i onclick="deleteTask(${i})" class="fa-solid fa-trash-arrow-up text-primary hover:text-red-800"></i></button></th>
              <th><button><i onclick="editTask(${i})" class="fa-solid fa-file-pen text-primary hover:text-text"></i></button></th>
            </tr>`;
    }
  }

  tasksBody.innerHTML = content;
};

// Clear Input Field
let clearInput = function () {
  taskInput.value = "";
};

// Delete Task
let deleteTask = function (i) {
  tasks.splice(i, 1);
  showTask();
};

// Add Checked Task
let checked = function (i) {
  console.log(tasks[i].status);
  tasks[i].status = !tasks[i].status;
  showTask();
};

// edit task
let editTask = function (i) {
  taskInput.value = tasks[i].task;
  editIndex = i;
  addBtn.innerHTML =
    '<i class="fa-solid fa-check" style="color: #FFFFFF;"></i>';
  addBtn.className =
    "flex aspect-square h-full items-center justify-center rounded-xl bg-primary text-white hover:bg-text transition-all";
};

// update task
function updateTask(i) {
  tasks[i].task = taskInput.value;
}

// reset button after update or adding
let resetBtn = function () {
  addBtn.innerHTML = '<i class="fa-solid fa-plus" style="color: #FFFFFF;"></i>';
  addBtn.className =
    "flex aspect-square h-full items-center justify-center rounded-xl bg-primary text-white hover:bg-text hover:rotate-90 transition-all";
  editIndex = null;
};

addBtn.addEventListener("click", () => {
  if (taskInput.value != "") {
    alertTooltip.className = "hidden";
    if (editIndex === null) {
      getTaskData();
    } else {
      updateTask(editIndex);
      editIndex = null;
    }
    resetBtn();
    clearInput();
    showTask();
    removeEmptyImg();
  } else {
    alertTooltip.className = "block";
  }
});

showTask();
