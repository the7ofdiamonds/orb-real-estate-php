import { setMessage, setMessageType } from '../controllers/messageSlice';

function UserDetails() {
  return (
    <>
      <div class="account-details" id="account_details">
        <div class="ids" id="ids">
          <div class="account-id">
            <h3>Account ID</h3>
            <h4 id="account_id"></h4>
          </div>

          <div class="provider-given-id">
            <h3>Provider Given ID</h3>
            <h4 id="provider_given_id"></h4>
          </div>
        </div>

        <div class="contact" id="contact">
          <div class="email">
            <h3>Email</h3>
            <h4 id="email"></h4>
          </div>

          <div class="phone">
            <h3>Phone</h3>
            <h4 id="phone"></h4>
          </div>
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

        <div class="user-activation-code">
          <h3>Activation Code</h3>
          <h4 id="user_activation_code"></h4>
        </div>

        <div class="password">
          <h3>Password</h3>
          <h4 id="password"></h4>
        </div>

        <div class="confirmation-code">
          <h3>Confirmation Code</h3>
          <h4 id="confirmation_code"></h4>
        </div>

        <div class="roles" id="roles">
          <h3>Roles</h3>
          <div class="roles-row" id="roles_row"></div>
        </div>

        <div class="account-status">
          <h3>Account Status</h3>
          <h4 id="account_status"></h4>
        </div>
      </div>

      <div
        class="account-details-session-management"
        id="account_details_session_management">
        <div class="sessions" id="sessions"></div>
      </div>
    </>
  );
}

export default UserDetails;
