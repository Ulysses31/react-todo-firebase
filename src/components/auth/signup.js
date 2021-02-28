import React, { useState } from 'react';

export default function SignUp() {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <>
      <form
        autoComplete='off'
        style={{ marginTop: '30px' }}
        onSubmit={handleSubmitForm}
      >
        <legend>
          <h4>Sign Up</h4>
        </legend>
        <table border='0'>
          <tbody>
            <tr>
              <th>Email</th>
            </tr>
            <tr>
              <td>
                <input
                  type='text'
                  name='email'
                  value={state.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Password</th>
            </tr>
            <tr>
              <td>
                <input
                  type='text'
                  name='password'
                  value={state.password}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td align='center'>
                <button type='submit'>SignUp</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
