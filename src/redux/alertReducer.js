import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  message: '',
  status: ''
};

export const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALERT:
      return { ...state, message: action.payload.message, status: action.payload.status };

    case actionTypes.CLEAR_ALERT:
      return { ...state, message: '', status: '' };

    default:
      return state;
  }
};