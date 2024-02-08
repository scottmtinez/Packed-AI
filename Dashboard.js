import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { MdAddPhotoAlternate } from "react-icons/md";

function Dashboard({ username, password, email, onLogout, count}){
    console.log('Received count:', count);
    return(
        <div className='dashboard-container'>
            <button className='logout-btn' onClick={onLogout}>Logout</button><br/>

            <div className=''>
                <h1 className='dashboard-title'>Dashboard</h1>
            </div>

            <div className='row1-container'>
                <div className='num-vacations-container'>
                    <h1 className='num-vacations-title'>{ count } Vacations</h1>
                </div>
                <div className='add-vacation-pictures'>
                    <button className='add-photo-btn'><MdAddPhotoAlternate className='photo'/></button>
                </div>

            </div>

            <div className='row2-container'>
                <div className='recent-vacations-list'>
                    <h1>Recent Trips</h1>
                    <p> 
                        No Recent Trips <br/>
                    </p>
                </div>
                <div className='account-information-container'>
                    <h1 className='account-info-title'>Account Information</h1>
                    <h2 className='account-email'>{ username } <a href='#' className='edit'>Edit</a></h2>
                    <h2 className='account-password'>{ password } <a href='#' className='edit'>Edit</a></h2>
                </div>
            </div>

            <div className='row3-container'>

            </div>
        </div>
    );
}

export default Dashboard;