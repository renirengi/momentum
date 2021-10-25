import { SettingsService } from './settings.service.js';
import { TranslateService } from './translate.service.js';

export function initWeather() {
  const settings = SettingsService.getInstance();
  const translate = TranslateService.getInstance();
  const language = translate.getLocale();

  const weatherIconElement = document.querySelector('.weather-icon');
  const temperatureElement = document.querySelector('.temperature');
  const weatherDescriptionElement = document.querySelector('.weather-description');
  const weatherErrorElement = document.querySelector('.weather-error');
  const windElement = document.querySelector('.wind');
  const humidityElement = document.querySelector('.humidity');
  const cityElement = document.querySelector('.city');

  const applyWheather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language.substring(0, 2)}&appid=a5f7f90d7243a182a947965d9ece2df6&units=metric`;
    const windText = await translate.translate('weatherWind');
    const humidityText = await translate.translate('weatherHumidity');
    const errorMsg = await translate.translate('weatherError');

    try {
      const res = await fetch(url);
      const data = await res.json();

      weatherIconElement.className = 'weather-icon owf';
      weatherIconElement.classList.add(`owf-${data.weather[0].id}`);
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescriptionElement.textContent = data.weather[0].description;
      windElement.textContent = `${windText} ${Math.round(data.wind.speed)} m/c`;
      humidityElement.textContent = `${humidityText} ${Math.round(data.main.humidity)}%`;

      return true;
    } catch (e) {
      weatherErrorElement.textContent = errorMsg;

      return false;
    }
  };

  const changeCity = async () => {
    const city = cityElement.value.trim();

    if (city.length > 0) {
      if (await applyWheather(city)) {
        settings.city = city;
      }
    }
  }

  cityElement.placeholder = settings.city;
  applyWheather(settings.city);
  cityElement.addEventListener('change', () => changeCity());

}
