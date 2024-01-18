import React, { useState, useEffect } from 'react';
import './Account.css';

const Account = ({ username, password, onLogout }) => {
    return(
        <div className='account-container-dis'>
            <button className='logout-btn' onClick={onLogout}>Logout</button>
            <h2 className='account-title-name'>Account Information</h2>
            <h3 className='account-username'>{username}</h3>
            <h3 className='account-email'>[EMAIL HERE]</h3>
            <h3 className='account-password'>{password}</h3>
        </div>
    );
}

export default Account;

/* 
    NOTE: ?
*/