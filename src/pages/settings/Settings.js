import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AppContext } from '../../app-context';

import useFetch from '../../custom-hooks/useFetch';
import useLocalStorage from '../../custom-hooks/useLocalStorage';

import BackendErrorMessages from '../../components/backend-error-messages/BackendErrorMessages';

import { enums } from '../../utils';

const Settings = () => {

  const userURI = `/user`;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfulLogout, setIsSuccessfulLogout] = useState(false);

  const [{ response, error }, doUpdateUser] = useFetch(userURI);

  const [{ isLoggedIn, currentUser }, dispatch] = useContext(AppContext);

  const [, setToken] = useLocalStorage(enums.TOKEN);

  const onFormSubmit = event => {
    event.preventDefault();
    doUpdateUser({
      method: 'put',
      data: {
        user: {
          ...currentUser,
          username: name,
          image,
          bio,
          email,
          password
        }
      }
    });
  };

  const onLogout = event => {
    event.preventDefault();
    setToken('');
    dispatch({ type: enums.SET_AUTHORIZATION, payload: null, isLoggedIn: false });
    setIsSuccessfulLogout(true);
  };

  useEffect(() => {
    if (!currentUser) return;
    setImage(currentUser.image || '');
    setName(currentUser.username || '');
    setBio(currentUser.bio || '');
    setEmail(currentUser.email || '');
    setPassword(currentUser.password || '');
  }, [currentUser]);

  useEffect(() => {
    if (!response) return;
    dispatch({ type: enums.SET_AUTHORIZATION, payload: response.user, isLoggedIn: true })
  }, [response, dispatch]);

  if (isSuccessfulLogout) return <Redirect to="/" />;

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={onFormSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    row="8"
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={onLogout}>Or click here to logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;