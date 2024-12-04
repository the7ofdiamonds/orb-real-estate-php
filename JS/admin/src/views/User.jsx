import { useState } from 'react';
import { useSelector } from 'react-redux';

import UserCreate from './UserCreate';
import UserFind from './UserFind';
import UserUpdate from './UserUpdate';

import Details from './Details';

import { setMessage, setMessageType } from '../controllers/messageSlice';

function User() {
  const { username } = useSelector((state) => state.user);

  const [showCreate, setShowCreate] = useState(false);
  const [showFind, setShowFind] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleCreate = () => {
    setShowCreate(true);
    setShowFind(false);
    setShowUpdate(false);
    setShowDetails(false);
  };

  const handleFind = () => {
    setShowCreate(false);
    setShowFind(true);
    setShowUpdate(false);
    setShowDetails(false);
    setShowDelete(false);
  };

  const handleUpdate = () => {
    setShowCreate(false);
    setShowFind(false);
    setShowUpdate(true);
    setShowDetails(false);
  };

  const handleDetails = () => {
    setShowCreate(false);
    setShowFind(false);
    setShowUpdate(false);
    setShowDetails(true);
  };

  return (
    <>
      <div class="user-management" id="user_management">
        <div class="options" id="options">
          <button onClick={handleCreate} id="create_user">
            <h3>Create User</h3>
          </button>

          <button onClick={handleFind} id="find_user">
            <h3>Find User</h3>
          </button>

          <button onClick={handleUpdate} id="update_user">
            <h3>Update User</h3>
          </button>

          <button onClick={handleDetails} id="user_details">
            <h3>User Details</h3>
          </button>
        </div>

        {showCreate && <UserCreate />}

        {showFind && <UserFind />}

        {showUpdate && <UserUpdate usrname={username} />}

        {showDetails && <Details />}
      </div>
    </>
  );
}

export default User;
