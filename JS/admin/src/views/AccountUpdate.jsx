import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChangeUsername from './component/ChangeUsername';
import { setMessage, setMessageType } from '../controllers/messageSlice';

import { changeNicename, changeNickname } from '../controllers/changeSlice';

function AccountUpdate(props) {
  const {
    email,
    usrname,
    niceName,
    nickName,
    firstName,
    lastName,
    rolesSelected,
    phoneNumber,
  } = props;

  const [Nicename, setNicename] = useState(niceName);
  const [Nickname, setNickname] = useState(nickName);
  const [Firstname, setFirstname] = useState(firstName);
  const [Lastname, setLastname] = useState(lastName);
  const [Roles, setRoles] = useState(rolesSelected);
  const [Phone, setPhone] = useState(phoneNumber);

  const dispatch = useDispatch();

  const { nicename, nickname, firstname, lastname, roles, phone } = useSelector(
    (state) => state.change
  );

  const handleChangeNicename = (e) => {
    const { name, value } = e.target;

    if (name === 'nicename') {
      setNicename(value);
    }
  };

  const handleChangeNickname = (e) => {
    const { name, value } = e.target;

    if (name === 'nickname') {
      setNickname(value);
    }
  };

  const handleChangeFirstname = (e) => {
    const { name, value } = e.target;

    if (name === 'firstname') {
      setFirstname(value);
    }
  };

  const handleChangeLastname = (e) => {
    const { name, value } = e.target;

    if (name === 'lastname') {
      setLastname(value);
    }
  };

  const handleChangePhone = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleNicenameChange = (e) => {
    e.preventDefault();

    if (Nicename == '') {
      dispatch(setMessage('A nicename is not provided.'));
      dispatch(setMessageType('error'));
    } else {
      dispatch(changeNicename(Nicename));
    }
  };

  const handleNicknameChange = (e) => {
    e.preventDefault();

    if (Nickname == '') {
      dispatch(setMessage('A nickname is not provided.'));
      dispatch(setMessageType('error'));
    } else {
      dispatch(changeNickname(Nickname));
    }
  };

  const handleFirstnameChange = (e) => {
    e.preventDefault();

    if (Firstname == '') {
      dispatch(setMessage('A first name is not provided.'));
    } else {
      dispatch(changeFirstname(Firstname));
    }
  };

  const handleLastnameChange = (e) => {
    e.preventDefault();

    if (Lastname == '') {
      dispatch(setMessage('A last name is not provided.'));
      dispatch(setMessageType('error'));
    } else {
      dispatch(changeLastname(Lastname));
    }
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();

    if (Phone == '') {
      dispatch(setMessage('A phone number is not provided.'));
      dispatch(setMessageType('error'));
    } else {
      dispatch(changePhone(Phone));
    }
  };

  useEffect(() => {
    if (nicename) {
      setNicename(nicename);
    }
  }, [nicename]);

  useEffect(() => {
    if (nickname) {
      setNickname(nickname);
    }
  }, [nickname]);

  useEffect(() => {
    if (firstname) {
      setFirstname(firstname);
    }
  }, [firstname]);

  useEffect(() => {
    if (lastname) {
      setLastname(lastname);
    }
  }, [lastname]);

  useEffect(() => {
    if (roles) {
      setRoles(roles);
    }
  }, [roles]);

  useEffect(() => {
    if (phone) {
      setPhone(phone);
    }
  }, [phone]);

  return (
    <>
      <div class="account-update" id="account_update">
        <ChangeUsername email={email} usrname={usrname} />

        <form method="post" class="change-nicename" id="change_nicename">
          <h3>Change Nicename</h3>
          <input
            type="text"
            name="nicename"
            id="nicename"
            placeholder="Nicename"
            value={Nicename}
            onChange={handleChangeNicename}
          />
          <button onClick={handleNicenameChange} type="submit">
            Change
          </button>
        </form>

        <form method="post" class="change-nickname" id="change_nickname">
          <h3>Change Nickname</h3>
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Nickname"
            value={Nickname}
            onChange={handleChangeNickname}
          />
          <button onClick={handleNicknameChange} type="submit">
            Change
          </button>
        </form>

        <form method="post" class="change-firstname" id="change_firstname">
          <h3>Change First Name</h3>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="First Name"
            value={Firstname}
            onChange={handleChangeFirstname}
          />
          <button onClick={handleFirstnameChange} type="submit">
            Change
          </button>
        </form>

        <form method="post" class="change-lastname" id="change_lastname">
          <h3>Change Last Name</h3>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Last Name"
            value={Lastname}
            onChange={handleChangeLastname}
          />
          <button onClick={handleLastnameChange} type="submit">
            Change
          </button>
        </form>

        <form method="post" class="change-phone" id="change_phone">
          <h3>Change Phone</h3>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={Phone}
            onChange={handleChangePhone}
          />
          <button onClick={handlePhoneChange} type="submit">Change</button>
        </form>
      </div>

      <div class="user-management-role" id="user_management_role">
        <form method="post" class="add-user-role" id="add_user_role">
          <h3>Add Role</h3>

          <select name="added_role" id="role_select_add"></select>

          <input type="hidden" name="display_name_add" id="display_name_add" />

          <button type="submit">Add</button>
        </form>

        <form method="post" class="remove-user-role" id="remove_user_role">
          <h3>Remove Role</h3>

          <input type="hidden" name="user_roles" id="user_roles" />

          <select name="remove_role" id="role_select_remove"></select>

          <input
            type="hidden"
            name="display_name_remove"
            id="display_name_remove"
          />

          <button type="submit">Remove</button>
        </form>
      </div>
    </>
  );
}

export default AccountUpdate;
