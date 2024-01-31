import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ username, password, email, onLogout }){
    return(
        <div className='dashboard-container'>
            <button className='logout-btn' onClick={onLogout}>Logout</button><br/>

            <div className=''>
                <h1 className='dashboard-title'>Dashboard</h1>
            </div>

            <div className='row1-container'>
                <div className='num-vacations-container'>
                    <h1 className='num-vacations-title'>0 Vacations</h1>
                </div>
                <div className=''>

                </div>
                
            </div>

            <div className='row2-container'>
                <div className='recent-vacations-list'>
                    <h1>Recent Trips</h1>
                    <p> 
                        No Recent Trips <br/>
                    </p>
                </div>
                <div className=''>
                    
                </div>
            </div>

            <div className='row3-container'>

            </div>
        </div>
    );
}

export default Dashboard;
