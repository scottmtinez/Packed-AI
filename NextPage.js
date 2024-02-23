import React, { useState } from 'react';
import './NextPage.css';
import { getDatabase, ref, push, set } from "firebase/database";

const NextPage = ({ location, username }) => {

    const sendInfo = async (event) => {
        event.preventDefault();
        await sendLocationDataToFB(location, username);
    };

    const sendLocationDataToFB = async (location, username) => {
        try {
            // Get a reference to the database
            const database = getDatabase();
            
            // Sanitize the email to replace periods with commas
            const sanitizedEmail = username.replace(/\./g, ',');
            
            // Reference the recent locations for the user
            const userRecentLocationsRef = ref(database, `users/${sanitizedEmail}/recentLocations`);
    
            // Push the new location to the list
            await push(userRecentLocationsRef, location);
    
            console.log("Recent location sent to Firebase Database successfully!");
        } catch (error) {
            console.error("Error sending recent location to Firebase Database:", error);
        }
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


