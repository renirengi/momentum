const locales = {
  eng: '../assets/en.json',
  rus: '../assets/ru.json',
};

export class TranslateService {
  static service;

  /**
   * Don't use it! Use getInstance instead.
   */
  constructor() {}

  static getInstance() {
    if (!TranslateService.service) {
      TranslateService.service = new TranslateService();
    }
    return TranslateService.service;
  }

  /**
   * Apply available locale 'eng' or 'rus'
   */
  setLocale(locale) {
    const localeUrl = locales[locale];

    if (localeUrl) {
      this.locale = locale;
    }

    this.translationsPromise = this.#loadLocale(localeUrl);
  }

  getLocale() {
    return this.locale;
  }

  async translate(key) {
    if (this.translationsPromise) {
      const translations = await this.translationsPromise;
      const translation = translations[key];

      return translation || key;
    }

    return key;
  }

  async #loadLocale(url) {
    return fetch(url).then((res) => res.json());
  }
}
