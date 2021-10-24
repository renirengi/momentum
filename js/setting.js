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

   function getLocalStorage() {
       console.log(localStorage.getItem('language'));
        /*loaderLang = localStorage.getItem('language');
        if (loaderLang) {
          language.value = loaderLang;
        }
        console.log(loaderLang);*/
      }
      getLocalStorage();
}
    
