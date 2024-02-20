import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css'

function NavbarHeader() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Team Grizzles</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Gerrymandering Project
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
