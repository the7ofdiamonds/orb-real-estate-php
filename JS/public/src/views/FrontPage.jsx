import { useEffect } from 'react';

import { getLocation } from "../../../utils/Location";

import NavigationLoginComponent from './components/NavigationLoginComponent';

function Frontpage() {
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <NavigationLoginComponent />
    </>
  );
}

export default Frontpage;
