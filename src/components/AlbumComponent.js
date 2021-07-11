import React, { Component } from 'react';
import { Alert, Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, fetchAlbum } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    album: state.album,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  fetchAlbum: albumId => fetchAlbum(albumId),
};

class AlbumComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();
    this.props.clearRedirect();

    const albumId = this.props.match.params.albumId;

    if (albumId) {
      this.props.fetchAlbum(albumId);
    }
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          {this.props.alert.message.length > 0 &&
            <Alert color={this.props.alert.status}>
              {this.props.alert.message}
            </Alert>
          }
          <h3 className="text-center text-md-left">{this.props.album.album.name}</h3>
          <div className="d-flex justify-content-center justify-content-md-start mb-4">
            <Link to='/albums' className='btn btn-light btn-light-border mr-2'>Go Back</Link>
            <Link to={`/photos/create/${this.props.album.album.id}`} className='btn btn-secondary'>Upload Photo</Link>
          </div>
          {this.props.album.album.photos.length > 0 &&
            this.props.album.album.photos.map((row, index) => {
              return (
                <Row key={index}>
                  {row.map(r => {
                    return (
                      <Col md={4} key={r.id} className="mb-4">
                        <Link to={`/photos/${r.id}`}>
                          <img src={`http://www.local-photoshow-api.com/public/storage/photos/${this.props.album.album.id}/${r.photo}`} className="img-thumbnail img-fluid" alt={r.title} />
                        </Link>
                        <h5 className="text-center text-md-left">{r.title}</h5>
                      </Col>
                    )
                  })}
                </Row>
              );
            })}
          {this.props.album.album.photos.length === 0 &&
            <p>No photos to display.</p>
          }
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumComponent);