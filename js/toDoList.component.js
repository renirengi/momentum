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
          <form name="settingsForm">
            <div id="myDiV" class="head">
                <h2>My To-Do List</h2>
                <input type="text" id="myInput" placeholder="Title...">
                <span  class="addBtn">Add</span>
            </div>
            <ul id="myUL">
            <li>Make the gym</li>
              <li class="checked">Pick up Cyrus from kindergarten </li>
              <li>Meet with Dad</li>
              <li>Make Momentum</li>
              <li>Call Anna</li>
            </ul>
          </form>
        </div>
      </div>
    `;

    this.shadow.innerHTML = template;
    this.modalElement = this.shadow.querySelector('.todo-modal');

    this.myNodelist = this.shadow.getElementsByTagName("li");
    this.addBtn=this.shadow.querySelector('.addBtn'); 
    this.close = this.shadow.getElementsByClassName("close");
    this.list = this.shadow.querySelector('ul');


    ///this.#loadToDoList();

    this.shadow.querySelector('.show-modal').addEventListener('click', () => this.#toggleModal());
    this.shadow.querySelector('.close-todo').addEventListener('click', () => this.#toggleModal());

    this.addBtn.addEventListener('click', ()=> newElement());
    this.list.addEventListener('click', function(ev) {
       
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);
  }

  /*#toggleModal() {
    this.modalElement.classList.toggle('checked');
  }*/
  
  for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
  

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
    
  function newElement() {
     li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      ///alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      
    }}
  }
}
