export function initSetting() {
    window.addEventListener('load', () => loadSetting());
   }

function loadSetting(){
    const language= document.querySelector(".language");
    const eng=language.querySelector('.eng');
    const rus = language.querySelector('.rus');

    const settingBgImg=document.querySelector(".settingBgImg");
    const gitHub=settingBgImg.querySelector(".gitHub");
    const unsplash=settingBgImg.querySelector(".unsplash");
    const flickr=settingBgImg.querySelector(".flickr");

    const weather=document.querySelector(".weather");
    const quoteContainer=document.querySelector(".quote-container");
    const quoteButton=document.querySelector(".change-quote");
    const audio=document.querySelector(".audio");
    const time=document.querySelector(".time");
    const date=document.querySelector(".date");
    const welcome=document.querySelector(".greeting-container");
    const list=document.querySelector(".myList");
    
    
    const switchBtn = document.querySelectorAll('.switch-btn');
    const closeBtn=document.querySelector(".close-btn");
    const setting=document.getElementById('setting');
   
    let lang;
    let loaderName;
    let hid={
        weather: false,
        quote: false,
        audio: false,
        clock: false,
        date: false,
        welcome: false,
        toDoList: false,
    }


    closeBtn.addEventListener('click', ()=>{
        getLanguage();
        getBackGround();
        let r = location.href;
        r = r.split("#")[0];
        location.replace(r);
    })

    setting.addEventListener('click',()=>{
        getLocalStorageLang();
        getLocalStorageBackground();
    })

    switchBtn[0].addEventListener('click', ()=>changeSettingLanguage());
    switchBtn[1].addEventListener('click', ()=>changeSettingLanguage());
    switchBtn[2].addEventListener('click',()=> {
       
       if( !gitHub.classList.contains('switch-on')){
        gitHub.classList.add('switch-on');
       }
        unsplash.classList.remove('switch-on');
        flickr.classList.remove('switch-on');
    }
    )
    switchBtn[3].addEventListener('click',()=> {
        gitHub.classList.remove('switch-on');
        if( !unsplash.classList.contains('switch-on')){
            unsplash.classList.add('switch-on');
           }
        flickr.classList.remove('switch-on');
    } )
    switchBtn[4].addEventListener('click',()=> {
        gitHub.classList.remove('switch-on');
        unsplash.classList.remove('switch-on');
        if( !flickr.classList.contains('switch-on')){
            flickr.classList.add('switch-on');
           }
    } )
    switchBtn[5].addEventListener('click',()=> {
        weather.classList.toggle('hiddenContent');
        switchBtn[5].classList.toggle('switch-on');
       
    } )
    switchBtn[6].addEventListener('click',()=> {
        quoteContainer.classList.toggle('hiddenContent');
        quoteButton.classList.toggle('hiddenContent');
        switchBtn[6].classList.toggle('switch-on');
    } )
    switchBtn[7].addEventListener('click',()=> {
        audio.classList.toggle('hiddenContent');
        switchBtn[7].classList.toggle('switch-on');
    } )
    switchBtn[8].addEventListener('click',()=> {
        time.classList.toggle('hiddenContent');
        switchBtn[8].classList.toggle('switch-on');
    } )
    switchBtn[9].addEventListener('click',()=> {
        date.classList.toggle('hiddenContent');
        switchBtn[9].classList.toggle('switch-on');
    } )
    switchBtn[10].addEventListener('click',()=> {
        welcome.classList.toggle('hiddenContent');
        switchBtn[10].classList.toggle('switch-on');
    } )
    switchBtn[11].addEventListener('click',()=> {
        list.classList.toggle('hiddenContent');
        switchBtn[11].classList.toggle('switch-on');
    } )
    

    
    function changeSettingLanguage(){
        eng.classList.toggle('switch-on');
        rus.classList.toggle('switch-on');
        getLanguage();
    }

     
    function getLanguage(){
    if(eng.classList.contains('switch-on')){
            lang="eng";
        }
        else{
            lang="rus";
        }
        const loaderLang=lang;
        localStorage.setItem('language', loaderLang);
        return loaderLang;
    }
    

    function getBackGround(){
        if(gitHub.classList.contains('switch-on')){
            loaderName="gitHub";
        }
        else if(unsplash.classList.contains('switch-on')){
            loaderName="unsplash";
        }
        else{
            loaderName="flickr";
        }
        localStorage.setItem('background', loaderName);
        return loaderName;
    }
    ;

   function getLocalStorageLang() {
       console.log(localStorage.getItem('language'));
       if(localStorage.getItem('language')=='eng'){
           if(!eng.classList.contains('switch-on')){
            rus.classList.remove('switch-on');
            eng.classList.add('switch-on');
           }
               
       }
       else if(localStorage.getItem('language')=='rus'){
        if(!rus.classList.contains('switch-on')){}
        rus.classList.add('switch-on');
        eng.classList.remove('switch-on');
       }
       
      }
      getLocalStorageLang();

      function getLocalStorageBackground() {
        console.log(localStorage.getItem('background'));
        if(localStorage.getItem('background')=='gitHub'){
            if(!gitHub.classList.contains('switch-on')){
             unsplash.classList.remove('switch-on');
             flickr.classList.remove('switch-on');
             gitHub.classList.add('switch-on');
            }
                
        }
        else if(localStorage.getItem('background')=='unsplash'){
         if(!unsplash.classList.contains('switch-on')){}
         gitHub.classList.remove('switch-on');
         flickr.classList.remove('switch-on');
         unsplash.classList.add('switch-on');
        }

        else if(localStorage.getItem('background')=='flickr'){
            if(!flickr.classList.contains('switch-on')){}
            gitHub.classList.remove('switch-on');
            unsplash.classList.remove('switch-on');
            flickr.classList.add('switch-on');
           }
        
       }
       getLocalStorageBackground();
}
    
