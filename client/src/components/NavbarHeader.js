import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './grizzlies.png'

function NavbarHeader() {
  return (
    <Navbar bg="secondary" data-bs-theme="dark">
      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Navbar.Brand className="custom-text">Team Grizzles</Navbar.Brand>
          <img src={logo} alt="logo" style={{ maxWidth: '50px', marginTop: '-25px', marginLeft: '-20px' }} />
        </div>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="custom-text">
            Gerrymandering Project
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;
