export function initToDoList() {
    window.addEventListener('load', () => loadToDoList());
   }

function loadToDoList(){
    const myNodelist = document.getElementsByTagName("li");
    const addBtn=document.querySelector('.addBtn'); 
    const close = document.getElementsByClassName("close");
    const list = document.querySelector('ul');


    addBtn.addEventListener('click', ()=> newElement());

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
      
    
    list.addEventListener('click', function(ev) {
       
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);
    
    
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