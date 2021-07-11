import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, fetchAlbums } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    albums: state.albums,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  fetchAlbums: () => fetchAlbums()
};

class AlbumsComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();
    this.props.clearRedirect();
    this.props.fetchAlbums();
  }

  render() {
    return (
      <Container>
        {this.props.alert.message.length > 0 &&
          <Alert color={this.props.alert.status}>
            {this.props.alert.message}
          </Alert>
        }
        <h3 className="text-center text-md-left">Albums</h3>
        {this.props.albums.albums.map((row, index) => {
          return (
            <Row key={index}>
              {row.map(r => {
                return (
                  <Col md={4} key={r.id} className="mb-4">
                    <Link to={`/albums/${r.id}`}>
                      <img src={`http://www.local-photoshow-api.com/public/storage/album_covers/${r.cover_image}`} className="img-thumbnail img-fluid img-album" alt={r.name} />
                    </Link>
                    <h5 className="text-center text-md-left">{r.name}</h5>
                  </Col>
                )
              })}
            </Row>
          );
        })}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsComponent);