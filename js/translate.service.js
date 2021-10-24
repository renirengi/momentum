const locales = {
  en: '../assets/en.json',
  ru: '../assets/ru.json'
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
   * Apply available locale 'en' or 'ru'
   */
  setLocale(locale) {
    const localeUrl = locales[locale];

    if (localeUrl) {
      this.locale = locale;
    }

    this.translationsPromise = this.#loadLocale(localeUrl);
  }

 /* getLocal() {
    const locale = localStorage.getItem('language');
    if (locale) {
      language.value = locale;
    }
  }*/
  

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