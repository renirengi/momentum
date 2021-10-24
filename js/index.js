import { initClockAndCalendar } from './clock.js';
import { initSlider } from './slider.js';
import { initWeather } from './weather.js';
import { initQuote } from './quote.js';
import { AudioPlayerComponent } from './audio-player.component.js';
import { initToDoList } from './toDoList.js';
import {initSetting} from './setting.js';
import { TranslateService } from './translate.service.js';

const translate = TranslateService.getInstance();

translate.setLocale('en');


initClockAndCalendar();
initSlider();
initWeather();
initQuote();
initToDoList();
initSetting();


window.customElements.define('audio-player', AudioPlayerComponent);
