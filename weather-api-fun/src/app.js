// src/app.js

const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherOutput = document.getElementById('weather-output');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = cityInput.value;
        getWeather(city);
    });
});

async function getWeather(city) {
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    const weatherOutput = document.getElementById('weather-output');
    weatherOutput.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

function displayError(message) {
    const weatherOutput = document.getElementById('weather-output');
    weatherOutput.innerHTML = `<p class="error">${message}</p>`;
}