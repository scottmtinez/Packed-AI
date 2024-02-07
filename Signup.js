import React, { useState, useEffect } from 'react';
import './Signup.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import Dashboard from './Dashboard';
import ReactLoading from 'react-loading';

const Signup = ({ username, password, email, onLogout, count }) => {
    const [loading, setLoading] = useState(true); // State to track loading state
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status

    useEffect(() => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed up:', user);
                setLoggedIn(true);

                setTimeout(() => {
                    setLoading(false);
                }, 10000);
            })
            .catch((error) => {
                console.error('Error signing up:', error.message);
                setLoading(false);
            });
    }, [email, password]); 

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
            {loading ? (
                <div className='loading'>
                    <ReactLoading type={'bars'} color={'black'} height={50} width={50} />
                </div>
            ) : loggedIn ? (
                <Dashboard className='loading' username={username} password={password} email={email} onLogout={handleLogout} count={count}/>
            ) : (
                <p>Login failed. Please try again.</p>
            )}
        </div>
    );
}

export default Signup;
