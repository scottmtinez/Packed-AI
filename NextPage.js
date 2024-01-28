import React, { useState } from 'react';
import './NextPage.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const NextPage = ({ location }) => {

    const passDateToWeatherAPI = () => {

    };

    const passDateToFlightAPI = () => {
    
    };

    return(
        <div>
            <div className='nextPage-container'>
                <h2>{location}</h2>
                <form className='NextPage-Form'>
                    <input type='date' name='arrival-date' className='arrival-date '/>
                    <input type='date' name='departure-date' className='departure-date '/><br/>
                    <input type='text' name='extraInfo' className='extraInfo' placeholder='Extra Information about Destination...'/><br/>
                    <input type='submit'name='submit' className='submit' value='Add Information'/>
                </form>
            </div>

        </div>
    );
}

export default NextPage;
