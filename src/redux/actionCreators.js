import * as actionTypes from './actionTypes';
import ReactDOM from 'react-dom';

// todos
export const fetchAlbums = () => dispatch => {
  return fetch('http://www.local-photoshow-api.com/api/albums')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addAlbums(response.data)))
    .catch(error => dispatch(albumsFailed(error.message)));
};

export const fetchAlbum = (albumId, inputFlag = false) => (dispatch) => {
  return fetch(`http://www.local-photoshow-api.com/api/albums/${albumId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => {
      dispatch(addAlbum(response.data));
      if (inputFlag) {
        dispatch(setInputFromObject(response.data));
      }
    })
    .catch(error => dispatch(albumFailed(error.message)));
};

export const postAlbum = (text, description, file, cb, refs) => dispatch => {
  const newAlbum = {
    text: text,
    description: description
  };

  const data = new FormData();
  data.append('album', JSON.stringify(newAlbum));
  data.append('file', file);

  return fetch('http://www.local-photoshow-api.com/api/albums/store', {
    method: 'POST',
    body: data
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput());
        dispatch(setRedirect('/albums'));
        dispatch(addAlert(response.message, 'success'));
        cb();
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('add album: ', error.message);
    });
};

export const putTodo = (todoId, text, body, due, refs) => dispatch => {
  const oldTodo = {
    text: text,
    body: body,
    due: due
  };

  return fetch(`http://www.local-todolist-api.com/api/todo/${todoId}?_method=PUT`, {
    method: 'POST',
    body: JSON.stringify(oldTodo)
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput());
        dispatch(addAlert(response.message, 'success'));
        dispatch(setRedirect('/'));
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('edit todo: ', error.message);
    });
};

export const albumsFailed = errMess => ({
  type: actionTypes.ALBUMS_FAILED,
  payload: errMess
});

export const addAlbums = albums => ({
  type: actionTypes.ADD_ALBUMS,
  payload: albums
});

export const albumFailed = errMess => ({
  type: actionTypes.ALBUM_FAILED,
  payload: errMess
});

export const addAlbum = album => ({
  type: actionTypes.ADD_ALBUM,
  payload: album
});

//PHOTOS
export const fetchPhoto = (photoId, inputFlag = false) => (dispatch) => {
  return fetch(`http://www.local-photoshow-api.com/api/photos/${photoId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(response => {
      dispatch(addPhoto(response.data));
      if (inputFlag) {
        dispatch(setInputFromObject(response.data));
      }
    })
    .catch(error => dispatch(photoFailed(error.message)));
};

export const postPhoto = (text, description, file, albumId, cb, refs) => dispatch => {
  const newPhoto = {
    text: text,
    description: description,
    album_id: albumId
  };

  const data = new FormData();
  data.append('photo', JSON.stringify(newPhoto));
  data.append('file', file);

  return fetch('http://www.local-photoshow-api.com/api/photos/store', {
    method: 'POST',
    body: data
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(clearErrors());
        dispatch(clearInput());
        dispatch(setRedirect(`/albums/${albumId}`));
        dispatch(addAlert(response.message, 'success'));
        cb();
      }
      else {
        dispatch(addErrors(response.errors));
        setFocus(response.errors, refs);
      }
    })
    .catch(error => {
      console.log('add photo: ', error.message);
    });
};

export const deletePhoto = (photoId, albumId) => dispatch => {
  return fetch(`http://www.local-photoshow-api.com/api/photos/${photoId}?_method=DELETE`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(setRedirect(`/albums/${albumId}`));
        dispatch(addAlert(response.message, 'success'));
      }
      else {
        dispatch(addErrors(response.errors));
      }
    })
    .catch(error => {
      console.log('delete photo: ', error.message);
    });
};

export const photoFailed = errMess => ({
  type: actionTypes.PHOTO_FAILED,
  payload: errMess
});

export const addPhoto = photo => ({
  type: actionTypes.ADD_PHOTO,
  payload: photo
});

//ALERT
export const addAlert = (alert, status) => ({
  type: actionTypes.ADD_ALERT,
  payload: { message: alert, status: status }
});

export const clearAlert = () => ({
  type: actionTypes.CLEAR_ALERT
});

// TOGGLERS
export const toggleNavigation = () => {
  return {
    type: actionTypes.TOGGLE_NAVIGATION
  };
};

// INPUT
export const setInput = e => ({
  type: actionTypes.SET_INPUT,
  payload: e.target.value,
  key: e.target.name
});

export const setInputFromObject = obj => ({
  type: actionTypes.SET_INPUT_FROM_OBJECT,
  payload: obj
});

export const clearInput = () => ({
  type: actionTypes.CLEAR_INPUT
});

// FORMS
export const addErrors = errors => ({
  type: actionTypes.ADD_ERRORS,
  payload: errors
});

export const clearErrors = () => ({
  type: actionTypes.CLEAR_ERRORS
});

export const setFocus = (errs, refs) => {
  const keys = Object.keys(errs);
  const el = keys.length > 0 ? refs[keys[0]] : null;

  if (el) {
    ReactDOM.findDOMNode(el).scrollIntoView();
    ReactDOM.findDOMNode(el).focus();
  }
};

// REDIRECT
export const setRedirect = url => ({
  type: actionTypes.SET_REDIRECT,
  payload: url
});

export const clearRedirect = () => ({
  type: actionTypes.CLEAR_REDIRECT
});