import { setMessage, setMessageType } from '../controllers/messageSlice';

function SessionFind() {
  return (
    <>
      <div class="session-management-find" id="session_management_find">
        <form method="post" class="find-session" id="find_session">
          <h2>Find Session</h2>
          <div class="find-session-submit">
            <input
              type="text"
              name="verifier"
              placeholder="Token"
              id="verifier"
              required
            />
            <button id="find_session_btn" type="submit">
              Find
            </button>
          </div>
        </form>

        <div class="session" id="session">
          <div class="account-id">
            <h3>Account ID</h3>
            <h4 id="account_id"></h4>
          </div>

          <div class="provider-given-id">
            <h3>Provider Given ID</h3>
            <h4 id="provider_given_id"></h4>
          </div>

          <div class="username">
            <h3>Username</h3>
            <h4 id="username"></h4>
          </div>

          <div class="roles">
            <h3>Roles</h3>
            <h4 id="roles"></h4>
          </div>

          <div class="ip">
            <h3>IP</h3>
            <h4 id="ip"></h4>
          </div>

          <div class="login">
            <h3>Login</h3>
            <h4 id="login"></h4>
          </div>

          <div class="expiration">
            <h3>Expiration</h3>
            <h4 id="expiration"></h4>
          </div>

          <div class="user-agent">
            <h3>User Agent</h3>
            <h4 id="user_agent"></h4>
          </div>

          <div class="algorithm">
            <h3>Algorithm</h3>
            <h4 id="algorithm"></h4>
          </div>

          <div class="access-token">
            <h3>Access Token</h3>
            <h4 id="access_token"></h4>
          </div>

          <div class="refresh-token">
            <h3>Refresh Token</h3>
            <h4 id="refresh_token"></h4>
          </div>

          <button class="session-delete-btn" id="session_delete_btn">
            <h3>Remove</h3>
          </button>
        </div>
      </div>
    </>
  );
}

export default SessionFind;
