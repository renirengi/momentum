import { initClockAndCalendar } from './clock.js';
import { initSlider } from './slider.js';
import { initWeather } from './weather.js';
import { initQuote } from './quote.js';
import { AudioPlayerComponent } from './audio-player.component.js';

initClockAndCalendar();
initSlider();
initWeather();
initQuote();


window.customElements.define('audio-player', AudioPlayerComponent);
