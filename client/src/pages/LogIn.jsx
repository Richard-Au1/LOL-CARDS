import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted!');

    try {
      const { data } = await loginUser({
        variables: { ...formData },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(e);
    }

    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div>
      {/* <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>  */}
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/champions">back to the champion page.</Link>
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Submit
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
