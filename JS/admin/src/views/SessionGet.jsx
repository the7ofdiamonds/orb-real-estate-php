import { setMessage, setMessageType } from '../controllers/messageSlice';

function SessionGet() {
  return (
    <>
      <div class="session-management-get" id="session_management_get">
        
        <form method="post" class="get-sessions" id="get_sessions">
          <h2>Get Sessions</h2>
          <div class="get-sessions-submit">
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="email"
              required
            />
            <button id="get_sessions_btn" type="submit">
              Find
            </button>
          </div>
        </form>

        <div class="account-details">
          <div class="account-id">
            <h3>Account ID</h3>
            <h4 id="account_id"></h4>
          </div>

          <div class="provider-given-id">
            <h3>Provider Given ID</h3>
            <h4 id="provider_given_id"></h4>
          </div>

          <div class="account-status">
            <h3>Account Status</h3>
            <h4 id="account_status"></h4>
          </div>
        </div>

        <div class="sessions" id="sessions"></div>
      </div>
    </>
  );
}

export default SessionGet;
