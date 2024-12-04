import NavigationLoginComponent from './components/NavigationLoginComponent';
import ForgotComponent from './components/ForgotComponent';

function Forgot() {
  let page = 'forgot';

  return (
    <>
      <main className="forgot">
        <NavigationLoginComponent page={page} />
        <ForgotComponent />
      </main>
    </>
  );
}

export default Forgot;
