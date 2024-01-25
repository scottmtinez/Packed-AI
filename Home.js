import React, { useState, useEffect } from 'react';
import './Home.css';
import Main from './Main';

function Home(){
    return(
        <div className='body'>
            <Main />
            <footer className='footer'>Packed AI | 2023 | A Portfolio Project</footer>
        </div>
    );
}

export default Home;
