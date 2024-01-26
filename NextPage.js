import React, { useState } from 'react';
import './NextPage.css';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const NextPage = ({ location }) => {
    return(
        <div>
            <div className='nextPage-container'>
                <h2>Destination Information</h2>
                <p>Location: {location}</p>
            </div>

        </div>
    );
}

export default NextPage;
