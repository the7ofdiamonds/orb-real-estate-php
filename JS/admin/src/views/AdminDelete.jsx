import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { adminDelete } from '../controllers/adminSlice';

import { setMessage, setMessageType } from '../controllers/messageSlice';

function AdminDelete(props) {
  const { email } = props;

  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(adminDelete(email));
  };

  return (
    <>
      <div class="admin-delete">
        <form method="post" class="admin-delete" id="admin_delete">
          <h3>Delete Account</h3>
          <button
            onClick={handleDelete}
            type="submit"
            class="delete-btn"
            id="delete_btn">
            Delete
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminDelete;
