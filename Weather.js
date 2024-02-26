import React, { useState, useEffect } from 'react';
import './Weather.css';
import PackingList from './PackingList';
import { Link } from 'react-router-dom';

const Weather = ({ location, username, arrivalDate, departureDate, extraInfo }) => {
    const [weatherData, setWeatherData] = useState(null);
    const KEY = 'e56209a25977b2465f2f62739cd457b8';

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

    const getWeatherIconUrl = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}.png`;
    };

    return(
        <div>
            {weatherData && (
                <div>
                    <div className='weather-container'>
                        <button className='goToDashboardBtn'>Go to Dashboard</button>
                        <h1 className='weather-title'>{location}</h1>
                        {weatherData.weather[0]?.icon && (
                                <img className='icon-size' src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" />
                        )}

                        <p className='weather-p'>
                            <span className='weather-deg'>{convertToFahrenheit(weatherData.main?.temp)} °F </span><br/>
                            <span className='weather-desc'>{weatherData.weather[0]?.description}</span><br/>
                            
                        </p>
                        <div className='packingList-container'>
                            <PackingList />
                        </div>
                    </div>
                </div>
            )}
            {!weatherData && <p>Loading...</p>}
        </div>

    );
};

export default Weather;


