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

    const switchBtn = document.querySelectorAll('.switch-btn');
    let lang;
    let loaderName;
    
     for (let i=0; i<switchBtn.length; i++){
         switchBtn[i].addEventListener('click', () => changeSetting());
     }
  

    function changeSetting(){
        changeSettingLanguage();
        changeSettingBackGround();
       
    }

    function changeSettingLanguage(){
        eng.classList.toggle('switch-on');
        rus.classList.toggle('switch-on');
        getLanguage();
    }

    function changeSettingBackGround(){
        gitHub.classList.toggle('switch-on');
        unsplash.classList.toggle('switch-on');
        flickr.classList.toggle('switch-on');
        getBackGround();
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
    getLanguage();

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
    getBackGround();

   /*function getLocalStorage() {
        loaderLang = localStorage.getItem('language');
        /*if (loaderLang) {
          language.value = loaderLang;
        }
        console.log(loaderLang);
      }
      getLocalStorage();/*/
}
    
