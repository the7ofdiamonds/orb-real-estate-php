import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createAccount } from '../controllers/accountSlice';
import { setMessage, setMessageType } from '../controllers/messageSlice';

function AccountCreate() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    nicename: '',
    nickname: '',
    firstname: '',
    lastname: '',
    phone: '',
  });

  const { accountSuccessMessage, accountErrorMessage, accountError } =
    useSelector((state) => state.account);

  useEffect(() => {
    if (accountSuccessMessage) {
      dispatch(setMessage(accountSuccessMessage));
      dispatch(setMessageType('success'));
    }
  }, [accountSuccessMessage]);

  useEffect(() => {
    if (accountError) {
      dispatch(setMessage(accountError));
      dispatch(setMessageType('error'));
    }
  }, [accountError]);

  useEffect(() => {
    if (accountErrorMessage) {
      dispatch(setMessage(accountErrorMessage));
      dispatch(setMessageType('error'));
    }
  }, [accountErrorMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === '') {
      dispatch(setMessage('A username is not provided.'));
    } else if (formData.email == '') {
      dispatch(setMessage('An email is not provided.'));
    } else if (formData.firstname == '') {
      dispatch(setMessage('A first name is not provided.'));
    } else if (formData.lastname == '') {
      dispatch(setMessage('A last name is not provided.'));
    } else if (formData.phone == '') {
      dispatch(setMessage('A phone number is not provided.'));
    } else {
      dispatch(createAccount(formData));
    }
  };

  return (
    <>
      <div>
        <form
          method="post"
          className="create-account"
          id="create_account"
          onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <input
            className="input-username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="input-email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="input-name"
            type="text"
            name="nicename"
            placeholder="Nice Name (eg. /nicename)"
            value={formData.nicename}
            onChange={handleChange}
          />
          <input
            className="input-name"
            type="text"
            name="nickname"
            placeholder="Nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
          <input
            className="input-name"
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            className="input-name"
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            className="input-phone"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <select name="roles[]" id="role_select_add" multiple></select>

          <input type="hidden" name="display_name_add" id="display_name_add" />

          <button onClick={handleSubmit} type="submit">
            <h3>CREATE</h3>
          </button>
        </form>
      </div>
    </>
  );
}

export default AccountCreate;
