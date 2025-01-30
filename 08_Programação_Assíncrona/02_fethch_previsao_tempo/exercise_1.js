const geoApikey = ''; // your api Key to get the lon and lat from name comes here
const weatherApikey = ''; // your api Key to get weather using lon and lat comes here
function switchWeather(weather) {
    switch (weather) {
        case 'Rain':
            return 'Previsão de chuva para hoje';
        case 'Sunny': 
            return 'Previsão de sol para hoje'
        case 'Clear':
            return 'Previsão de céu limpo';
        case 'Mist':
            return 'Previsão de dia com neblina';
        case 'Clouds':
            return 'Previsão de nuvens no céu';
        default:
            return 'Previsão desconhecida';
    }
}
function getWeather(event) {
    if (event.key && event.key !== 'Enter') {
        return; // Ignore keypresses that are not the Enter key
    }
    let input = document.querySelector('#city').value.trim();
    if (!/[a-zA-Z]/.test(input)) return;
    let city_name = input
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, '%20'); // Replace spaces with '%20'
    console.log(city_name);
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${city_name}&format=json&apiKey=${geoApikey}`)
        .then(response => response.json())
        .then(result => {
            if (!result.results || result.results.length === 0) {
                throw new Error('City not found');
            }    
            let { lat, lon } = result.results[0];
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApikey}`);
        })
        .then(answer => answer.json())
        .then(answer => {
            let curr_temp = Math.round(answer.main.temp - 273.15);
            let weather = switchWeather(answer.weather[0].main);
            let max_temp = Math.round(answer.main.temp_max - 273.15);
            let min_temp = Math.round(answer.main.temp_min - 273.15);
            let str = max_temp === min_temp
                ? `Temperatura: ${max_temp}º`
                : `Temperatura agora: ${curr_temp}º, máxima: ${max_temp}º , mínima: ${min_temp}º`;

            let weatherInfo = document.querySelector('#weatherInfo');
            weatherInfo.querySelector('h2').innerText = input;
            weatherInfo.querySelector('h3').innerText = `${str}, ${weather}`;

            document.querySelector('#city').value = '';
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
document.querySelector('#loadWeather').addEventListener('click', getWeather);
document.querySelector('#city').addEventListener('keyup', getWeather);
