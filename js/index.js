import { initClockAndCalendar } from './clock.js';
import { initSlider } from './slider.js';
import { initWeather } from './weather.js';
import { initQuote } from './quote.js';
import { AudioPlayerComponent } from './audio-player.component.js';
import { SettingsComponent } from './settings.component.js';
import { initToDoList } from './toDoList.js';
import {ToDoListComponent } from './toDoList.component.js';
import { TranslateService } from './translate.service.js';
import { SettingsService } from './settings.service.js';

const settings = SettingsService.getInstance();
const translate = TranslateService.getInstance();

translate.setLocale(settings.language);

initClockAndCalendar();
initSlider();
initWeather();
initQuote();
// initToDoList();

window.customElements.define('audio-player', AudioPlayerComponent);
window.customElements.define('app-settings', SettingsComponent);
window.customElements.define('todo-list', ToDoListComponent);
