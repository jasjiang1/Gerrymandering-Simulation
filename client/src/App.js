import logo from './logo.svg';
import { MapContainer, TileLayer } from "react-leaflet";
import MyNavbar from './components/NavbarHeader';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <>
    <div classname="navbar-container" id="navbar">
      <MyNavbar/>
    </div>
    <div classname="sidebar-container" id="sidebar">
      <Sidebar/>
    </div>
      <MapContainer center = {[50.0000, 2.0000]} zoom = {13}>
      </MapContainer>
    </>
  );
}

export default App;
