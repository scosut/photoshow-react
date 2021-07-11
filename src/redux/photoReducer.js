import * as actionTypes from './actionTypes';

const INITIAL_STATE = {
  errMess: '',
  photo: {
    id: '',
    album_id: '',
    title: '',
    description: '',
    size: '',
    photo: '',
  }
};

export const photoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PHOTO:
      return { ...state, errMess: '', photo: action.payload };

    case actionTypes.PHOTO_FAILED:
      return { ...state, errMess: action.payload, photo: { id: '', album_id: '', title: '', description: '', size: '', photo: '' } };

    default:
      return state;
  }
};