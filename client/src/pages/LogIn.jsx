import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; 

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      });

      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
