import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAlert, clearRedirect, fetchPhoto, deletePhoto } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    alert: state.alert,
    photo: state.photo,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearAlert: () => clearAlert(),
  clearRedirect: () => clearRedirect(),
  fetchPhoto: photoId => fetchPhoto(photoId),
  deletePhoto: (photoId, albumId) => deletePhoto(photoId, albumId)
};

class PhotoComponent extends Component {
  componentDidMount() {
    this.props.clearAlert();
    this.props.clearRedirect();

    const photoId = this.props.match.params.photoId;

    if (photoId) {
      this.props.fetchPhoto(photoId);
    }
  }

  handleDelete = () => {
    let del = window.confirm(`You have chosen to delete photo ${this.props.photo.photo.title}. Click 'Confirm' to proceed or 'Cancel' to abort.`);

    if (del) {
      this.props.deletePhoto(this.props.photo.photo.id, this.props.photo.photo.album_id);
    }
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          <Row>
            <Col>
              <h3>{this.props.photo.photo.title}</h3>
              <p>{this.props.photo.photo.description}</p>
              <Link to={`/albums/${this.props.photo.photo.album_id}`} className='btn btn-light btn-light-border mb-3'>Go Back</Link>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6}>
              {this.props.photo.photo.photo.length > 0 &&
                <img src={`http://www.local-photoshow-api.com/public/storage/photos/${this.props.photo.photo.album_id}/${this.props.photo.photo.photo}`} className="img-thumbnail img-fluid" alt={this.props.photo.photo.title} />
              }
            </Col>
            <Col xs={12} sm={6}>
              <Button color="secondary" className="my-3 mt-sm-0" onClick={() => this.handleDelete()}>Delete Photo</Button>
              <p>Size: {this.props.photo.photo.size}</p>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoComponent);