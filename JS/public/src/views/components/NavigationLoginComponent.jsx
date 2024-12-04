import { useEffect, useState } from 'react';

function NavigationLoginComponent(props) {
  const { page } = props;

  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    window.location.href = `/login`;
  };

  const handleLogout = () => {
    window.location.href = `/logout`;
  };

  const handleSignUp = () => {
    window.location.href = `/signup`;
  };

  const handleForgot = () => {
    window.location.href = `/forgot`;
  };

  useEffect(() => {
    const checkTokens = () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      setLoggedIn(accessToken != null && refreshToken != null);
    };

    checkTokens();

    window.addEventListener('storage', checkTokens);

    return () => {
      window.removeEventListener('storage', checkTokens);
    };
  }, []);

  return (
    <div className="options">
      {loggedIn ? (
        <button onClick={handleLogout} id="logout_page_btn">
          <h3>LOGOUT</h3>
        </button>
      ) : (
        page !== 'login' && (
          <button onClick={handleLogin} id="login_page_btn">
            <h3>LOGIN</h3>
          </button>
        )
      )}

      {page !== 'signup' && (
        <button onClick={handleSignUp} id="signup_page_btn">
          <h3>SIGN UP</h3>
        </button>
      )}

      {page !== 'forgot' && (
        <button onClick={handleForgot} id="forgot_page_btn">
          <h3>FORGOT</h3>
        </button>
      )}
    </div>
  );
}

export default NavigationLoginComponent;
