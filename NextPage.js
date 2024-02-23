import React, { useState } from 'react';
import './NextPage.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';

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
        //For Testing
            console.log("Test Location:" + location);
            console.log("Test Username: " + username);
        
        // Replace "." with "," to be be read by firebase realtime db
            const modifiedEmail = username.replace(/\./g, ',');
            console.log("New Email: " + modifiedEmail);

        // Get a reference to the Firebase Realtime Database
            const db = getDatabase();
            
        // Sanitize the modified username for Firebase path
            const sanitizedEmail = modifiedEmail.replace(/[.#$/[\]]/g, '');

        // Set the user's email address and push the location data
            const userData = {
                email: username,
                recentLocations: {
                    locationId: location // Using "locationId1" as the location ID
                }
            };

        // Set user data
            set(ref(db, `users/${sanitizedEmail}`), userData)
                .then(() => {
                    console.log('Location data and email added to Firebase');
                })
                .catch((error) => {
                    console.error('Error adding location data and email to Firebase:', error);
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

