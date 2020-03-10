import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const signInSuccess = (state, action) => {
  return {
    ...state,
    currentUser: action.payload,
    error: null
  };
};

const signOutSuccess = (state) => {
  return {
    ...state,
    currentUser: null,
    error: null
  };
};

const handleFailure = (state, action) => {
  return {
    ...state,
    error: action.payload
  };
};

const userReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return signInSuccess(state, action);
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return signOutSuccess(state);
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return handleFailure(state, action);
    default:
      return state;
  }
};

export default userReducer;