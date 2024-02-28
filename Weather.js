import React, { useState, useEffect } from 'react';
import './Weather.css';
import PackingList from './PackingList';

const Weather = ({ location, username, arrivalDate, departureDate, extraInfo }) => {
    const [weatherData, setWeatherData] = useState(null);
    const KEY = 'HIDDEN';


    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly&appid=${KEY}`);
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
                        <ul>
                            {weatherData.daily.map((day, index) => (
                                <li key={index}>
                                    <p>Date: {formatDate(day.dt)}</p>
                                    <p>Temperature: {day.temp.day} °C</p>
                                    <p>Description: {day.weather[0]?.description}</p>
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


