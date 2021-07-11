// imports from node_modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// imports from user created files
import { navbarReducer } from './navbarReducer';
import { inputReducer } from './inputReducer';
import { errorsReducer } from './errorsReducer';
import { albumReducer } from './albumReducer';
import { albumsReducer } from './albumsReducer';
import { photoReducer } from './photoReducer';
import { alertReducer } from './alertReducer';
import { redirectReducer } from './redirectReducer';

export const ConfigureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({
      navbar: navbarReducer,
      input: inputReducer,
      errors: errorsReducer,
      albums: albumsReducer,
      album: albumReducer,
      photo: photoReducer,
      alert: alertReducer,
      redirect: redirectReducer
    }),
    composeEnhancers(applyMiddleware(thunk, logger))
  );

  return store;
}