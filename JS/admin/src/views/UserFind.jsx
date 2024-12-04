import { setMessage, setMessageType } from '../controllers/messageSlice';

function UserFind() {
  return (
    <>
      <form method="post" class="find-user" id="find_user">
        <h2>Find User</h2>
        <div class="find-user-submit">
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            required
          />
          <button type="submit">Find</button>
        </div>
      </form>

      <div class="user-details" id="user_details">
        <div class="user-id">
          <h3>User ID</h3>
          <h4 id="user_id"></h4>
        </div>

        <div class="email">
          <h3>Email</h3>
          <h4 id="email"></h4>
        </div>

        <div class="names">
          <div class="username">
            <h3>Username</h3>
            <h4 id="username"></h4>
          </div>

          <div class="nicename">
            <h3>Nicename</h3>
            <h4 id="nicename"></h4>
          </div>

          <div class="full-name">
            <h3>Full Name</h3>
            <h4 id="full_name"></h4>
          </div>
        </div>

        <div class="phone">
          <h3>Phone</h3>
          <h4 id="phone"></h4>
        </div>

        <div class="roles" id="roles">
          <h3>Roles</h3>
          <div class="roles-row" id="roles_row"></div>
        </div>
      </div>
    </>
  );
}

export default UserFind;
