import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import logo from '../assets/championList.jpeg';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }
    console.log('here2')
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {/* <h2 style={{ color: 'white', textDecoration: 'underline', display: 'flex', justifyContent: 'center' }} >Login</h2> */}
      <div>
        <img src={logo} alt="Login Image" />
      </div>
      <div>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/champion">back to the champion page.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer', background: 'gray', marginBottom: '10px', color: 'white'} }
            type="submit"
          >
            Submit
          </button>
          <p style={{ color: 'white', display: 'flex', justifyContent: 'center'}}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      )}
    </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Login;
