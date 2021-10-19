export function initSlider() {
    window.addEventListener('load', () => loadPicture());
   }

function loadPicture(){
    const body = document.querySelector('body');
    body.style.backgroundImage ="url('https://raw.githubusercontent.com/renirengi/momentum/assets/images/evening/18.jpg')";
    
    //console.log(body);

}