import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

import useLocalStorage from '../custom-hooks/useLocalStorage';

export default (url) => {

  const baseURI = `https://conduit.productionready.io/api`;

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ''
        }
      }
    };
    axios(`${baseURI}${url}`, requestOptions).then(res => {
      setResponse(res.data);
      setIsLoading(false);
    }).catch(err => {
      setError(err.response.data);
      setIsLoading(false);
    });
  }, [isLoading, url, options, baseURI, token]);

  return [{ isLoading, response, error }, doFetch];

};