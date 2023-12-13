import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import  {LOGIN_USER}  from '../utils/mutations';

import Auth from '../utils/auth';

// const LoginPage = () => {
//   const [formState, setFormState] = useState({
//     username: '',
//     password: '',
//   });

//   const [loginUser, { error }] = useMutation(LOGIN_USER);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await loginUser({
//         variables: {
//           email: formData.email,
//           password: formData.password,
//         },
//       });

//       window.location.href = '/dashboard';
//     } catch (error) {
//       console.error('Can not log in', error.message);
//     }
//   };

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
      <h2>Login</h2>
      {/* <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={formState.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formState.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>   */}
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/champions">back to the champion page.</Link>
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

export default Login;
