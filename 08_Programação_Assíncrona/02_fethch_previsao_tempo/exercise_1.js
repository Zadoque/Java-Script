const geoApikey = ''; // your api Key to get the lon and lat from name comes here
const weatherApikey = ''; // your api Key to get weather using lon and lat comes here

function getWheather(event){
    if(event.type == 'keyup'){
        if(event.key == 'Enter'){
            console.log('here');
        }
    }
    else{
        let input = document.querySelector('#city').value;
        if(!(/[a-zA-Z]/.test(input))){
            return;
        }
        let city_name = '';
        for(letter of input){
            if(letter !== ' '){
                city_name += letter;
            }
            else{
            city_name += '%20';
            }
        } 
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${city_name}&format=json&apiKey=${geoApikey}`)
        .then(response => response.json())
        .then(result => {
            
            console.log(result);
            let lat = result.results[0].lat;
            let lon = result.results[0].lon;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApikey}`)
            .then(answer => answer.json())
            .then(answer => {
                console.log(answer);
                let curr_temp = Math.round(answer.main.temp - 273.15);
                let weather = answer.weather[0].main;
                let max_temp = Math.round(answer.main.temp_max - 273.15);
                let min_temp = Math.round(answer.main.temp_min - 273.15);
                switch(weather){
                    case 'Rain':
                        weather = 'previsão de chuva pra hoje';
                        break;
                    case 'Sun':
                        weather = 'previsão de dia ensolarado';
                        break;
                    case 'Mist':
                        weather = 'previsão de dia com neblina';
                        break;
                    case 'Clear':
                        weather = 'previsão de cêu limpo';
                        break;
                    case 'Clouds':
                        weather = 'previsão de Núvens no cêu';
                        break;
                    default:
                        break;
                }
                let temp = ''
                max_temp == min_temp ? str = `Temperatura: ${max_temp}º` :  str = ` Temperatura agora: ${curr_temp}º, máxima: ${max_temp}º , mínima: ${min_temp}º`;
                document.querySelector('#weatherInfo').querySelector('h2').innerText = input;
                document.querySelector('#weatherInfo').querySelector('h3').innerText =  ` ${str}, ${weather}`;
                document.querySelector('#city').value = '';

            })
            .catch(error => console.log( 'error was' + error));

        })
        .catch(error => console.log('error', error));
    }
}
document.querySelector('#loadWeather').addEventListener('click', getWheather);
document.querySelector('#city').addEventListener('keyup', getWheather);