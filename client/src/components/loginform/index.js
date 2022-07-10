import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './style.css';

function LoginForm({ login, setStatus }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <div className='loginFormWrapper'>
      <form id='loginForm' onSubmit={(e) => handleSubmit(e)}>
        <input
          type='email'
          placeholder='Enter your Email ID'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          placeholder='Enter your password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input type='submit' value='Log In' className='loginButton' />
      </form>
      <p className='signUpText'>
        Don't have an account?
        <button
          onClick={(e) => {
            setStatus(false);
          }}
        >
          Sign Up here
        </button>
      </p>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginForm);
