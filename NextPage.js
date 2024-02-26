import React, { useState } from 'react';
import './NextPage.css';
import { getDatabase, ref, push, set } from "firebase/database";
import Weather from './Weather';

const NextPage = ({ location, username }) => {
    const [showWeatherPage, setShowWeatherPage] = useState(false);
    const [arrivalDate, setArrivalDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [extraInfo, setExtraInfo] = useState('');

    const sendInfo = async (event) => { 
        event.preventDefault();
        await sendLocationDataToFB(location, username);

        const arrivalDateValue = event.target.elements['arrival-date'].value;
        const departureDateValue = event.target.elements['departure-date'].value;

        setArrivalDate(arrivalDateValue);
        setDepartureDate(departureDateValue);

        setShowWeatherPage(true);
    };

    const sendLocationDataToFB = async (location, username) => {
        try {
            const database = getDatabase();
            const sanitizedEmail = username.replace(/\./g, ',');
            const userRecentLocationsRef = ref(database, `users/${sanitizedEmail}/recentLocations`);
    
            await push(userRecentLocationsRef, location);
    
            console.log("Recent location sent to Firebase Database successfully!");
        } catch (error) {
            console.error("Error sending recent location to Firebase Database:", error);
        }
    };
    

    return(
        <div>
            {showWeatherPage ? (
                <Weather location={location} username={username} arrivalDate={arrivalDate} departureDate={departureDate} />
            ) : (
                <div className='nextPage-container'>
                <h2>{location}</h2>
                    <form className='NextPage-Form' onSubmit={sendInfo}>
                        <input type='date' name='arrival-date' className='arrival-date '/>
                        <input type='date' name='departure-date' className='departure-date '/><br/>
                        <input type='text' name='extraInfo' className='extraInfo' placeholder='Extra Information about Destination...'/><br/>
                        <input type='submit'name='button' className='submit' value='Add Information'/>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NextPage;


