import React, { useState, useEffect } from 'react';
import './Weather.css';
import PackingList from './PackingList';

const Weather = ({ location, username, arrivalDate, departureDate, extraInfo }) => {
    const [weatherData, setWeatherData] = useState(null);
    const KEY = 'HIDDEN';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}&units=metric`);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [location, KEY]);

    const convertToFahrenheit = (celsius) => {
        return ((celsius * 9/5) + 32).toFixed(1);
    };

    return(
        <div>
            {weatherData && (
                <div>
                    <div className='weather-container'>
                        <h1 className='weather-title'>{location}</h1>
                        <p>Temperature: {convertToFahrenheit(weatherData.main?.temp)} °F</p>
                        <p>Description: {weatherData.weather[0]?.description}</p>
                    </div>
                </div>
            )}
            {!weatherData && <p>Loading...</p>}
        </div>

    );
};

export default Weather;
