import React from 'react';
import LoginButton from './Login';
import RegisterButton from './Register';

function FrontHeader(props) {
  let isLoggedIn = false;
  if(Object.keys(props.user).length > 0) {
    isLoggedIn = true;
  }

  return(
    <div id="header-wrapper">
       <div id="header" className="container">
          <div id="logo">
             <h1><a href="/">Any Game Tickets</a></h1>
          </div>
          <div id="menu">
             <ul>
                <li><a href="#" title="">About Us</a></li>
                <li><a href="/contact-us" title="">Contact Us</a></li>
                <LoginButton isLoggedIn={isLoggedIn} user={props.user} logout={props.logout}/>
                <RegisterButton isLoggedIn={isLoggedIn} s/>
             </ul>
          </div>
       </div>
    </div>
  );
}

export default FrontHeader;
