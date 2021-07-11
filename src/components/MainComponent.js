import React from 'react';
import AlbumsComponent from './AlbumsComponent';
import AlbumComponent from './AlbumComponent';
import PhotoComponent from './PhotoComponent';
import FormComponent from './FormComponent';
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../App.css';

const MainComponent = (props) => {
  return (
    <TransitionGroup>
      <CSSTransition timeout={1000} classNames='fade' key={props.location.key}>
        <div className="App">
          <NavbarComponent />
          <Switch location={props.location}>
            <Route exact path='/' component={AlbumsComponent} />
            <Route exact path='/albums' component={AlbumsComponent} />
            <Route exact path='/albums/create'
              render={() => <FormComponent title='Create Album' text='Name' file='Cover Image' />} />
            <Route exact path='/photos/create/:albumId'
              render={() => <FormComponent title='Upload Photo' text='Title' file='Photo' />} />
            <Route exact path='/albums/:albumId' component={AlbumComponent} />
            <Route exact path='/photos/:photoId' component={PhotoComponent} />
            <Redirect to='/' />
          </Switch>
          <FooterComponent />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(MainComponent);