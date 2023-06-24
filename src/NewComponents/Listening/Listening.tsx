import React, { useState, useEffect } from 'react';
import './style.css';

const ListeningIndicator: React.FC = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Simulating the start/stop of listening for trigger words
    const timeout = setTimeout(() => {
      setIsListening(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      setIsListening(false);
    };
  }, []);

  const handleCloseContacts = () => {
    window.location.href = '/Contacts'
    // Handle the Close Contacts button click event
    console.log('Close Contacts button clicked');
  };

  return (
    <>
      <button className="close-contacts-button" onClick={handleCloseContacts}>
        Close Contacts
      </button>
      <div className="listening-indicator-container">
        {isListening ? (
          <div className="listening-indicator-content">
            <span className="listening-text">Listening...</span>
            <div className="listening-icon">🎙️</div>
          </div>
        ) : (
          <div className="listening-indicator-content">Not Listening</div>
        )}
      </div>
    </>
  );
};

export default ListeningIndicator;
