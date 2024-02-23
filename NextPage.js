import React, { useState } from 'react';
import './NextPage.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set, child, get, runTransaction, update } from 'firebase/database';

const NextPage = ({ location, username}) => {

    const passDateToWeatherAPI = () => {

    };

    const passDateToFlightAPI = () => {
    
    };
    
    
    const sendInfo = (event) => {
        event.preventDefault();
        sendLocationDataToFB(location, username);
    };

    const sendLocationDataToFB = (location, username) => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) {
            console.error('No user logged in.');
            return;
        }
    
        // Replace "." with "," and sanitize for Firebase path
        const modifiedEmail = username.replace(/\./g, ',');
        const sanitizedEmail = modifiedEmail.replace(/[.#$/[\]]/g, '_');
    
        const db = getDatabase();
        const recentLocationsRef = ref(db, `users/${sanitizedEmail}/recentLocations`);
    
        // Update the recentLocations node with the new location
        update(recentLocationsRef, { location })
            .then(() => {
                console.log('Location data added to Firebase under recentLocations node');
            })
            .catch((error) => {
                console.error('Error adding location data to Firebase:', error);
            });
    };
    

    return(
        <div>
            <div className='nextPage-container'>
                <h2>{location}</h2>
                <form className='NextPage-Form' onSubmit={sendInfo}>
                    <input type='date' name='arrival-date' className='arrival-date '/>
                    <input type='date' name='departure-date' className='departure-date '/><br/>
                    <input type='text' name='extraInfo' className='extraInfo' placeholder='Extra Information about Destination...'/><br/>
                    <input type='submit'name='button' className='submit' value='Add Information'/>
                </form>
            </div>

        </div>
    );
}

export default NextPage;


