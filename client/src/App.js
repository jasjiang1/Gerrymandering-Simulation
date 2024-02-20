import logo from './logo.svg';
import { MapContainer, TileLayer } from "react-leaflet";
import MyNavbar from './components/NavbarHeader';
import Sidebar from './components/Sidebar';
import Map from "./components/Map.js";
import './App.css'
function App() {
  return (
    <>
    <div classname="navbar-container" id="navbar">
      <MyNavbar/>
    </div>
    <div classname="float" id="sidebar">
      <Sidebar/>
      <Map/>
    </div>

    

   
    </>
  );
}

export default App;
