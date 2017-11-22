import React from 'react';
import Login from './Login';
import Register from './Register';

function FrontHeader(props) {
  let isLoggedIn = false;
  if(props.user.email) {
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
                <li><a href="/teams" title="">Our Teams</a></li>
                <li><a href="#" onClick={props.logout} title="">About Us</a></li>
                <li><a href="/contact-us" title="">Contact Us</a></li>
                <Login isLoggedIn={isLoggedIn} user={props.user} logout={props.logout}/>
                <Register isLoggedIn={isLoggedIn} s/>
             </ul>
          </div>
       </div>
    </div>
  );
}

export default FrontHeader;
