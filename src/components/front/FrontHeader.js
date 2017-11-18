import React from 'react';

function FrontHeader(props) {
  return(
    <div id="header-wrapper">
       <div id="header" className="container">
          <div id="logo">
             <h1><a href="/">Any Game Tickets</a></h1>
          </div>
          <div id="menu">
             <ul>
                <li><a href="/teams" title="">Our Teams</a></li>
                <li><a href="#" title="">About Us</a></li>
                <li><a href="/contact-us" title="">Contact Us</a></li>
                <li><a className="loginButton" href="/login" title="">Login</a></li>
                <li><a href="/register" title="">Register</a></li>
             </ul>
          </div>
       </div>
    </div>
  );
}

export default FrontHeader;
