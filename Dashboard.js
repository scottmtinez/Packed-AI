import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { getAuth } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import { getDatabase } from 'firebase/database';

const replaceDotWithComma = (email) => {
  return email.replace(/\./g, ',');
};

function Dashboard({ username, onLogout }) {
  const modifiedUsername = replaceDotWithComma(username);
  const [userData, setUserData] = useState(null);
  const [recentLocations, setRecentLocations] = useState([]);

  useEffect(() => {
    const auth = getAuth(); 
    const database = getDatabase(); 

    const userRef = ref(database, `users/${modifiedUsername}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const userData = snapshot.val(); 
      setUserData(userData); 
      if (userData && userData.recentLocations) {
        const locationsArray = Object.values(userData.recentLocations); 
        setRecentLocations(locationsArray); 
      }
    });

    return () => {
      off(userRef); 
    };
  }, [modifiedUsername]);

  return (
    <div className="dashboard-container">
      <div className="">
        <button className='logout-btn' onClick={onLogout}>Logout</button><br/><br/>
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      {userData && (
        <div className="user-data-container">
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

