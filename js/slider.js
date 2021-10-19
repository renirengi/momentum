export function initSlider() {
    window.addEventListener('load', () => loadPicture());
   }

function loadPicture(){
    const body = document.querySelector('body');
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    let bgNum;
    
    
    const date = new Date();
    const hours = date.getHours();
        
     const img=body.style.backgroundImage;

    function getTimeOfDay(hours) {
        let dayTime;
        if (hours >= 6 && hours < 12) {
          dayTime = "morning";
        }
        else if (hours >= 12 && hours < 18) {
          dayTime = "afternoon";
        }
        else if (hours >= 18) {
          dayTime = "evening";
        }
        else {
          dayTime = "night";
        }
        return dayTime;
      }

    function getRandomNum(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    bgNum=getRandomNum(1,20);

    function setBg(){
        let timeOfDay=getTimeOfDay(hours);
        const img= new Image();
        img.src=`https://raw.githubusercontent.com/renirengi/momentum/assets/${timeOfDay}/${bgNum}.jpg`
       
        img.onload=()=>{
            body.style.backgroundImage = `url('https://raw.githubusercontent.com/renirengi/momentum/assets/${timeOfDay}/${bgNum}.jpg')`;
        }
    }
    setBg();

    function getSlideNext(){
        if(bgNum<20){
            bgNum=bgNum+1;
            console.log (bgNum);  
        }
        else{
            bgNum=1;
        }
       setBg();
    }

    function getSlidePrev(){
         if(bgNum>1){
            bgNum=bgNum-1;
        }
        else{
            bgNum=20;
        }
       setBg();
    }
    
    

    slideNext.addEventListener('click', getSlideNext);
    slidePrev.addEventListener('click', getSlidePrev);
    
    }
    

