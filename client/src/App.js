import logo from './logo.svg';
import { MapContainer, TileLayer } from "react-leaflet";
import MyNavbar from './components/NavbarHeader';
import Sidebar from './components/Sidebar';
import Map from "./components/Map.js";
import { Container, Row, Col} from 'react-bootstrap';
import './App.css'
function App() {
  return (
    <>
    <div className="navbar-container" id="navbar">
        <MyNavbar />
      </div>
      <Container fluid>
        <Row>
          <Col sm={3} md={2} className="bg-secondary sidebar">
            <Sidebar />
          </Col>
          <Col sm={9} md={10} className="main-content">
            <Map/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
