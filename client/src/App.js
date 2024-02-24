import MyNavbar from './components/NavbarHeader';
import Sidebar from './components/Sidebar';
import Map from "./components/Map.js";
import { Container, Row, Col} from 'react-bootstrap';
import './App.css'
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Chart from 'chart.js/auto';

function App() {

  const [showmodal, setModal] = useState(false);
  const [formsubmit, setSubmit] = useState(false);
  function submitted(){
    setSubmit(true);
  }
 function notsubmitted(){
  setSubmit(false);
  }
  function showmodalc(){
    setModal(true);
  }
 function hidemodal(){
  notsubmitted();
    setModal(false);
  }
  const [mapSelection, setMapSelection] = useState({
    selectedState: "",
    selectedMapType: "",
    selectedEthnicity: ""
  });
  const [chartSelection, setChartSelection] = useState({
    selectedChartType: "",
    selectedAreaType: "",
    selectedEthnicityOne: "",
    selectedEthnicityTwo: ""
  });
useEffect(() => {
  
    if(document.getElementById("barchart") !== null){
      var canvas = document.getElementById("barchart");
    if(chartSelection.selectedChartType ==="Bar Chart" && showmodal ){
      var config= {
        type: "bar",
        data :{
          labels: ['White', 'African American', 'Asian American', 'Latino'],
          datasets: [{
            label:'Number of District Representatives', 
            data:[115,54,7,2],
            backgroundColor:['lightblue',
            'pink',
            'violet',
            'lightgreen'],
            borderColor:[
              'blue',
              'red',
              'purple',
              'green'
            ],
             borderWidth:1
            }],
        }
      }
      document.getElementById("contained-modal-title-vcenter").innerHTML = "Ethnicity of District Representatives";
      var barchart = new Chart(canvas,config );
      
    }
    else if(chartSelection.selectedChartType ==="Pie Chart"){
      var config= {
        type: "pie",
        data :{
          labels: ['White', 'African American', 'American Indian','Asian American', 'Latino', 'Native Hawaiin', 'Other'],
          datasets: [{
            label:'Population By Race', 
            data:[
              5555483,
              3320513,
              50618,
              479028,
              1123457,
              7299,
              555059],
            backgroundColor:[
            'lightblue',
            'pink',
            'violet',
            'lightgreen',
            "yellow",
            "lightred", 
            "orange"
             ],
            borderColor:[
              'red',
              'blue',
              'red',
              'green', 
              "green", 
              "purple",
              "blue"

            ],
            borderWidth:2
            }],
        }
      }
     document.getElementById("contained-modal-title-vcenter").innerHTML = "Population By Race";
      var barchart = new Chart(canvas,config );
    }
    else if(chartSelection.selectedChartType ==="Pie Chart"){
      var config= {
        type: "pie",
        data :{
          labels: ['White', 'African American', 'American Indian','Asian American', 'Latino', 'Native Hawaiin', 'Other'],
          datasets: [{
            label:'Population By Race', 
            data:[
              5555483,
              3320513,
              50618,
              479028,
              1123457,
              7299,
              555059],
            backgroundColor:[
            'lightblue',
            'pink',
            'violet',
            'lightgreen',
            "yellow",
            "lightred", 
            "orange"
             ],
            borderColor:[
              'red',
              'blue',
              'red',
              'green', 
              "green", 
              "purple",
              "blue"

            ],
            borderWidth:2
            }]
        }
      }
     document.getElementById("contained-modal-title-vcenter").innerHTML = "Population By Race";
      var barchart = new Chart(canvas,config );
    }
  }}, [showmodal]);










  
  return (
    <>
    <div className="navbar-container" id="navbar">
        <MyNavbar />
      </div>
      <Container fluid>
        <Row>
          <Col sm={3} md={2} className="bg-secondary sidebar">
            <Sidebar  mapSelection={mapSelection} setMapSelection={setMapSelection} chartSelection={chartSelection} setChartSelection={setChartSelection} setModal = {showmodalc} submitted = {submitted}/>
          </Col>
          <Col sm={9} md={10} className="main-content">
            <Map state = {mapSelection} />
          </Col>
       </Row>
      </Container>
      
     {showmodal && formsubmit &&
     <Modal  size="lg" aria-labelledby="contained-modal-title-vcenter" centered
      animation={false}  show={showmodalc} onHide= {hidemodal}>
        <Modal.Header closeButton>
          <Modal.Title  id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body><canvas id ="barchart" width ="250" height = "200"></canvas></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hidemodal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>}
      
    </>
  );
}

export default App;
