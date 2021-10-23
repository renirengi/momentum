
export function initClockAndCalendar() {
 window.addEventListener('load', () => initClock());
}


function initClock() {
  const time = document.querySelector('.time');
  const day = document.querySelector('.date');

  const greetingContainer = document.querySelector('.greeting-container')
  const greeting = document.querySelector('.greeting');

  const input = document.querySelector('.name');

  /*const greetingTranslation={
    ru:`Good ${timeOfDay}`,
    eng: `Добрый ${timeOfDay}`
  }*/

  input.addEventListener('change', () => {
    const name = input.value.trim();
    if (name.length > 0) {
      localStorage.setItem('input', name);
    }
  });

  function getLocalStorage() {
    const name = localStorage.getItem('input');
    if (name) {
      input.value = name;
    }
  }
  getLocalStorage();

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
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-Br', options);
    day.textContent = currentDate;
  }

  function showGreeting() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
  }

  function getTimeOfDay(hours) {
    let dayTime;
    if (hours >= 6 && hours < 12) {
      dayTime = "morning";
    }
    else if (hours >= 12 && hours < 18) {
      dayTime = "day";
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