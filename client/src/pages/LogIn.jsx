import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; 

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

const Login = (props) => {
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
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
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
      </p>
    </div>
  );
};

export default Login;
