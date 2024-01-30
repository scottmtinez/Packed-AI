import React, { useState, useEffect } from 'react';

function Dashboard({ username, password, email, onLogout }){
    return(
        <div className='t'>
            <h1>Welcome to the Dashboard, {username}!</h1>
            <button onClick={onLogout}>Logout from Dashboard</button>
        </div>
    );
}

export default Dashboard;
