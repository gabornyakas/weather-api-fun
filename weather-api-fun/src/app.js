// src/app.js

const weatherApiUrl = 'https://wttr.in'; // No API key required

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');

    // Simple autocomplete: suggest cities from a static list
    const cities = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney', 'Berlin', 'Moscow', 'Toronto', 'Beijing', 'Delhi'];
    cityInput.addEventListener('input', function() {
        const val = this.value;
        closeAllLists();
        if (!val) return false;
        const list = document.createElement('div');
        list.setAttribute('id', this.id + 'autocomplete-list');
        list.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(list);
        cities.forEach(function(city) {
            if (city.substr(0, val.length).toLowerCase() === val.toLowerCase()) {
                const item = document.createElement('div');
                item.innerHTML = '<strong>' + city.substr(0, val.length) + '</strong>' + city.substr(val.length);
                item.innerHTML += "<input type='hidden' value='" + city + "'>";
                item.addEventListener('click', function() {
                    cityInput.value = city;
                    closeAllLists();
                });
                list.appendChild(item);
            }
        });
    });
    function closeAllLists(elmnt) {
        const items = document.getElementsByClassName('autocomplete-items');
        for (let i = 0; i < items.length; i++) {
            if (elmnt !== items[i] && elmnt !== cityInput) {
                items[i].parentNode.removeChild(items[i]);
            }
        }
    }
    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value;
        getWeather(city);
    });
});


async function getWeather(city) {
    try {
        const response = await fetch(`${weatherApiUrl}/${encodeURIComponent(city)}?format=j1`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(city, data);
    } catch (error) {
        displayError(error.message);
    }
}


function displayWeather(city, data) {
    const weatherResult = document.getElementById('weatherResult');
    if (!data || !data.current_condition || !data.current_condition[0]) {
        weatherResult.innerHTML = `<p class="error">No weather data found.</p>`;
        return;
    }
    const condition = data.current_condition[0];
    weatherResult.innerHTML = `
        <div class="weather-info">
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${condition.temp_C} °C</p>
            <p>Weather: ${condition.weatherDesc[0].value}</p>
            <p>Humidity: ${condition.humidity}%</p>
        </div>
    `;
}


function displayError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p class="error">${message}</p>`;
}