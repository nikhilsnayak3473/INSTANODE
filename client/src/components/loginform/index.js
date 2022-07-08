import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

function LoginForm({ login }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='loginFormWrapper'>
      <form id='loginForm' onSubmit={(e) => handleSubmit(e)}>
        <input
          type='email'
          placeholder='Enter your Email ID'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' value='Log In' className='loginButton' />
      </form>
      {/* <p className='signUpText'>
        Don't have an account?
        <button onClick={(e) => onClick(e)}>Sign Up here</button>
      </p> */}
    </div>
  );
}

export default connect(null, { login })(LoginForm);
