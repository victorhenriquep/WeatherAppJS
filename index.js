const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputField = document.getElementById("input-field");
const myButton = document.getElementById("my-button");

search.addEventListener('click', () => {

    const APIKey = '83cda4cf148a970bd15e2e0baf29b9af';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].description){
            case 'clear sky':
                image.src = 'assets/img/clear.png';
                break;

            case 'few clouds':
                image.src = 'assets/img/fewclouds.png';
                break;

            case 'scattered clouds':
                image.src = 'assets/img/scatteredclouds.png';
                break;

            case 'broken clouds':
                image.src = 'assets/img/brokenclouds.png';
                break;

            case 'shower rain':
                image.src = 'assets/img/showerrain.png';
                break;

            case 'rain':
                image.src = 'assets/img/rain.png';
                break;

            case 'thunderstorm':
                image.src = 'assets/img/thunderstorm.png';
                break;
            
            case 'snow':
                image.src = 'assets/img/snow.png';
                break;

            case 'mist':
                image.src = 'assets/img/mist.png';
                break;

            case 'overcast clouds':
                image.src = 'assets/img/overcastclouds.png';
                break;

            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';

    });
});

inputField.addEventListener("keydown", function(event) {    //when pressing enter, the search button will be clicked
    if(event.key === "Enter") {    //if the key pressed is 'enter'
        myButton.click();         //search button is clicked
    }
});