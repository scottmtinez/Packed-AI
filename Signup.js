import React, { useState, useEffect } from 'react';
import './Signup.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const Signup = ({ username, password, email, onLogout }) => {
    useEffect(() => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
            })
            .catch((error) => {
                console.error('Error signing up:', error.message);
            });
    }, []); 

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                onLogout();
            })
            .catch((error) => {
                console.error('Error signing out:', error.message);
            });
    };

    return (
        <div className='signup-container-dis'>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
            <h2 className='signup-title-name'>Account Information</h2>
            <h3 className='signup-username'>{username}</h3>
            <h3 className='signup-email'>{email}</h3>
            <h3 className='signup-password'>{password}</h3>
        </div>
    );
}

export default Signup;
