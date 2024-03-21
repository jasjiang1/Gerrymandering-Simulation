import React from 'react';
//import logo from './grizzlies.png'
import transparentlogo from './grizzliestransparent.png'

function WelcomePage({ onStateSelected }) {
    return (
      <div className="welcome-modal">
        <h1>Team Grizzlies</h1>
        <img className="welcomelogo" src={transparentlogo} alt="Team Logo" />
        <h2>Select a State: </h2>
        <div className="button-container">
          <button onClick={() => onStateSelected('New Jersey')}>New Jersey</button>
          <button onClick={() => onStateSelected('Georgia')}>Georgia</button>
        </div>
      </div>
    );
  }

export default WelcomePage;
