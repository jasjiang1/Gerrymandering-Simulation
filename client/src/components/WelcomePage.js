import React from 'react';
import logo from './grizzlies.png'

function WelcomePage({ onStateSelected }) {
    return (
      <div className="welcome-modal">
        <h1>Team Grizzlies</h1>
        <img src={logo} alt="Team Logo" />
        <button onClick={() => onStateSelected('New Jersey')}>New Jersey</button>
        <button onClick={() => onStateSelected('Georgia')}>Georgia</button>
      </div>
    );
  }

export default WelcomePage;
