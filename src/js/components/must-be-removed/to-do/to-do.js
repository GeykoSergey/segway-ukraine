// "use strict";

const doneSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
    </svg>
`;

const pinnedSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
<path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282z"/>
</svg>
`;

const delSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
<path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z"/>
<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
</svg>
`;

const editSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
`;

// import {
//     getTasksLocalStorage,
//     setTasksLocalStorage,
//     generateUniqueId,
//     initSortableList,
//     updateListTasks
// } from "./utils.js";

const form = document.querySelector(".form");
const textareaForm = document.querySelector(".form__textarea");
const buttonSendForm = document.querySelector(".form__send-btn");
const buttonCancel = document.querySelector(".form__cancel-btn");
const output = document.querySelector(".output");
let editId = null;
let isEditTask = false;

console.log("Hello World!!!");
console.log(form);

updateListTasks();

// *************************************************************
// utils
// *************************************************************

function getTaskLocalStorage() {
  const tasksJSON = localStorage.getItem("tasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function setTaskLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateUniqueId() {
  const timestump = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  const randomPartTwo = Math.floor(Math.random() * 10000);
  return timestump + randomPart + randomPartTwo;
}

function updateListTasks() {
  document.querySelector(".output").textContent = "";
  const arrayTaskLS = getTaskLocalStorage();
  renderTasks(arrayTaskLS);
}

function renderTasks(tasks) {
  if (!tasks || !tasks.length) return;

  tasks
    .sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      return a.position - b.position;
    })
    .forEach((value, i) => {
      const { id, task, pinned, done } = value;
      const item = `
            <div class="task ${done ? "done" : ""} ${
        pinned ? "pinned" : ""
      } "data-task-id="${id}" draggable="true">
                <p class="task__text">${task}</p>
                <span class="task__index ${done ? "none" : ""}">${i + 1}</span>
                <div class="task__btns">
                    <button class="task__done ${
                      done ? "active" : ""
                    }">${doneSvg}</button>
                    <button class="task__pinned ${
                      pinned ? "active" : ""
                    }">${pinnedSvg}</button>
                    <button class="task__edit">${editSvg}</button>
                    <button class="task__del">${delSvg}</button>
                </div>
            </div>
            `;
      document.querySelector(".output").insertAdjacentHTML("beforeend", item);
    });

  // activationDrag();
}
// *************************************************************
// utils
// *************************************************************

// Listeners
if (form) {
  form.addEventListener("submit", sendTask);
}

if (output) {
  output.addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task__btns");
    if (!taskElement) return;

    if (event.target.closest(".task__pinned")) {
      pinnedTask(event);
    } else if (event.target.closest(".task__edit")) {
      editTask(event);
    } else if (event.target.closest(".task__del")) {
      delTask(event);
    } else if (event.target.closest(".task__done")) {
      doneTask(event);
    }
  });
}

// Function
function sendTask(event) {
  event.preventDefault();

  const task = textareaForm.value.trim().replace(/\s/g, " ");
  if (!task) {
    return alert("Поле не должно быть пустым!!!");
  }

  const arrayTaskLS = getTaskLocalStorage();
  arrayTaskLS.push({
    id: generateUniqueId(),
    task: task,
    done: false,
    pinned: false,
    position: 1000,
  });

  setTaskLocalStorage(arrayTaskLS);
  updateListTasks();
  form.reset();
}

function doneTask(event) {
  const task = event.target.closest(".task");
  const id = Number(task.dataset.taskId);

  const arrayTaskLS = getTaskLocalStorage();
  const index = arrayTaskLS.findindex((task) => {
    task.id === id;
  });

  if (index === -1) {
    return alert("Задача не найдена!");
  }
}
