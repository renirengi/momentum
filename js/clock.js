import { SettingsService } from './settings.service.js';
import { TranslateService } from './translate.service.js';

export function initClockAndCalendar() {
 //window.addEventListener('load', () => initClock());
 const settings = SettingsService.getInstance();
  const translate = TranslateService.getInstance();
  const language = translate.getLocale();

  const time = document.querySelector('.time');
  const day = document.querySelector('.date');

  const greetingContainer = document.querySelector('.greeting-container')
  const greeting = document.querySelector('.greeting');

  const input = document.querySelector('.name');
  

input.addEventListener('change', () => {
    const name = input.value.trim();
    if (name.length > 0) {
      settings.name = name;
    }
  });

  function getName() {
    const name = settings.name;
    if (name) {
      input.value = name;
    }
  }

  getName();

  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
  }
  showTime();

  function showDate() {
    let currentDate;
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    if(language==="rus"){
      currentDate = date.toLocaleDateString('ru-Br', options);
    }
    else{
      currentDate = date.toLocaleDateString('eng-Br', options);
    }
    
    day.textContent = currentDate;
  }

  function showGreeting() {
    let greetingText;
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    if(language==='eng'){
      greetingText = `Good ${timeOfDay}`;
    }
    else{
      console.log(timeOfDay)
      if(timeOfDay=="morning"){
        greetingText="Доброе утро";
      }
      else if(timeOfDay=="afternoon"){
        greetingText="Добрый день";
      }
      else if(timeOfDay=="evening"){
        greetingText="Добрый вечер";
      }
      else{
        greetingText="Доброй ночи"
      }

    
    }
     
    greeting.textContent = greetingText;
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







}


function initClock() {
  const settings = SettingsService.getInstance();
  

  
  





}