import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import './style.css';

function RegisterForm({ register, setStatus }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    bDay: '',
    bMonth: '',
    bYear: '',
  });
  const {
    first_name,
    last_name,
    email,
    password,
    confirmPassword,
    gender,
    bDay,
    bMonth,
    bYear,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      gender,
      bDay,
      bMonth,
      bYear
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(email, password);
  };

  return (
    <div className='registerFormWrapper'>
      <form id='registerForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='name'>
          <input
            type='text'
            placeholder='Enter your First Name'
            name='first_name'
            value={first_name}
            onChange={(e) => onChange(e)}
          />
          <input
            type='text'
            placeholder='Enter your Last Name'
            name='last_name'
            value={last_name}
            onChange={(e) => onChange(e)}
          />
        </div>
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
        <input
          type='confirmPassword'
          placeholder='Enter your password again'
          name='confirmPassword'
          value={confirmPassword}
          onChange={(e) => onChange(e)}
        />
        <div className='gender'>
          <label htmlFor='Gender'>Gender:</label>
          <div className='genderInput'>
            <div>
              <input
                type='radio'
                name='gender'
                value='male'
                checked={gender === 'male'}
                onChange={(e) => onChange(e)}
              />
              Male
            </div>
            <div>
              <input
                type='radio'
                name='gender'
                value='female'
                checked={gender === 'female'}
                onChange={(e) => onChange(e)}
              />
              Female
            </div>
            <div>
              <input
                type='radio'
                name='gender'
                value='others'
                checked={gender === 'others'}
                onChange={(e) => onChange(e)}
              />
              Others
            </div>
          </div>
        </div>

        <input type='submit' value='Register' className='registerButton' />
      </form>
      <p className='logInText'>
        Already have an account?
        <button
          onClick={(e) => {
            setStatus(true);
          }}
        >
          Log In here
        </button>
      </p>
    </div>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
};

export default connect(null, { register })(RegisterForm);
