import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { getAuth } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import { getDatabase } from 'firebase/database';

function Dashboard({ username }) {
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    const auth = getAuth(); // Get the Auth instance
    const database = getDatabase(); // Get the database instance

    // Check if a user is logged in
    if (auth.currentUser) {
      // Sanitize the username before using it in the Firebase path
      const sanitizedUsername = username.replace(/[.#$[\]]/g, ''); // Remove invalid characters

      const userId = auth.currentUser.uid; // Get the current user's ID
      const userRef = ref(database, `users/${sanitizedUsername}`); // Reference to the user's data in the database

      // Listen for changes to the user's data
      const unsubscribe = onValue(userRef, (snapshot) => {
        const userData = snapshot.val(); // Get the user's data from the snapshot
        setUserData(userData); // Update the state with the user's data
      });

      // Clean up listener when component unmounts
      return () => {
        off(userRef); // Unsubscribe from database changes
      };
    }
  }, [username]);

  // Render the user's data
  return (
    <div className="dashboard-container">
      <div className="">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      {userData && (
        <div className="user-data-container">
          <h2>Name: {userData.name}</h2>
          <h2>Email: {userData.email}</h2>
          <h2>Recent Location: {userData.recent}</h2>
        </div>
      )}

      <div className="add-vacation-pictures">
        <button className="add-photo-btn">
          <MdAddPhotoAlternate className="photo" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
