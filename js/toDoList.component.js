export class ToDoListComponent extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      
    }
    connectedCallback() {
        const template = `
          <link href="./css/toDo.component.css" rel="stylesheet" type="text/css">
          <button class="show-modalList"></button>
          <div class="modalList">
            <div class="modal-bodyList">
                <button class="close-btn"></button>
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

      
    }
}