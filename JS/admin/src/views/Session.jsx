import { useState } from 'react';

import SessionGet from './SessionGet';
import SessionFind from './SessionFind';
import SessionConfigure from './SessionConfigure';

import { setMessage, setMessageType } from '../controllers/messageSlice';

function Session() {
  const [showGet, setShowGet] = useState(false);
  const [showFind, setShowFind] = useState(false);
  const [showConfigure, setShowConfigure] = useState(false);

  const handleGet = () => {
    setShowGet(true);
    setShowFind(false);
    setShowConfigure(false);
  };

  const handleFind = () => {
    setShowGet(false);
    setShowFind(true);
    setShowConfigure(false);
  };

  const handleConfigure = () => {
    setShowGet(false);
    setShowFind(false);
    setShowConfigure(true);
  };

  return (
    <>
      <div class="session-management" id="session_management">
        <div class="options" id="options">
          <button onClick={handleGet} id="get_sessions">
            <h3>Get</h3>
          </button>

          <button onClick={handleFind} id="find_session">
            <h3>Find</h3>
          </button>

          <button onClick={handleConfigure} id="configure_sessions">
            <h3>Configure</h3>
          </button>
        </div>
      </div>

      {showGet && <SessionGet />}

      {showFind && <SessionFind />}
      
      {showConfigure && <SessionConfigure />}
    </>
  );
}

export default Session;
