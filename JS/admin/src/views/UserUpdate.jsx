import { useSelector } from 'react-redux';

import ChangeUsername from './component/ChangeUsername';

import { setMessage, setMessageType } from '../controllers/messageSlice';

function UserUpdate(props) {
  const { usrname } = props;

  const { email } = useSelector((state) => state.user);

  return (
    <>
      <div class="user-management-update" id="user_management_update">
        <ChangeUsername email={email} usrname={usrname}/>
      </div>
    </>
  );
}

export default UserUpdate;
