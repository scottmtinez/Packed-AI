import React, { useState } from 'react';
import './Main.css';
import Button from 'react-bootstrap/Button'; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Account from './Account';
import Signup from './Signup';

function Main() {
  const [textboxValue, setTextboxValue] = useState('');
  const [isLoginFormVisible, setLoginFormVisibility] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [UserIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  
  const handleTextboxChange = (event) => {
    setTextboxValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Textbox value:', textboxValue);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const enteredUsername = event.target.elements['l-username'].value;
    const enteredPassword = event.target.elements['l-password'].value;

    console.log('Entered Username:', enteredUsername);
    console.log('Entered Password:', enteredPassword);

    setUserIsLoggedIn(true);
    setUsername(enteredUsername);
    setPassword(enteredPassword);

    //setLoginFormVisibility(false);
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    const enteredUsername = event.target.elements['s-username'].value;
    const enteredEmail = event.target.elements['s-email'].value;
    const enteredPassword = event.target.elements['s-password'].value;
    const enteredConfPassword = event.target.elements['s-conf-password'].value;

    console.log('Entered Username:', enteredUsername);
    console.log('Entered Username:', enteredEmail);
    console.log('Entered Password:', enteredPassword);
    console.log('Entered Password:', enteredConfPassword);

    if (enteredPassword !== enteredConfPassword) {
      setPasswordMatchError("Passwords do not match");
      return; 
    }

    setPasswordMatchError('');

    setUserIsLoggedIn(true);
    setUsername(enteredUsername);
    setEmail(enteredEmail);
    setPassword(enteredPassword);
    setConfPassword(enteredConfPassword);

    //setLoginFormVisibility(false);
  };

  const toggleLoginForm = () => {
    setLoginFormVisibility(!isLoginFormVisible);
  };

  const switchToSignUp = () => {
    setIsLoginPage(false);
  };

  const switchToLogin = () => {
    setIsLoginPage(true);
  };

  const handleLogout = () => {
    setUserIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginFormVisibility(true);
  };

  const handlePasswordVisibilityToggle = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="header-container">
        <h1 className='title'>Packed AI</h1>
        <Button className='bi bi-person-circle' onClick={toggleLoginForm}></Button>
      </div>
        <div className='form-row'>
          {isLoginFormVisible ? (
            <div className='login-form'>
                {isLoginPage ? (
                  <>
                    <div className='login-contaner'>
                      {UserIsLoggedIn ? (
                        <Account username={username} password={password} onLogout={handleLogout} />
                        ) : (
                          <form className='login-form-container' onSubmit={handleLoginSubmit}>
                            <h2 className='login-title'>LOGIN</h2>
                            <input type="text" name="l-username" placeholder='Username...' className='l-username' required/> <br/>
                            <div className='password-container'>
                              <input type={showPassword ? "text" : "password"} name="l-password" placeholder='Password...' className='l-password' required/> 
                              <button className='hidden-password' onClick={handlePasswordVisibilityToggle}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                            </div> <br/>
                            <input type='submit' />
                            <div>Need an account? Click<button className='switchToSignUpBtn' onClick={switchToSignUp}>Here</button></div>
                          </form>
                        )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className='signup-c'>
                      {UserIsLoggedIn ? (
                        <Signup username={username} password={password} email={email} onLogout={handleLogout} />
                      ) : (       
                        <form className='signup-form-container' onSubmit={handleSignUpSubmit}>
                          <h2 className='signup-title'>SIGNUP</h2>
                          <input type="text" name="s-username" placeholder='Username...' className='s-username' required /> <br/>
                          <input type="email" name="s-email" placeholder='Email...' className='s-email'required /> <br/>
                          <div className='password-container'>
                            <input type={showPassword ? "text" : "password"} name="s-password" placeholder='Password...' className='s-password' required />
                            <button className='hidden-password' onClick={handlePasswordVisibilityToggle}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                          </div><br/>
                          <div className='password-container'>
                            <input type={showPassword ? "text" : "password"} name="s-conf-password" placeholder='Confirm Password...' className='s-conf-password' required/>
                            <button className='hidden-password' onClick={handlePasswordVisibilityToggle}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                          </div><br/>
                          {passwordMatchError && <p className='error-message'>{passwordMatchError}</p>}
                          <input type='submit' />
                          <div>Have an account? Click<button className='switchToLoginBtn' onClick={switchToLogin}>Here</button></div>
                        </form>
                      )}
                    </div>
                  </>
                )}
            </div>
          ) : (
            <div>
              <form className='main-form' onSubmit={handleSubmit}>
                <input type='text' value={textboxValue} onChange={handleTextboxChange} className='destination-text-box' id='destination-text-box' placeholder='Whats your Destination?' />
                <button type='submit' className={`bi bi-airplane ${isLoginFormVisible ? 'hidden' : ''}`}></button>
                <div className='powered-by-label'>Powered by FlightAPI & WeatherAPI</div>
              </form>
            </div>
          )}
        </div>
      
    </div>
    
  );
}

export default Main;


/* NOTE: 
        - Using CSS move the person icon on the right up to be in line with the title
        - Hide password and button to view password
        - 

*/