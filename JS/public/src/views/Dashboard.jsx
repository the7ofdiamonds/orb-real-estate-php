import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AccountComponent from './components/AccountComponent';
import ChangeComponent from './components/ChangeComponent';
import AuthComponent from './components/AuthComponent';
import PasswordComponent from './components/PasswordComponent';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '../controllers/messageSlice';
import { getUser } from '../controllers/userSlice';

function Dashboard() {
  const dispatch = useDispatch();

  const { userLoading } = useSelector((state) => state.user);

  const { profileImage, displayName } = useSelector((state) => state.login);

  const profileImg = profileImage
    ? profileImage
    : localStorage.getItem('profile_image');
  const usersDisplayName = displayName
    ? displayName
    : localStorage.getItem('display_name');

  const [showSettings, setShowSettings] = useState('');
  
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userLoading) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('info'));
      dispatch(setMessage('Standbye while your account information is loaded.'));
    }
  }, [userLoading]);

  const handleShowSettings = () => {
    if (showSettings == false) {
      setShowSettings(true);
    }

    if (showSettings == true) {
      setShowSettings(false);
    }
  };

  return (
    <>
      <h2 className="title">Dashboard</h2>

      <div className="header">
        <div className="profile-image">
          <img src={`${profileImg}`} alt="" />
        </div>

        <h2 className="display-name">{usersDisplayName}</h2>

        <div className="action options">
          <button
            className="settings-button"
            onClick={handleShowSettings}
            id="settings_btn">
            <i class="fa-solid fa-gears"></i>
            <h3>SETTINGS</h3>
          </button>
        </div>
      </div>

      {showSettings && <ChangeComponent />}

      {<PasswordComponent />}
      
      {<AuthComponent />}

      {<AccountComponent />}
    </>
  );
}

export default Dashboard;
