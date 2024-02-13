import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { MdAddPhotoAlternate } from "react-icons/md";
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebase';

function Dashboard({ username, password, email, onLogout, count }) {
  const [recentLocations, setRecentLocations] = useState([]);

  useEffect(() => {
    const recentVacationsRef = ref(database, 'recentVacations');

    // Listen for changes to the data
    onValue(recentVacationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array of locations
        const locationsArray = Object.values(data);
        setRecentLocations(locationsArray);
      } else {
        setRecentLocations([]);
      }
    });

    // Cleanup function to unsubscribe from database updates
    return () => {
      // Detach the listener when the component is unmounted
      off(recentVacationsRef);
    };
  }, []); // Run effect only once when the component mounts

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
          <ul>
            {recentLocations.map((location, index) => (
              <li key={index}>{location.location}</li>
            ))}
          </ul>
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
