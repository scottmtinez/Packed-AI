// Account.js
import React, { useState, useEffect } from 'react';
import './Login.css';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Dashboard from './Dashboard';
import ReactLoading from 'react-loading';

const Account = ({ username, password, onLogout }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading state

    useEffect(() => {
        const loginWithFirebase = async () => {
            try {
                // Perform automatic login using Firebase signInWithEmailAndPassword
                const userCredential = await signInWithEmailAndPassword(auth, username, password);
                const signedInUser = userCredential.user;
                setUser(signedInUser);
                setError(null);
                setLoading(false); // Set loading to false after successful login
            } catch (loginError) {
                // Handle login error
                setUser(null);
                setError('Invalid username or password'); // Set a specific error message
                console.error('Login failed', loginError.message);
                setLoading(false); // Set loading to false after login error
            }
        };

        // Set up an observer to check for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // User is already signed in
                setUser(authUser);
                setError(null);
                setLoading(false); // Set loading to false after detecting authentication state change
            } else {
                // Attempt automatic login
                loginWithFirebase();
            }
        });

        // Clean up the observer when the component is unmounted
        return () => unsubscribe();
    }, [username, password]); // Include username and password in the dependency array to re-run the effect if they change

    const getEmail = () => {
        return user ? user.email : error || '[EMAIL NOT AVAILABLE]';
    };

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
        <div className='account-container-dis'>
            {loading ? (
                // Display loading spinner while logging in
                <ReactLoading type={'bars'} color={'#007bff'} height={50} width={50} />
            ) : error ? (
                // Display error message above the username box if login failed
                <div className='error-message'>{error}</div>
            ) : (
                // Render Dashboard component if not loading and no error
                <Dashboard className='loading' username={username} password={password} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default Account;

/* 
    NOTE: ?
*/
