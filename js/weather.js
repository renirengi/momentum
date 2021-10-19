export function initWeather() {
    window.addEventListener('load', () => loadWeather());
   }

function loadWeather(){
    async function getWeather() {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=a5f7f90d7243a182a947965d9ece2df6&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
      }
      getWeather()
}