import MyNavbar from './components/NavbarHeader';
import Map from "./components/Map.js";
import WelcomePage from "./components/WelcomePage.js"
import { Container, Row, Col} from 'react-bootstrap';
import './App.css'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Chart from 'chart.js/auto';
import { LinearScale, CategoryScale } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import regression from 'regression';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
function App() {
  const [showmodal, setModal] = useState(false);
  const [formsubmit, setSubmit] = useState(false);
  const [isWelcomePageVisible, setIsWelcomePageVisible] = useState(true);
  function submitted(){
    setSubmit(true);
    console.log("Submitted: "+ (chartSelection.selectedChartType ==""));
    if(chartSelection.selectedChartType =="" || chartSelection.selectedChartType =="Choose..."  ){
      return;
    }
    else{
      showmodalc();
    }
  }
  function notsubmitted() {
    setSubmit(false);
  }
  function showmodalc() {
    setModal(true);
  }
  function hidemodal() {
    notsubmitted();
    setModal(false);
  }

  const handleSelectState = (state) => {
    const stateSettings = {
      'Georgia': { center: [32.5, -82.3], zoom: 6.5 }, //32.7, -83.4
      'New Jersey': { center: [40.1, -74.7], zoom: 7.5 },
    };

    const selectedStateSettings = stateSettings[state];

    setMapSelection({
      ...mapSelection,
      selectedState: state,
      selectedMapType: "State",
      selectedEthnicity: "Hispanic",
      center: selectedStateSettings.center,
      zoom: selectedStateSettings.zoom,
    });
    setChartSelection({
      ...chartSelection,
      selectedAreaType: "Currently Viewing State"
    })
  
    setIsWelcomePageVisible(false);
  };

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
  console.log(mapSelection)
  useEffect(() => {
    var dataentries;
    Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);
    if (document.getElementById("barchart") !== null && (mapSelection.selectedState !== '')) {
      var canvas = document.getElementById("barchart");
      if (chartSelection.selectedChartType === "Bar Chart" && showmodal) {
        if (mapSelection.selectedState === "Georgia") {
          dataentries = [115, 54, 7, 2];
          document.getElementById("contained-modal-title-vcenter").innerHTML = "Ethnicity of District Representatives (Total: 180 Respresentatives)";
        }
        else if (mapSelection.selectedState === "New Jersey") {
          dataentries = [55, 14, 3, 8];
          document.getElementById("contained-modal-title-vcenter").innerHTML = "Ethnicity of District Representatives (Total: 80 Respresentatives)";
        }
        var config = {
          type: "bar",
          data: {
            labels: ['White', 'African American', 'Asian American', 'Latino'],
            datasets: [{
              label: 'Number of District Representatives',
              data: dataentries,
              backgroundColor: ['lightblue',
                'pink',
                'violet',
                'lightgreen'],
              borderColor: [
                'blue',
                'red',
                'purple',
                'green'
              ],
              borderWidth: 1
            }],
          }
        }

        var barchart = new Chart(canvas, config);

      }
      else if (chartSelection.selectedChartType === "Pie Chart") {
        var dataentries;
        if (mapSelection.selectedState === "Georgia") {
          dataentries = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
        }
        else {
          dataentries = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
        }
        var config = {
          type: "pie",
          data: {
            labels: ['White', 'African American', 'American Indian', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
            datasets: [{
              label: 'Population By Race',
              data: dataentries,
              backgroundColor: [
                'lightblue',
                'pink',
                'violet',
                'lightgreen',
                "yellow",
                "lightred",
                "orange"
              ],
              borderColor: 'red',
              borderWidth: 2
            }],
          },
          options: {
            scales: {
            },
            plugins: {
              tooltip: {
              },
              datalabels: {
                textAlign: 'center',
                backgroundColor: "lightblue",
                borderRadius: 5,
                borderColor: 'red',
                borderWidth: 1,
                font: {
                  weight: 'bold',
                  size: 13,
                },
                color: 'black',
                formatter: (value, cxt) => {
                  var data = cxt.chart.data.datasets[0].data;
                  var index = 0;
                  var sum = 0;
                  while (data[index] != null) {
                    sum += data[index];
                    index++;
                  }
                  var percent = value / sum * 100;
                  return (percent.toFixed(2) + "%");
                }
              }
            }

          },
          plugins: [ChartDataLabels]
        }
        document.getElementById("contained-modal-title-vcenter").innerHTML = "Population By Race";
        var piechart = new Chart(canvas, config);
      }
      else if (chartSelection.selectedChartType === "Box and Whiskers") {
        var dataentries;
        if (mapSelection.selectedState === "Georgia") {
          dataentries = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
        }
        else {
          dataentries = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
        }
        var config = {
          type: "boxplot",
          options: {
              scales: {
                y: {
                  label: "% Minority Group",
                  max: 100,
                  title: {
                    display: true,
                    text: '% Minority Population'
                  }
                },
              } 
                  
            },
          data: {
            labels: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7'],
            datasets: [{
              label: '% of Minority',
              backgroundColor: [
                'lightblue',
                '#b2eee6',
                '#8ad6cc',
                '#66beb2',
                "#f97171",
                "#f99192",
                "pink"
              ],
              borderColor: [
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
              outlierRadius: 3,
              outlierBackgroundColor: 'red',
              data: [
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
                [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
                [7, 14, 21, 28, 35, 42, 49, 56, 63, 70]
              ]
            }]
          }
        }
        document.getElementById("contained-modal-title-vcenter").innerHTML = "%Vote Share of Minority ";
        var boxplot = new Chart(canvas, config);
      }
      else if (chartSelection.selectedChartType === "Scatter Plot") {
        var Dregdata;
        var Rregdata;
        var regression_D;
        var regression_R;
        var dataentriesD;
        var dataentriesR;

        if (mapSelection.selectedState === "Georgia") {
          dataentriesR=[
            [10,70],
            [20,65],
            [40,55],
            [60,20],
            [80,15],
            [90,10],
            [95,5]
         ];
         dataentriesD = [[1, 10],
          [20, 25],
          [35, 39],
          [40, 60],
          [55, 55],
          [65, 75]
        ];
          const dataD = dataentriesD;
          const  dataR = dataentriesR;
          regression_D = regression.polynomial(dataD);
          regression_R = regression.polynomial(dataR);
          Dregdata = regression_D.points.map(([x, y]) => {return {x,y};});
          Rregdata = regression_R.points.map(([x, y]) => { return {x,y};});
          console.log(regression_D);
          console.log(regression_R);
        }
        else {
          dataentriesR=[
            [10,70],
            [20,65],
            [40,55],
            [60,20],
            [80,15],
            [90,10],
            [95,5]
         ];
         dataentriesD = [[1, 10],
          [20, 25],
          [35, 39],
          [40, 60],
          [55, 55],
          [65, 75]
        ];
          const dataD =dataentriesD;
          const  dataR = dataentriesR;
          regression_D = regression.polynomial(dataD);
          regression_R = regression.polynomial(dataR);
          Dregdata = regression_D.points.map(([x, y]) => {return {x,y};})
          Rregdata = regression_R.points.map(([x, y]) => { return {x,y};})

          console.log(dataD);
          console.log(dataR);
        }
        var config = {
          type: "scatter",
          data: {
            datasets: 
            [{
              label: 'Democratic',
              backgroundColor: 'blue',
              data: dataentriesD,
              type: 'scatter',
            }, {
              label: 'Republican',
              backgroundColor: 'red',
              data: dataentriesR,
              type: 'scatter'
            },
            {
              label:"line",
              data: Dregdata,
              type: 'line',
              borderWidth:1,
              borderColor: 'lightblue'
            }, {
              label:"line",
              data: Rregdata,
              type: 'line',
              borderWidth:1,
              borderColor: 'pink',
            }
          ]
          },
          options: {
            plugins:{
              legend:{
                labels:{
                  filter: label => label.text != "line"
                }
              }
            },
            scales: {
              y: {
                max: 100,
                title: {
                  display: true,
                  text: '% Vote Share'
                }
              },
              x: {
                max: 100,
                title: {
                  display: true,
                  text: '% Minority Population'
                }
              }
            } 
                
          }
          
        }
        document.getElementById("contained-modal-title-vcenter").innerHTML = "Precinct Analysis";
        var boxplot = new Chart(canvas, config);
      }

    }
  }, [showmodal]);
  return (
    <>
    {isWelcomePageVisible ? (
        <WelcomePage onStateSelected={handleSelectState} />
      ) : (
        <>
        <div className="navbar-container" id="navbar">
        <MyNavbar
            mapSelection={mapSelection} 
            setMapSelection={setMapSelection} 
            chartSelection={chartSelection} 
            setChartSelection={setChartSelection} 
            submitted={() => submitted()}
          />
          <Map mapSelection={mapSelection} />
          </div>
      {/* <div className="navbar-container" id="navbar">
          <MyNavbar />
        </div>
        <Container fluid>
          <Row>
            <Col sm={3} md={2} className="bg-secondary sidebar">
              <Sidebar  mapSelection={mapSelection} setMapSelection={setMapSelection} chartSelection={chartSelection} setChartSelection={setChartSelection} submitted = {submitted}/>
            </Col>
            <Col sm={9} md={10} className="main-content">
              <Map mapSelection={mapSelection} />
            </Col>
        </Row>
        </Container> */}
        
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
     )}
    </>
  );
}

export default App;