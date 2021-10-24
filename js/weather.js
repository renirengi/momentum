export function initWeather(loaderLang) {
  let lang;
  ///let loaderLang;
 
  function getLocalStorage() {
    loaderLang = localStorage.getItem('language');
    console.log(loaderLang);
    return loaderLang;
  }
  getLocalStorage();

  if (!loaderLang)
    lang="eng";
    else
    {
      if (loaderLang == 'rus')
        lang='rus';
      else
        lang='eng';
    }
  
  window.addEventListener('load', () => loadWeather(lang));
}

function loadWeather(lang) {
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const weatherError=document.querySelector('.weather-error');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  let url;
  const city = document.querySelector('.city');

  if (lang==="eng"){
    url=`https://api.openweathermap.org/data/2.5/weather?q=London&lang=eng&appid=a5f7f90d7243a182a947965d9ece2df6&units=metric`;
    document.getElementById('city').placeholder = 'London';
    //document.getElementById('city').value = 'London';
    getWeatherEng();

    
  }else{
    url=`https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=a5f7f90d7243a182a947965d9ece2df6&units=metric`;
    document.getElementById('city').placeholder = 'Минск';
    //document.getElementById('city').value = 'Минск';
    getWeatherRus();

   }
      
  
  
  async function getWeatherEng() {
    try {
      const res = await fetch(url);
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind ${Math.round(data.wind.speed)} meter per second`;
      humidity.textContent = `Humidity ${Math.round(data.main.humidity)}%`;
      
    } catch (e) {
      weatherError.textContent= 'Error! Cannot read this properties!';
      ///city.value="Minsk";
      getWeatherEng();

    }
  }

  async function getWeatherRus() {
    try {
      const res = await fetch(url);
      const data = await res.json();

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Ветер ${Math.round(data.wind.speed)} м/c`;
      humidity.textContent = `Влажность ${Math.round(data.main.humidity)}%`;
      
    } catch (e) {
      weatherError.textContent= 'Ошибка! Невозможно прочитать значение!';
      ///city.value="Minsk";
      getWeatherRus();

    }
  }
  
 

  city.addEventListener('change', () => {
    console.log(city.value);
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&=${lang}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    getWeather(url);

    const town = city.value.trim();
    if (town.length > 0) {
      localStorage.setItem('city', town);
    }

  });

  function getLocalStorage() {
    const town = localStorage.getItem('city');
    if (town) {
      city.value = town;
    }
  }
  getLocalStorage();

}