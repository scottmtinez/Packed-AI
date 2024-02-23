import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { getAuth } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import { getDatabase } from 'firebase/database';

// Function to replace "." with ","
const replaceDotWithComma = (email) => {
  return email.replace(/\./g, ',');
};

function Dashboard({ username, onLogout }) {
  const modifiedUsername = replaceDotWithComma(username);
  const [userData, setUserData] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);

  useEffect(() => {
    const auth = getAuth(); // Get the Auth instance
    const database = getDatabase(); // Get the database instance

    // Reference to the user's data in the database
    const userRef = ref(database, `users/${modifiedUsername}`);

    // Listen for changes to the user's data
    const unsubscribe = onValue(userRef, (snapshot) => {
      const userData = snapshot.val(); // Get the user's data from the snapshot
      setUserData(userData); // Update the state with the user's data
      if (userData && userData.recentLocations) {
        const locationsArray = Object.values(userData.recentLocations); // Extract values from recentLocations object
        setRecentLocations(locationsArray); // Update recentLocations state
      }
    });

    // Clean up listener when component unmounts
    return () => {
      off(userRef); // Unsubscribe from database changes
    };
  }, [modifiedUsername]);

  return (
    <div className="dashboard-container">
      <div className="">
        
      </div>

      {userData && (
        <div className="user-data-container">
          <button className='logout-btn' onClick={onLogout}>Logout</button><br/><br/>
          <h1 className=''>{userData.name} <a href='#' className='edit'>Edit</a></h1>
          <h2>{modifiedUsername}<a href='#' className='edit'>Edit</a></h2>
          <h2>Recent Locations:</h2>
          <ul className="recent-locations-list">
            {recentLocations.map((location, index) => (
              <li className='align' key={index}>{location}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

