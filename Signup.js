import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = ({ username, password, email, onLogout }) => {
    return(
        <div className='signup-container-dis'>
            <button className='logout-btn' onClick={onLogout}>Logout</button>
            <h2 className='signup-title-name'>Account Information</h2>
            <h3 className='signup-username'>{username}</h3>
            <h3 className='signup-email'>{email}</h3>
            <h3 className='signup-password'>{password}</h3>
        </div>
    );
}

export default Signup;