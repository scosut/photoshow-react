import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: '',
  album: {
    id: '',
    name: '',
    description: '',
    cover_image: '',
    photos: []
  }
};

export const albumReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_ALBUM:
      return { ...state, errMess: '', album: action.payload };

    case actionTypes.ALBUM_FAILED:
      return { ...state, errMess: action.payload, album: { id: '', name: '', description: '', cover_image: '', photos: [] } };

    default:
      return state;
  }
};