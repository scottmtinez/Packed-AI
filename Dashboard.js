import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { MdAddPhotoAlternate } from "react-icons/md";
import { getAuth } from 'firebase/auth'; // Import getAuth from Firebase Auth
import { ref, onValue, off } from 'firebase/database'; // Import database utilities from Firebase Realtime Database
import { getDatabase } from 'firebase/database'; // Import getDatabase function from Firebase Realtime Database

function Dashboard({ username, password, email, onLogout, count }) {
    const [location, setLocation] = useState('');
    const auth = getAuth(); // Get the Auth instance

    useEffect(() => {
        // Initialize Firebase Realtime Database
        const database = getDatabase();

        // Get a reference to the current user's recent locations in the database
        const userId = auth.currentUser.uid; // Get the current user's ID
        const recentVacationsRef = ref(database, `users/${userId}/recentVacations`);

        // Listen for changes to the recent locations
        const unsubscribe = onValue(recentVacationsRef, (snapshot) => {
            const data = snapshot.val();
            setLocation(data);
        });


        // Clean up listener when component unmounts
        return () => {
            off(recentVacationsRef); // Unsubscribe from database changes
        };
    }, [auth]); // Include auth as a dependency to re-trigger effect when auth state changes

    return (
        <div className='dashboard-container'>
            <button className='logout-btn' onClick={onLogout}>Logout</button><br/>

            <div className=''>
                <h1 className='dashboard-title'>Dashboard</h1>
            </div>

            <div className='row1-container'>
                <div className='num-vacations-container'>
                    <h1 className='num-vacations-title'>{ count } Vacations</h1>
                </div>
                <div className='add-vacation-pictures'>
                    <button className='add-photo-btn'><MdAddPhotoAlternate className='photo'/></button>
                </div>
            </div>

            <div className='row2-container'>
                <div className='recent-vacations-list'>
                    <h1>Recent Trips</h1>
                    <p> 
                        { location } <br/>
                    </p>
                </div>
                <div className='account-information-container'>
                    <h1 className='account-info-title'>Account Information</h1>
                    <h2 className='account-email'>{ username } <a href='#' className='edit'>Edit</a></h2>
                    <h2 className='account-password'>{ password } <a href='#' className='edit'>Edit</a></h2>
                </div>
            </div>

            <div className='row3-container'>

            </div>
        </div>
    );
}

export default Dashboard;
