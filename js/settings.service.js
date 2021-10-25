const defaultSettigs = {
  language: 'rus',
  backgroundSource: 'github',
  listOfHiddenElements: [],
  city: 'Минск',
  name: null,
  toDoList: [], // { title: 'test', done: true }
};

const settingsName = 'settings';

export class SettingsService {
  static service;

  /**
   * Don't use it! Use getInstance instead.
   */
  constructor() {
    const storedSettings = localStorage.getItem(settingsName);

    this.settings = storedSettings ? JSON.parse(storedSettings) : defaultSettigs;
    this.listOfHiddenCallbacks = [];
  }

  static getInstance() {
    if (!SettingsService.service) {
      SettingsService.service = new SettingsService();
    }
    return SettingsService.service;
  }

  addCallbackToListOfHiddenUpdates(callback) {
    this.listOfHiddenCallbacks.push(callback);
  }

  get language() {
    return this.settings.language;
  }

  set language(lang) {
    this.settings.language = lang;
    if (lang === 'rus') {
      this.settings.city = 'Минск';
    } else {
      this.settings.city = 'London';
    }
    this.#saveSettings();
  }

  get backgroundSource() {
    return this.settings.backgroundSource;
  }

  set backgroundSource(source) {
    this.settings.backgroundSource = source;
    this.#saveSettings();
  }

  get listOfHiddenElements() {
    return this.settings.listOfHiddenElements;
  }

  set listOfHiddenElements(list) {
    this.settings.listOfHiddenElements = list;
    this.#saveSettings();
    this.listOfHiddenCallbacks.forEach((callback) => callback(list));
  }

  get city() {
    return this.settings.city;
  }

  set city(city) {
    this.settings.city = city;
    this.#saveSettings();
  }

  get name() {
    return this.settings.name;
  }

  set name(fullName) {
    this.settings.name = fullName;
    this.#saveSettings();
  }

  get toDoList() {
    return this.settings.toDoList;
  }

  set toDoList(list) {
    this.settings.toDoList = list;
    this.#saveSettings();
  }

  #saveSettings() {
    localStorage.setItem(settingsName, JSON.stringify(this.settings));
  }
}
