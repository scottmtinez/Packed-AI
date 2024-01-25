import React, { useState, useEffect } from 'react';
import './Account.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Account = ({ username, password, onLogout }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Set up an observer to check for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
                setError(null);
            } else {
                // User is signed out
                setUser(null);
                setError('User not found');
            }
        });

        // Clean up the observer when the component is unmounted
        return () => unsubscribe();
    }, []);

    const getEmail = () => {
        return user ? user.email : error || '[EMAIL NOT AVAILABLE]';
    };

    return (
        <div className='account-container-dis'>
            <button className='logout-btn' onClick={onLogout}>Logout</button>
            <h2 className='account-title-name'>Account Information</h2>
            <h3 className='account-username'>{username}</h3>
            <h3 className='account-email'>{getEmail()}</h3>
            <h3 className='account-password'>{password}</h3>
        </div>
    );
}

export default Account;


/* 
    NOTE: ?
*/
