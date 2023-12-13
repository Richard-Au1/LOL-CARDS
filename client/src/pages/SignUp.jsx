import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import logo from '../assets/signupImage.jpg'

import Auth from '../utils/auth';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const { data } = await addUser({
        variables: { ...formData},
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center' }} >
      <img style={{height: '250px', margin: '60px' }} src= {logo} alt="signupImage" />
      <div style={{margin: '60px', }}>
      <h2 style={formStyle}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label style={informationStyle}>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label style={informationStyle}>
          Email Info:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label style={informationStyle}>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <button style={buttonStyle} type="submit">Sign Up</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <p style={loginStyle}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
};

const formStyle = {
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  textDecoration: 'underline',
}

const informationStyle = {
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
}

const buttonStyle = {
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  marginTop: '10px',
  marginBottom: '10px',
}

const loginStyle = {
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
}

export default SignUpPage;
