import { useEffect, useContext } from 'react';

import { AppContext } from '../../app-context';

import { enums } from '../../utils';

import useFetch from '../../custom-hooks/useFetch';
import useLocalStorage from '../../custom-hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {

  const [{ response }, doFetch] = useFetch('/user');

  const [token] = useLocalStorage('token');

  const [, dispatch] = useContext(AppContext);

  useEffect(() => {

    if (!token) {
      dispatch({ type: enums.SET_AUTHORIZATION, payload: null, isLoggedIn: false });
      return;
    }

    doFetch();

    dispatch({ type: enums.LOADING, isLoading: true });

  }, [token, doFetch, dispatch]);

  useEffect(() => {

    if (!response) return;

    dispatch({ type: enums.SET_AUTHORIZATION, payload: response.user, isLoggedIn: true });

  }, [response, dispatch]);

  return children;
}

export default CurrentUserChecker;