import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeUsername } from '../../controllers/changeSlice';

function ChangeUsername(props) {
  const { email, usrname } = props;

  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.change);

  const [emailChange, setEmailChange] = useState(email);
  const [usernameChange, setUsernameChange] = useState(usrname);

  const updateUsername = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (name == 'username') {
      setUsernameChange(value);
    }
  };

  const handleChangeUsername = (e) => {
    e.preventDefault();

    if (usernameChange !== '') {
      const credentials = {
        email: emailChange,
        username: usernameChange,
      };

      dispatch(changeUsername(credentials));
    }
  };

  useEffect(() => {
    if (email) {
      setEmailChange(email);
    }
  }, [email]);

  useEffect(() => {
    if (username) {
      setUsernameChange(username);
    }
  }, [username]);

  return (
    <>
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
    </>
  );
}

export default ChangeUsername;
