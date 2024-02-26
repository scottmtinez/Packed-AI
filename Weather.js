import React, { useState } from 'react';
import './Weather.css';
import PackingList from './PackingList';

const Weather = ({ location, username, arrivalDate, departureDate, extraInfo }) => {


    return(
        <div>
            <div className='weather-container'>
                <h1 className='weather-title'>{location}</h1>
                <div className=''>

                </div>
            </div>
        </div>
    );
};

export default Weather;
