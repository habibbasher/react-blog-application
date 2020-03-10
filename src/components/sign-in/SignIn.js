import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import useFetch from '../../custom-hooks/useFetch';
import useLocalStorage from '../../custom-hooks/useLocalStorage';
import { AppContext } from '../../app-context';

import { enums } from '../../utils';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import BackendErrorMessages from '../backend-error-messages/BackendErrorMessages';

import './SignIn.scss';

const SignIn = () => {

  const userSigninURI = '/users/login';

  const [signinCredentials, setSigninCredentials] = useState({ email: '', password: '' });
  const { email, password } = signinCredentials;

  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const [{ isLoading, response, error }, doFetch] = useFetch(userSigninURI);

  const [, setToken] = useLocalStorage('token');

  const [, dispatch] = useContext(AppContext);

  const handleSubmit = async (event) => {

    event.preventDefault();
    const signinPayload = { email, password };

    doFetch({
      method: 'post',
      data: {
        user: signinPayload
      }
    });
  }

  useEffect(() => {

    if (!response) return;

    setToken(response.user.token);

    setIsSuccessfulSubmit(true);

    dispatch({ type: enums.SET_AUTHORIZATION, payload: response.user, isLoggedIn: true })

  }, [response, setToken, dispatch]);

  const handleChange = event => {
    const { value, name } = event.target;
    setSigninCredentials({ ...signinCredentials, [name]: value });
  }

  if (isSuccessfulSubmit) {
    return <Redirect to='/' />
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span className="mb-3">Sign in with your email and password</span>
      {error && <BackendErrorMessages backendErrors={error.errors} />}
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />

        <div className='buttons'>
          <CustomButton type="submit" isDisabled={isLoading}>Submit Form</CustomButton>
          <CustomButton type='button' isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  )

}

export default SignIn;