import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: '',
  albums: []
};

export const albumsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALBUMS:
      return { ...state, errMess: '', albums: action.payload };

    case actionTypes.ALBUMS_FAILED:
      return { ...state, errMess: action.payload, albums: [] };

    default:
      return state;
  }
};