import './style.css';
import logo from '../../icons/logo.svg';
import INSTANODE from '../../icons/INSTANODE.png';
import Alert from '../../components/alert';
import LoginForm from '../../components/loginform';

import { useState } from 'react';
import RegisterForm from '../../components/registerform';

export default function Landing() {
  const [status, setStatus] = useState(true);
  return (
    <div id='landing'>
      <Alert />
      <main id='landing-main'>
        <div className='section1'>
          <img src={logo} alt='' />
          <h3 className='logoText'>
            INSTANODE helps you connect and share with the people in your life.
          </h3>
        </div>
        <div className='section2'>
          <img src={INSTANODE} alt='' />
          {status ? (
            <LoginForm setStatus={setStatus} />
          ) : (
            <RegisterForm setStatus={setStatus} />
          )}
        </div>
      </main>
    </div>
  );
}
