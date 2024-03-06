import React, { useState, useEffect } from 'react';
import './Weather.css';
import PackingList from './PackingList';

const Weather = ({ location, username, arrivalDate, departureDate, extraInfo }) => {
    const [weatherData, setWeatherData] = useState(null);
    const KEY = 'HIDDEN';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Get latitude and longitude for the location
                const { latitude, longitude } = await getLocationCoordinates(location);
                
                // Fetch weather data using latitude and longitude  
                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${KEY}&units=imperial`);
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

    // Function to get latitude and longitude for a location
    const getLocationCoordinates = async (location) => {
        try {
            // Perform a request to the Nominatim API
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`);
            const data = await response.json();
            
            // Extract latitude and longitude from the response
            if (data.length > 0) {
                const { lat, lon } = data[0];
                return { latitude: lat, longitude: lon };
            } else {
                throw new Error("Location not found");
            }
        } catch (error) {
            console.error("Error fetching location coordinates:", error);
            return null;
        }
    };

    return (
        <div>
            {weatherData ? (
                <div className='weather-container'>
                    <button className='goToDashboardBtn'>Go to Dashboard</button>
                    <h1 className='weather-title'>{location}</h1>
                    <ul className="layout">
                        {weatherData.daily && weatherData.daily.map((daily, index) => (
                            <li className='layout-container' key={index}>
                                <p className='layout-item-date'>{formatDate(daily.dt)}</p>
                                <p className='layout-item-temp'>{daily.temp.max} °F</p>
                                <p className='layout-item-forecast'>{daily.weather[0]?.description}</p>
                            </li>
                        ))}
                    </ul>
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


