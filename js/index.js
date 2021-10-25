import { initClockAndCalendar } from './clock.js';
import { initSlider } from './slider.js';
import { initWeather } from './weather.js';
import { initQuote } from './quote.js';
import { AudioPlayerComponent } from './audio-player.component.js';
import { SettingsComponent } from './settings.component.js';
import { ToDoListComponent } from './toDoList.component.js';
import { TranslateService } from './translate.service.js';
import { SettingsService } from './settings.service.js';

const settings = SettingsService.getInstance();
const translate = TranslateService.getInstance();

translate.setLocale(settings.language);
const hidableComponentsList = ['weather', 'quote', 'player', 'clock', 'date', 'welcome', 'todo'];

window.customElements.define('audio-player', AudioPlayerComponent);
window.customElements.define('app-settings', SettingsComponent);
window.customElements.define('todo-list', ToDoListComponent);

initClockAndCalendar();
initSlider();
initWeather();
initQuote();

window.addEventListener('load', onLoad);

function onLoad() {
  const hidableElementsMap = hidableComponentsList.map((id) => {
    const element = document.getElementById(id);

    return { id, element };
  });

  const onHiddenListUpdate = (hiddenList) => {
    hidableElementsMap.forEach((item) => showHideComponent(item.element, !hiddenList.includes(item.id)));
  };

  settings.addCallbackToListOfHiddenUpdates(onHiddenListUpdate);
  onHiddenListUpdate(settings.listOfHiddenElements);
}

function showHideComponent(element, shouldBeShown) {
  const shownClass = 'showIt';
  const elementIsAlreadyShown = element && element.classList.contains(shownClass);

  if (elementIsAlreadyShown && !shouldBeShown) { // hide
    element.classList.remove(shownClass);
  } else if (!elementIsAlreadyShown && shouldBeShown) { // hide
    element.classList.add(shownClass);
  }
}