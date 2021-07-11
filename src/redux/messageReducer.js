import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: null,
  message: {}
};

export const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_FAILED:
      return { ...state, errMess: action.payload };

    case actionTypes.ADD_MESSAGE:
      return { ...state, errMess: null, message: action.payload };

    default:
      return state;
  }
};