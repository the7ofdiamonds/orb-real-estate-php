import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMessage, setMessageType } from '../controllers/messageSlice';

function UserCreate() {
  return (
    <>
      <form method="post" class="create-account" id="create_account">
        <h2>Create Account</h2>

        <input
          className="input-username"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          className="input-email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          className="input-password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          className="input-password"
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
        />

        <input
          className="input-name"
          type="text"
          name="nicename"
          placeholder="Nice Name (eg. /nicename)"
          required
        />
        <input
          className="input-name"
          type="text"
          name="nickname"
          placeholder="Nickname"
          required
        />

        <input
          className="input-name"
          type="text"
          name="firstname"
          placeholder="First Name"
          required
        />
        <input
          className="input-name"
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
        />

        <input
          className="input-phone"
          type="tel"
          name="phone"
          placeholder="Phone"
          required
        />

        <select name="roles[]" id="role_select_add" multiple></select>

        <input type="hidden" name="display_name_add" id="display_name_add" />

        <button type="submit">
          <h3>CREATE</h3>
        </button>
      </form>
    </>
  );
}

export default UserCreate;
