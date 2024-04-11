import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function MainNav() {

  return (
    <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-dark bg-primary">
      <Container>
      <Navbar.Brand href="/">My Restaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Menu" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Breakfest</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Lunch</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Dinner</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Locations" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Scarborough</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Toronto</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Markham</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">North York</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#action/3.1">About Us</Nav.Link>
          </Nav>
          <br />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
