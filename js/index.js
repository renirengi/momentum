import { initClockAndCalendar } from './clock.js';
import { initSlider } from './slider.js';
import { initWeather } from './weather.js';
import { initQuote } from './quote.js';
import { AudioPlayerComponent } from './audio-player.component.js';
import { initToDoList } from './toDoList.js';


initClockAndCalendar();
initSlider();
initWeather();
initQuote();
initToDoList();


window.customElements.define('audio-player', AudioPlayerComponent);
