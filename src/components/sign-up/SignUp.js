import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import useFetch from '../../custom-hooks/useFetch';

import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButton';
import BackendErrorMessages from '../backend-error-messages/BackendErrorMessages';

import { SignUpContainer, SignUpTitle } from './SignUp.Styles';

import './SignUp.scss';

const SignUp = () => {

  const userSignupURI = '/users';

  const [signupCredentials, setSignupCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { username, email, password, confirmPassword } = signupCredentials;

  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);

  const [{ isLoading, response, error }, doFetch] = useFetch(userSignupURI);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('password dont match');
      return;
    }

    const signupPayload = { username, email, password };

    doFetch({
      method: 'post',
      data: {
        user: signupPayload
      }
    });
  };

  useEffect(() => {

    if (!response) return;

    localStorage.setItem('token', response.user.token);

    setIsSuccessfulSubmit(true);

  }, [response]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupCredentials({ ...signupCredentials, [name]: value });
  };

  if (isSuccessfulSubmit) {
    return <Redirect to='/' />
  }

  return (
    <SignUpContainer>
      <SignUpTitle>I do not have a account</SignUpTitle>
      <span className="mb-3">Sign up with your email and password</span>

      {error && <BackendErrorMessages backendErrors={error.errors} />}

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='username'
          value={username}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit' isDisabled={isLoading}>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );

}

export default SignUp;