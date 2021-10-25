import { SettingsService } from './settings.service.js';

export class SettingsComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.settings = SettingsService.getInstance();
  }

  connectedCallback() {
    const template = `
      <link href="./css/settings.component.css" rel="stylesheet" type="text/css">
      <button class="show-modal"></button>
      <div class="modal">
        <div class="modal-body">
          <button class="close-btn"></button>
          <form name="settingsForm">
            <p>Language / Язык<p>

            <label><input type="radio" name="language" value="eng"/>English / Английский</label>
            <label><input type="radio" name="language" value="rus"/>Russian / Русский</label>

            <p>Source of background image / Источник фоновых изображений<p>

            <label><input type="radio" name="background" value="github"/>GitHub</label>
            <label><input type="radio" name="background" value="unsplash"/>Unsplash</label>
            <label><input type="radio" name="background" value="flickr"/>Flickr</label>

            <p>Hidden objects / Скрытые объекты<p>

            <label><input type="checkbox" name="hidden" value="weather"/>Weather / Погода</label>
            <label><input type="checkbox" name="hidden" value="quote"/>Quote / Цитата</label>
            <label><input type="checkbox" name="hidden" value="player"/>Audio-player / Аудио-плеер</label>
            <label><input type="checkbox" name="hidden" value="clock"/>Clock / Часы</label>
            <label><input type="checkbox" name="hidden" value="date"/>Date / Дата</label>
            <label><input type="checkbox" name="hidden" value="welcome"/>Welcome / Приветствие</label>
            <label><input type="checkbox" name="hidden" value="todo"/>To-do list / Список дел</label>
          </form>
        </div>
      </div>
    `;

    this.shadow.innerHTML = template;
    this.modalElement = this.shadow.querySelector('.modal');
    this.languageElements = this.shadow.querySelectorAll('input[name="language"]');
    this.backgroundElements = this.shadow.querySelectorAll('input[name="background"]');
    this.hiddenElements = this.shadow.querySelectorAll('input[name="hidden"]');

    this.#loadSettings();

    this.shadow.querySelector('.show-modal').addEventListener('click', () => this.#toggleModal());
    this.shadow.querySelector('.close-btn').addEventListener('click', () => this.#toggleModal());

    this.languageElements.forEach((el) => el.addEventListener('click', () => this.#saveLanguage()));
    this.backgroundElements.forEach((el) => el.addEventListener('click', () => this.#saveBackgroundSource()));
    this.hiddenElements.forEach((el) => el.addEventListener('click', () => this.#saveListOfHiddenElements()));
  }

  #toggleModal() {
    this.modalElement.classList.toggle('displayed');

    if (!this.modalElement.classList.contains('displayed')) {
      location.replace(location.href.split('#')[0]);
    }
  }

  #loadSettings() {
    this.languageElements.forEach((el) => (el.checked = el.value === this.settings.language));
    this.backgroundElements.forEach((el) => (el.checked = el.value === this.settings.backgroundSource));
    this.hiddenElements.forEach((el) => (el.checked = this.settings.listOfHiddenElements.includes(el.value)));
  }

  #saveLanguage() {
    this.settings.language = this.shadow.querySelector('input[name="language"]:checked').value;
  }

  #saveBackgroundSource() {
    this.settings.backgroundSource = this.shadow.querySelector('input[name="background"]:checked').value;
  }

  #saveListOfHiddenElements() {
    this.settings.listOfHiddenElements = Array.from(this.hiddenElements).reduce((acc, el) => {
      if (el.checked) {
        acc.push(el.value);
      }

      return acc;
    }, []);
  }
}
