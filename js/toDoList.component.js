import { SettingsService } from './settings.service.js';
export class ToDoListComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.settings = SettingsService.getInstance();
  }
  connectedCallback() {
    const template = `
      <link href="./css/toDo.component.css" rel="stylesheet" type="text/css">
      <button class="show-modal"></button>
      <div class="modal todo-modal">
        <div class="modal-bodyList">
          <button class="close-btn close-todo"></button>
          <div class="head">
            <h2>My To-Do List</h2>
            <input class="task-title" type="text" placeholder="Title..."> <button class="add-task">Add</button>
          </div>
          <ul class="task-list"></ul>
        </div>
      </div>
    `;

    this.shadow.innerHTML = template;
    this.modalElement = this.shadow.querySelector('.todo-modal');
    this.taskListElement = this.shadow.querySelector('.task-list');

    this.#loadSettings();

    this.shadow.querySelector('.show-modal').addEventListener('click', () => this.#toggleModal());
    this.shadow.querySelector('.close-todo').addEventListener('click', () => this.#toggleModal());
    this.shadow.querySelector('.add-task').addEventListener('click', () => {
      const tasks = this.settings.toDoList;
      const title = this.shadow.querySelector('.task-title').value.trim();

      if (title) {
        const taskExists = this.settings.toDoList.find((task) => task.title === title);

        if (!taskExists) {
          tasks.push({title});
          this.settings.toDoList = tasks;
          this.#addTaskElement(title);
        } else {
          console.error('Task is already added');
        }
      }
    });
  }

  #toggleModal() {
    this.modalElement.classList.toggle('displayed');
  }

  #loadSettings() {
    const tasks = this.settings.toDoList;

    tasks.forEach((task) => this.#addTaskElement(task.title, task.done));
  }

  #addTaskElement(title, done = false) {
    const liElement = document.createElement('li');

    liElement.textContent = title;

    if (done) {
      liElement.classList.add('done');
    }

    liElement.addEventListener('click', (e) => this.#toggleTaskDone(e))

    this.taskListElement.appendChild(liElement);
  }

  #toggleTaskDone(e) {
    const tasks = this.settings.toDoList;
    const taskTitle = e.target.textContent;
    const task = tasks.find((task) => task.title === taskTitle);

    if (task) {
      task.done = !task.done;
      this.settings.toDoList = tasks;

      if (task.done) {
        e.target.classList.add('done');
      } else {
        e.target.classList.remove('done');
      }
    }
  }
}
