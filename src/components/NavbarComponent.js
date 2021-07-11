import React from 'react';
import {
  Container,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';
import { Link, NavLink as NavLinkRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/actionCreators';

const mapStateToProps = state => {
  return {
    navbar: state.navbar
  };
};

const mapDispatchToProps = {
  toggleNavigation: () => toggleNavigation()
};

const NavbarComponent = (props) => {
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">Photo Show</NavbarBrand>
        <NavbarToggler onClick={() => props.toggleNavigation()} />
        <Collapse isOpen={props.navbar.navOpen} navbar>
          <Nav navbar>
            {[
              { title: 'Home', url: '/' },
              { title: 'Create Album', url: '/albums/create' }
            ].map((item, index) => {
              return (
                <NavItem key={index}>
                  <NavLinkRouter exact to={item.url} className="nav-link">
                    {item.title}
                  </NavLinkRouter>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);