export function initSlider() {
    window.addEventListener('load', () => loadPicture());
   }

function loadPicture(){
    const body = document.querySelector('body');
    const slideNext = document.querySelector('.slide-next');
    const slidePrev = document.querySelector('.slide-prev');
    let bgNum;
   let url;

    
    
    const date = new Date();
    const hours = date.getHours();
        
     const img=body.style.backgroundImage;

  async function getLinkToImage() {
      url = changeLinkToImage();
      
      const res = await fetch(url);
      const data = await res.json();
      return data.urls.regular;
    }
    getLinkToImage()

    function changeLinkToImage(){
      let temp=getTimeOfDay(hours);
      if (temp=="morning"){
         url='https://api.unsplash.com/photos/random?orientation=landscape&query=hamster&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac'
       }
       else if(temp=="afternoon"){
        url='https://api.unsplash.com/photos/random?orientation=landscape&query=panda&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac'
      }
      else if(temp=="evening"){
        url='https://api.unsplash.com/photos/random?orientation=landscape&query=racoon&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac'
      }
      else if(temp=="night"){
        url='https://api.unsplash.com/photos/random?orientation=landscape&query=cat&client_id=AOhct6K9USP53doPu4OXdx0tViHn0WS7EOo3WQT62Ac'
      }
     return url;

    }
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

    /*function getRandomNum(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    bgNum=getRandomNum(1,20);*/

    function setBg(){
        //let timeOfDay=getTimeOfDay(hours);
        //const img= new Image();
        //img.src=`https://raw.githubusercontent.com/renirengi/momentum/assets/${timeOfDay}/${bgNum}.jpg`
       
        img.onload=()=>{
            body.style.backgroundImage = getLinkToImage();
        }
    }
    setBg();

    /*function getSlideNext(){
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
    slidePrev.addEventListener('click', getSlidePrev);*/
    
    }
    

