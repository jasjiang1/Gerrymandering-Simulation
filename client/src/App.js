import MyNavbar from './components/NavbarHeader';
import Sidebar from './components/Sidebar';
import Map from "./components/Map.js";
import { Container, Row, Col} from 'react-bootstrap';
import './App.css'
import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Chart from 'chart.js/auto';
import {  LinearScale, CategoryScale } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
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
<<<<<<< HEAD
    if(document.getElementById("barchart") !== null){
=======
   var dataentries;
   Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);
    if(document.getElementById("barchart") !== null && (mapSelection.selectedState != '')){
>>>>>>> e8dbc0acd95b99102a5b0051bddb487c7d22dcd7
      var canvas = document.getElementById("barchart");
    if(chartSelection.selectedChartType ==="Bar Chart" && showmodal ){
      if(mapSelection.selectedState === "Georgia"){
       dataentries = [115,54,7,2];
      }
      else if(mapSelection.selectedState === "New Jersey"){
        dataentries = [55, 14,3,8];
      }
      var config= {
        type: "bar",
        data :{
          labels: ['White', 'African American', 'Asian American', 'Latino'],
          datasets: [{
            label:'Number of District Representatives', 
            data:dataentries,
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

      var dataentries;
      if(mapSelection.selectedState === "Georgia"){
       dataentries = [5555483,3320513,50618,479028,1123457,7299,555059];
      }
      else{
        dataentries = [5112280,1219770, 51186,950000,2002575,3533,1048641];
      }
      var config= {
        type: "pie",
        data :{
          labels: ['White', 'African American', 'American Indian','Asian American', 'Latino', 'Native Hawaiin', 'Other'],
          datasets: [{
            label:'Population By Race', 
            data:dataentries,
            backgroundColor:[
            'lightblue',
            'pink',
            'violet',
            'lightgreen',
            "yellow",
            "lightred", 
            "orange"
             ],
            borderColor: 'red',
            borderWidth:2
            }],
        },
        options:{
          scales:{
          },
          plugins:{
            tooltip:{
            },
            datalabels:{
              textAlign: 'center',
              backgroundColor: "lightblue",
              borderRadius: 5,
              borderColor:'red',
              borderWidth:1,
              font: {
                weight: 'bold',
                size: 13,
              },
              color: 'black',
              formatter:(value,cxt )=>{
               var data =  cxt.chart.data.datasets[0].data;
               var index = 0;
               var sum = 0;
               while(data[index] != null){
                sum += data[index];
                index++;
               }
               var percent = value/sum *100;
                return (percent.toFixed(2) + "%");
              }
            }
          }

        }, 
        plugins:[ChartDataLabels]
       
        
      }
     document.getElementById("contained-modal-title-vcenter").innerHTML = "Population By Race";
      var piechart = new Chart(canvas,config );
    }
    else if(chartSelection.selectedChartType ==="Box and Whiskers"){
      var dataentries;
      if(mapSelection.selectedState === "Georgia"){
       dataentries = [5555483,3320513,50618,479028,1123457,7299,555059];
      }
      else{
        dataentries = [5112280,1219770, 51186,950000,2002575,3533,1048641];
      }
      var config= {
        type: "boxplot",
        data :{
          labels: ['District 1', 'District 2', 'District 3','District 4', 'District 5', 'District 6', 'District 7'],
          datasets: [{
            label:'% of Minority', 
            backgroundColor:[
              'lightblue',
              '#b2eee6',
              '#8ad6cc',
              '#66beb2',
              "#f97171",
              "#f99192", 
              "pink"
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
    borderWidth: 1,
    padding: 10,
    itemRadius: 0,
    itemStyle: 'circle',
    outlierRadius:3,
    outlierBackgroundColor: 'red',
            data:[
             [.5,.6,.33,.40,.20],
             [.16,.20,.3,.46,.10],
             [.10,.28,.33,.40,.10],
             [.30,.25,.3,.42,.15],
             [.10,.42,.35,.45,.10],
             [.15,.22,.3,.46,.10],
             [.15,.29,.34,.41,.10]
    ]
  }]
        }
      }
     document.getElementById("contained-modal-title-vcenter").innerHTML = "MCMC Analysis";
      var boxplot = new Chart(canvas,config );
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
            <Map mapSelection={mapSelection} />
          </Col>
       </Row>
      </Container>
      
     {showmodal && formsubmit &&
     <Modal  size="lg" aria-labelledby="contained-modal-title-vcenter" centered
      animation={false}  show={showmodalc} onHide= {hidemodal}>
        <Modal.Header closeButton>
          <Modal.Title  id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        {console.log(mapSelection.selectedState)}
        {console.log(chartSelection.selectedChartType)}
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
