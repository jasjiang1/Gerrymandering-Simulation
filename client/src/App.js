import Map from "./components/Map.js";
import MyNavbar from './components/NavbarHeader';
import WelcomePage from "./components/WelcomePage.js"
import Chart from 'chart.js/auto';
import regression from 'regression';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { renderBarCharts } from './mocks/mockChartData.js';
import { LinearScale, CategoryScale } from 'chart.js/auto';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import React, { useState, useEffect } from 'react';
import './App.css'
import TestMap from "./components/testingMap.js";
import StateTable from "./components/chartcomponents/StateTable.js"
import BarChart from "./components/chartcomponents/testingChart.js";
import DistrictTable from "./components/chartcomponents/DistrictTable.js"
import EcologicalInference from "./components/chartcomponents/EcologicalInference.js"
import GinglesGraph from "./components/chartcomponents/Gingles.js";

function App() {
  const [showmodal, setModal] = useState(false);
  const [formsubmit, setSubmit] = useState(false);
  const [isWelcomePageVisible, setIsWelcomePageVisible] = useState(true);
  const [chart, setChart] = useState(null);
  const [mapSelection, setMapSelection] = useState({
    selectedState: "",
    selectedMapType: "",
    selectedEthnicity: ""
  });
  const [chartSelection, setChartSelection] = useState({
    selectedChartType: "State Data Summary",
    selectedAreaType: "",
    selectedEthnicityOne: "",
    selectedEthnicityTwo: ""
  });

  function submitted() {
    setSubmit(true);
    if(chartSelection.selectedChartType =="" || chartSelection.selectedChartType =="State Data Summary"){
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
    const newState = {
      ...mapSelection,
      selectedState: state,
      selectedMapType: "Approved Districting Plan",
      selectedEthnicity: "Hispanic",
      center: selectedStateSettings.center,
      zoom: selectedStateSettings.zoom,
    };
    setMapSelection(newState);
    setChartSelection({
        ...chartSelection,
        selectedAreaType: "Currently Viewing State"
    });
    setIsWelcomePageVisible(false);
  };
  useEffect(() => {
    let dataentries;
    if(chart != null){
      chart.destroy()
    }
    if(chartSelection.selectedChartType === "State Data Summary."){
      setModal(false)
      return;
    }
    Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);
    if (document.getElementById("barchart") !== null && (mapSelection.selectedState !== '')) {
      let canvas = document.getElementById("barchart");
      if (chartSelection.selectedChartType === "Bar Chart" && showmodal && chartSelection.selectedAreaType === "Currently Viewing State") {
        let popdata;
        if (mapSelection.selectedState === "Georgia") {
          popdata = [5555483/10711908*100, 3320513/10711908*100, 50618/10711908*100, 479028/10711908*100, 1123457/10711908*100, 7299/10711908*100, 555059/10711908*100];
        }
        else {
          popdata = [5112280/9288994*100, 1219770/9288994*100, 51186/9288994*100, 950000/9288994*100, 2002575/9288994*100, 3533/9288994*100, 1048641/9288994*100];
        }
        if (mapSelection.selectedState === "Georgia") {
          dataentries = [115/180*100, 54/180*100, 7/180*100, 2/180*100,0/180*100,0/180*100];
          document.getElementById("charttitle").innerHTML = "% Ethnicity of District Representatives (Total: 180 Representatives) vs % Population By Race";
        }
        else if (mapSelection.selectedState === "New Jersey") {
          dataentries = [55/80*100, 14/80*100, 3/80*100, 8/80*100,0/80*100,0/80*100];
          document.getElementById("charttitle").innerHTML = "% Ethnicity of District Representatives (Total: 80 Representatives) vs % Population By Race";
        }
        let config = {
          type: "bar",
          data: {
            labels: ['White', 'African American', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
            datasets: [{
              label: 'Number of District Representatives',
              data: dataentries,
              backgroundColor: ['#15DB95' ],
              borderColor: ['#182628'],
              borderWidth: 1,
              borderRadius:5
            },{
              label: 'Population By Race',
              data: popdata,
              backgroundColor: ['#0074E1' ],
              borderColor: ['#182628'],
              borderWidth: 1,
              borderRadius:5,
            }]}
        }
        let barchart = new Chart(canvas, config);
        setChart(barchart)
      }
      else if (chartSelection.selectedChartType === "Ecological Inference" && chartSelection.selectedAreaType === "Currently Viewing State") {
        let dataentries;
        if (mapSelection.selectedState === "Georgia") {
          dataentries = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
        }
        else {
          dataentries = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
        }
        let config = {
          type: "pie",          
          plugins: [ChartDataLabels],
          data: {
            labels: ['White', 'African American', 'American Indian', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
            datasets: [{
              label: 'Population By Race',
              data: dataentries,
              backgroundColor: ['lightblue','pink','violet','lightgreen',"yellow","lightred","orange"],
              borderColor: 'red',
              borderWidth: 2}]
          },
          options: {
            scales: {},
            plugins: {tooltip:{},
              datalabels: {
                textAlign: 'center',
                backgroundColor: "lightblue",
                borderRadius: 5,
                borderColor: 'red',
                borderWidth: 1,
                font: {weight: 'bold',size: 13,},
                color: 'black',
                formatter: (value, cxt) => {
                  let data = cxt.chart.data.datasets[0].data;
                  let index = 0;
                  let sum = 0;
                  while (data[index] != null) {
                    sum += data[index];
                    index++;
                  }
                  let percent = value / sum * 100;
                  return (percent.toFixed(2) + "%");
                }
              }
            }
          }
        }
        document.getElementById("charttitle").innerHTML = "Ecological Inference";
        let piechart = new Chart(canvas, config);
        setChart(piechart)
      }
      else if (chartSelection.selectedChartType === "Box and Whiskers" && chartSelection.selectedAreaType === "Currently Viewing State") {
        let bwData;
        let bwLabel;
        if (mapSelection.selectedState === "Georgia") {//180 districts - only 40 shown - 180 too much for array
           bwData = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], [21], [22], [23], [24], [25], [26], [27], [28], [29], [30], [31], [32], [33], [34], [35], [36], [37], [38], [39], [40], [41], [42], [43], [44], [45], [46], [47], [48], [49], [50], [51], [52], [53], [54], [55], [56], [57], [58], [59], [60], [61], [62], [63], [64], [65], [66], [67], [68], [69], [70], [71], [72], [73], [74], [75], [76], [77], [78], [79], [80], [81], [82], [83], [84], [85], [86], [87], [88], [89], [90], [91], [92], [93], [94], [95], [96], [97], [98], [99], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100], [100]];
           bwLabel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180"];
        }
        else {//40 districts
          bwData = [[1,2,3],[2,3,4],[3,4,5],[4,5,6],[5,6,7],[6,7,8],[7,8,9],[8,9,10],[9,10,11],[10,11,12],[11,12,13],[12,13,14],[13,14,15],[14,15,16],[15,16,17],[16,17,18],[17,18,19],[18,19,20],[19,20,21],[20,21,22],[21,22,23],[22,23,24],[23,24,25],[24,25,26],[25,26,27],[26,27,28],[27,28,29],[28,29,30],[29,30,31],[30,31,32],[31,32,33],[32,33,34],[33,34,35],[34,35,36],[35,36,37],[36,37,38],[37,38,39],[38,39,40],[39,40,41],[40,41,42]];
          bwLabel = ["1",  "2",  "3",  "4",  "5",  "6",  "7",  "8",  "9",  "10",  "11",  "12",  "13",  "14",  "15",  "16",  "17",  "18",  "19",  "20",  "21",  "22",  "23",  "24",  "25",  "26",  "27",  "28",  "29",  "30",  "31",  "32",  "33",  "34",  "35",  "36",  "37",  "38",  "39",  "40"];
        }
        let config = {
          type: "boxplot",
          options: {
            scales: {
              y: {
                label: "% Minority Group",
                max: 100,
                title: {display: true, text: '% Minority Population'}
              },
              x: {
                label: "Indexed Districts",
                max: bwLabel.length,
                title: {display: true, text: 'Indexed Districts'}
              }
            }   
          },
          data: {
            labels: bwLabel,
            datasets: [{
              label: '% of Minority',
              borderWidth: 1,
              padding: 10,
              itemRadius: 0,
              itemStyle: 'circle',
              outlierRadius: 3,
              outlierBackgroundColor: 'red',
              data: bwData
            }]
          }
        }
        document.getElementById("charttitle").innerHTML = "MCMC Analysis ";
        let boxplot = new Chart(canvas, config);
        setChart(boxplot)
      }
      else if (chartSelection.selectedChartType === "Scatter Plot" && chartSelection.selectedAreaType === "Currently Viewing State") {
        let Dregdata;
        let Rregdata;
        let regression_D;
        let regression_R;
        let dataentriesD;
        let dataentriesR;

        if (mapSelection.selectedState === "Georgia") {
          dataentriesR=[[10,70],[20,65],[40,55],[60,20],[80,15],[90,10],[95,5]];
          dataentriesD = [[1,10],[20,25],[35,39],[40,60],[55,55],[65,75]];
          const dataD = dataentriesD;
          const dataR = dataentriesR;
          regression_D = regression.polynomial(dataD);
          regression_R = regression.polynomial(dataR);
          Dregdata = regression_D.points.map(([x, y]) => {return {x,y};});
          Rregdata = regression_R.points.map(([x, y]) => {return {x,y};});
        }
        else {
          dataentriesR=[[10,70],[20,65],[40,55],[60,20],[80,15],[90,10],[95,5]];
          dataentriesD = [[1,10],[20,25],[35,39],[40,60],[55,55],[65,75]];
          const dataD =dataentriesD;
          const dataR = dataentriesR;
          regression_D = regression.polynomial(dataD);
          regression_R = regression.polynomial(dataR);
          Dregdata = regression_D.points.map(([x, y]) => {return {x,y};})
          Rregdata = regression_R.points.map(([x, y]) => {return {x,y};})
        }
        let config = {
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
            }, {
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
            }]
          },
          options: {
            plugins:{legend:{labels:{filter: label => label.text != "line"}}},
            scales: {
              y: {max: 100, title: {display: true,text: '% Vote Share'}},
              x: {max: 100, title: {display: true,text: '% Minority Population'}}
            } 
          }
        }
        document.getElementById("charttitle").innerHTML = "Precinct Analysis";
        let boxplot = new Chart(canvas, config);
        setChart(boxplot)
      } else if (chartSelection.selectedChartType === "Bar Chart" && chartSelection.selectedAreaType === "State Vs. State") {
        const [barchart, secondBarchart] = renderBarCharts({ mapSelection, chartSelection, showmodal });
      } else if (chartSelection.selectedChartType === "Pie Chart" && chartSelection.selectedAreaType === "State Vs. State") {
        const [barchart, secondBarchart] = renderBarCharts({ mapSelection, chartSelection, showmodal });
      } else if (chartSelection.selectedChartType === "Box and Whiskers" && chartSelection.selectedAreaType === "State Vs. State") {
        const [barchart, secondBarchart] = renderBarCharts({ mapSelection, chartSelection, showmodal });
      } 
    }
  }, [mapSelection, chartSelection, showmodal]);

    function renderChart(){
      switch(chartSelection.selectedChartType){
        case 'Bar Chart':
          return <BarChart mapSelection={mapSelection} chartSelection={chartSelection}/>
        case 'State Data Summary':
          return <StateTable mapSelection={mapSelection}/>
        case 'State Assembly Table':
          return <DistrictTable mapSelection={mapSelection}/>
        case 'Ecological Inference':
          return <EcologicalInference mapSelection={mapSelection} chartSelection={chartSelection}/>
        case 'Gingles Plot':
          return <GinglesGraph mapSelection={mapSelection}/>
      }
    }


  return (
    <>
    {isWelcomePageVisible ? (<WelcomePage onStateSelected={handleSelectState}/>) : 
      (
        <>
        <div className="navbar-container" id="navbar">
          <MyNavbar
              mapSelection={mapSelection} 
              setMapSelection={setMapSelection} 
              chartSelection={chartSelection} 
              setChartSelection={setChartSelection} 
              submitted={() => submitted()}
            />
        <div className="main-container">
          <div className="left-container">
            <TestMap mapSelection={mapSelection} chartSelection={chartSelection}/>
          </div>
          <div className="right-container">
            {renderChart()}
          </div>
        </div>
        </div>
      </>
     )}
    </>
  );
}

export default App;