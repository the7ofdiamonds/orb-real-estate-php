import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../controllers/userSlice';
import {
  changeUsername,
  changeName,
  changeNickname,
  changeNicename,
  changePhone,
} from '../../controllers/changeSlice';

import StatusBarComponent from '../../../../components/StatusBarComponent';

import LoginComponent from './LoginComponent';

import {
  isValidUsername,
  isValidPhone,
  isValidName,
} from '../../../../utils/Validation';

function ChangeComponent() {
  const dispatch = useDispatch();

  const {
    userLoading,
    userError,
    userErrorMessage,
    username,
    firstname,
    lastname,
    nickname,
    nicename,
    phone,
  } = useSelector((state) => state.user);

  const {
    changeLoading,
    changeError,
    changeSuccessMessage,
    changeErrorMessage,
    changeStatusCode,
  } = useSelector((state) => state.change);

  const { loginStatusCode } = useSelector((state) => state.login);

  const [usernameChange, setUsernameChange] = useState(username);
  const [firstnameChange, setFirstNameChange] = useState(firstname);
  const [lastnameChange, setLastNameChange] = useState(lastname);
  const [nicknameChange, setNicknameChange] = useState(nickname);
  const [nicenameChange, setNicenameChange] = useState(nicename);
  const [phoneChange, setPhoneChange] = useState(phone);

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (userLoading || changeLoading) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [userLoading, changeLoading]);

  useEffect(() => {
    if (changeSuccessMessage) {
      dispatch(setMessageType('success'));
      dispatch(setMessage(changeSuccessMessage));
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [changeSuccessMessage]);

  useEffect(() => {
    if (userErrorMessage || userError || changeErrorMessage || changeError) {
      dispatch(setMessageType('error'));
      dispatch(setShowStatusBar(Date.now()));

      if (userErrorMessage) {
        dispatch(setMessage(userErrorMessage));
      }

      if (userError) {
        dispatch(setMessage(userError));
      }

      if (changeErrorMessage) {
        dispatch(setMessage(changeErrorMessage));
      }

      if (changeError) {
        dispatch(setMessage(changeError));
      }
    }
  }, [userErrorMessage, userError, changeErrorMessage, changeError]);

  useEffect(() => {
    if (changeStatusCode) {
      dispatch(setShowStatusBar(Date.now()));
    }
  }, [changeStatusCode]);

  useEffect(() => {
    if (changeStatusCode == 403) {
      setShowLogin(true);
    }
  }, [changeStatusCode]);

  useEffect(() => {
    if (loginStatusCode == 200) {
      setShowLogin(false);
    }
  }, [loginStatusCode]);

  const updateUsername = (e) => {
    e.preventDefault();

    if (e.target.name == 'username') {
      setUsernameChange(e.target.value);
    }
  };

  const handleChangeUsername = (e) => {
    e.preventDefault();
    try {
      if (isValidUsername(usernameChange)) {
        dispatch(changeUsername(usernameChange));
      }
    } catch (error) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
    }
  };

  const updateNicename = (e) => {
    e.preventDefault();

    if (e.target.name == 'nicename') {
      setNicenameChange(e.target.value);
    }
  };

  const handleChangeNicename = (e) => {
    e.preventDefault();

    try {
      if (isValidUsername(nicenameChange)) {
        dispatch(changeNicename(nicenameChange));
      }
    } catch (error) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
    }
  };

  const updatePhone = (e) => {
    e.preventDefault();

    if (e.target.name == 'phone') {
      setPhoneChange(e.target.value);
    }
  };

  const handleChangePhone = (e) => {
    e.preventDefault();

    try {
      if (isValidPhone(phoneChange)) {
        dispatch(changePhone(phoneChange));
      }
    } catch (error) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
    }
  };

  const updateNickname = (e) => {
    e.preventDefault();

    if (e.target.name == 'nickname') {
      setNicknameChange(e.target.value);
    }
  };

  const handleChangeNickname = (e) => {
    e.preventDefault();

    try {
      if (isValidName(nicknameChange)) {
        dispatch(changeNickname(nicknameChange));
      }
    } catch (error) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
    }
  };

  const updateFirstName = (e) => {
    e.preventDefault();

    if (e.target.name == 'firstname') {
      setFirstNameChange(e.target.value);
    }
  };

  const updateLastName = (e) => {
    e.preventDefault();

    if (e.target.name == 'lastname') {
      setLastNameChange(e.target.value);
    }
  };

  const handleChangeName = (e) => {
    e.preventDefault();

    try {
      if (isValidName(firstnameChange) && isValidName(lastnameChange)) {
        const fullName = {
          first_name: firstnameChange,
          last_name: lastnameChange,
        };

        dispatch(changeName(fullName));
      }
    } catch (error) {
      dispatch(setShowStatusBar(Date.now()));
      dispatch(setMessageType('error'));
      dispatch(setMessage(error.message));
    }
  };

  return (
    <>
      <main className="change">
        <span className="change-username">
          <input
            className="input-username"
            type="text"
            name="username"
            placeholder="Username"
            value={usernameChange}
            onChange={updateUsername}
          />

          <div className="action">
            <button onClick={handleChangeUsername} id="change_username_btn">
              <h3>Change Username</h3>
            </button>
          </div>
        </span>

        <span className="change-name">
          <input
            className="input-name"
            type="text"
            name="firstname"
            placeholder="First Name"
            value={firstnameChange}
            onChange={updateFirstName}
          />

          <input
            className="input-name"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={lastnameChange}
            onChange={updateLastName}
          />

          <div className="action">
            <button onClick={handleChangeName} id="change_name_btn">
              <h3>Change Name</h3>
            </button>
          </div>
        </span>

        <span className="change-nickname">
          <input
            className="input-name"
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={nicknameChange}
            onChange={updateNickname}
          />

          <div className="action">
            <button onClick={handleChangeNickname} id="change_nickname_btn">
              <h3>Change Nickname</h3>
            </button>
          </div>
        </span>

        <span className="change-nicename">
          <input
            className="input-name"
            type="text"
            name="nicename"
            placeholder="Nicename"
            value={nicenameChange}
            onChange={updateNicename}
          />

          <div className="action">
            <button onClick={handleChangeNicename} id="change_nicename_btn">
              <h3>Change Nicename</h3>
            </button>
          </div>
        </span>

        <span className="change-phone">
          <input
            className="input-phone"
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={phoneChange}
            onChange={updatePhone}
          />

          <div className="action">
            <button onClick={handleChangePhone} id="change_phone_btn">
              <h3>Change Phone</h3>
            </button>
          </div>
        </span>

        <StatusBarComponent />
      </main>

      {showLogin && (
        <div className="modal-overlay">
          <main className="login">
            <LoginComponent />
          </main>
        </div>
      )}
    </>
  );
}

export default ChangeComponent;
