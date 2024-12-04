import { setMessage, setMessageType } from '../controllers/messageSlice';

function Password() {
  return (
    <>
      <div class="password-management" id="password_management">
        <form method="post" class="find-auth" id="find_auth">
          <h2>Find Authentication Credentials</h2>
          <div class="find-auth-submit">
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

        <div class="account-details">
          <div class="account-ids">
            <div class="account-id">
              <h3>Account ID</h3>
              <h4 id="account_id"></h4>
            </div>

            <div class="provider-given-id">
              <h3>Provider Given ID</h3>
              <h4 id="provider_given_id"></h4>
            </div>
          </div>

          <div class="account-email">
            <h3>Email</h3>
            <h4 id="account_email"></h4>
          </div>

          <div class="password">
            <h3>Password</h3>
            <h4 id="password"></h4>
          </div>

          <div class="account-codes">
            <div class="activation-code">
              <h3>Activation Code</h3>
              <h4 id="activation_code"></h4>
            </div>

            <div class="confirmation-code">
              <h3>Confirmation Code</h3>
              <h4 id="confirmation_code"></h4>
            </div>
          </div>

          <div class="phone">
            <h3>Phone</h3>
            <h4 id="phone"></h4>
          </div>
        </div>

        <form method="post" class="recover-email" id="recover_email">
          <button type="submit" class="recover-btn" id="recover_btn">
            Send Recovery Email
          </button>
        </form>
      </div>
    </>
  );
}

export default Password;
