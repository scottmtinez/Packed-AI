import React, { useState, useEffect } from 'react';
import './Weather.css';
import PackingList from './PackingList';

const Weather = ({ location, username, arrivalDate, departureDate, extraInfo }) => {
    const [weatherData, setWeatherData] = useState(null);
    const KEY = 'e56209a25977b2465f2f62739cd457b8';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=43.0761&lon=88.7743&exclude=minutely,hourly&appid=${KEY}`);
                //const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,minutely,hourly&appid=${KEY}&units=metric`);
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [location, arrivalDate, departureDate, KEY]);

    const convertToFahrenheit = (celsius) => {
        return ((celsius * 9/5) + 32).toFixed(1);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    return (
        <div>
            {weatherData ? (
                <div className='weather-container'>
                    <button className='goToDashboardBtn'>Go to Dashboard</button>
                    <h1 className='weather-title'>{location}</h1>
                    {weatherData.daily && (
                        <ul className="layout">
                            {weatherData.daily && weatherData.daily.map((day, index) => (
                                <li className='layout-container' key={index}>
                                    <p className='layout-item-date'>{formatDate(day.dt)}</p>
                                    <p className='layout-item-temp'>{day.temp.day} °C</p>
                                    <p className='layout-item-forecast'>{day.weather[0]?.description}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className='weather-p'>
                        {weatherData.main && (
                            <span className='weather-deg'>{convertToFahrenheit(weatherData.main.temp)} °F </span>
                        )}
                    </p>
                    <div className='packingList-container'>
                        <PackingList />
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Weather;


