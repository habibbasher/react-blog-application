import { enums } from '../utils';

const setAuthorization = (state, action) => {
  return {
    ...state,
    isLoading: false,
    isLoggedIn: action.isLoggedIn,
    currentUser: action.payload
  };
};

const setLoadingTrue = state => {
  return { ...state, isLoading: true };
};

const reducer = (state, action) => {
  switch (action.type) {
    case enums.LOADING:
      return setLoadingTrue(state, action);
    case enums.SET_AUTHORIZATION:
      return setAuthorization(state, action);
    default:
      break;
  }
};

export default reducer;