import { useState, useEffect } from 'react';

function EmailComponent() {
  const [email, setEmail] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleFind = (e) => {
    e.preventDefault();

    if (email == '') {
      setMessage('An email is not provided.');
    } else {
      dispatch(findAccount(email));
    }
  };
  
  return (
    <form method="post" class="find-session" id="find_session">
    <h2>Find Session</h2>
    <div class="find-session-submit">
      <input
        type="text"
        name="email"
        placeholder="Email"
        id="email"
        onChange={handleChange}
      />
      <button onClick={handleFind} id="find_session_btn" type="submit">
        Find
      </button>
    </div>
  </form>
  );
}

export default EmailComponent;
