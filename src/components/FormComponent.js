import React, { Component } from 'react';
import {
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button
} from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearInput, setInput, clearErrors, postAlbum, postPhoto } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    input: state.input,
    errors: state.errors,
    redirect: state.redirect
  };
};

const mapDispatchToProps = {
  clearInput: () => clearInput(),
  setInput: e => setInput(e),
  clearErrors: () => clearErrors(),
  postAlbum: (name, description, file, cb, refs) => postAlbum(name, description, file, cb, refs),
  postPhoto: (title, description, file, albumId, cb, refs) => postPhoto(title, description, file, albumId, cb, refs)
};

class FormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null
    }
  }

  componentDidMount = () => {
    this.props.clearInput();
    this.props.clearErrors();
  }

  clearImageFile = () => {
    this.setState({ imageFile: null });
  }

  handleImageFile = e => {
    this.setState({ imageFile: e.target.files[0] });
  }

  handleInput = e => {
    this.props.setInput(e);
  }

  handleClick = () => {
    const refs = {
      text: this.textInput,
      description: this.descriptionInput,
      file: this.fileInput
    };

    const albumId = this.props.match.params.albumId;

    if (albumId) {
      this.props.postPhoto(this.props.input.text, this.props.input.description, this.state.imageFile, albumId, this.clearImageFile, refs);
    }
    else {
      this.props.postAlbum(this.props.input.text, this.props.input.description, this.state.imageFile, this.clearImageFile, refs);
    }
  }

  render() {
    if (this.props.redirect.url) {
      return <Redirect to={this.props.redirect.url} />;
    }
    else {
      return (
        <Container>
          <h3>{this.props.title}</h3>

          <Form>
            <FormGroup>
              <Label for="text">{this.props.text}</Label>
              <Input type="text" name="text" id="text" placeholder={`Enter ${this.props.text.toLowerCase()}`} ref={el => (this.textInput = el)} invalid={this.props.errors.errors.hasOwnProperty('text')} onChange={e => this.handleInput(e)} value={this.props.input.text} />
              <FormFeedback>
                {this.props.errors.errors.hasOwnProperty('text') ? this.props.errors.errors.text[0] : ''}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" placeholder="Enter description" ref={el => (this.descriptionInput = el)} invalid={this.props.errors.errors.hasOwnProperty('description')} onChange={e => this.handleInput(e)} value={this.props.input.description} />
              <FormFeedback>
                {this.props.errors.errors.hasOwnProperty('description') ? this.props.errors.errors.description[0] : ''}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="file">{this.props.file}</Label>
              <Input type="file" name="file" id="file" ref={el => (this.fileInput = el)} invalid={this.props.errors.errors.hasOwnProperty('file')} onChange={e => this.handleImageFile(e)} className="form-control" />
              <FormFeedback>
                {this.props.errors.errors.hasOwnProperty('file') ? this.props.errors.errors.file[0] : ''}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Button color="primary" onClick={() => this.handleClick()}>SUBMIT</Button>
            </FormGroup>
          </Form>
        </Container>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComponent));