import MyNavbar from './components/NavbarHeader';
import WelcomePage from "./components/WelcomePage.js"
import React, { useState, useEffect } from 'react';
import './App.css'
import TestMap from "./components/Map/Map.js";
import StateTable from "./components/chartcomponents/StateTable.js"
import BarChart from "./components/chartcomponents/BarChart.js";
import DistrictTable from "./components/chartcomponents/DistrictTableWithFilter.js"
import ComparisonDistrict from "./components/chartcomponents/ComparisonDistrict.js"
import EcologicalInference from "./components/chartcomponents/EcologicalInference.js"
import GinglesGraph from "./components/chartcomponents/Gingles.js";
import ComparisonNavBar from './components/StatevsStateNav.js';
import BWGraph from './components/chartcomponents/BoxAndWhiskers.js'
import DRGraph from './components/chartcomponents/DemRepBar.js';
import EnsembleOpportunityGraph from './components/chartcomponents/Ensemble_Opportunity_Bar.js'
import VoteSeatShare from './components/chartcomponents/VoteSeatShare.js'

function App() {
  const [isWelcomePageVisible, setIsWelcomePageVisible] = useState(true);
  const [highlightDistrict,setLayerHighlight] = useState("");
  const [statevstate, setComparison] = useState(false);
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

  const [firstMapSelection, setFirstMapSelection] = useState({
    selectedState: "",
    selectedMapType: "",
    selectedEthnicity: ""
  });
  const [firstChartSelection, setFirstChartSelection] = useState({
    selectedChartType: "",
    selectedAreaType: "",
    selectedEthnicityOne: "",
    selectedEthnicityTwo: ""
  });
  const [secondMapSelection, setSecondMapSelection] = useState({
    selectedState: "",
    selectedMapType: "",
    selectedEthnicity: ""
  });
  const [secondChartSelection, setSecondChartSelection] = useState({
    selectedChartType: "",
    selectedAreaType: "",
    selectedEthnicityOne: "",
    selectedEthnicityTwo: ""
  });

  const handleSelectState = (state) => {
    const stateSettings = {
      'Georgia': { center: [32.5, -82.3], zoom: 6.5 },
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

  function renderChart(){
      switch(chartSelection.selectedChartType){
        case 'Bar Chart':
          return <BarChart mapSelection={mapSelection} chartSelection={chartSelection} comparison={statevstate}/>
        case 'State Data Summary':
          return <StateTable mapSelection={mapSelection}/>
        case 'State Assembly Table':
          return <DistrictTable mapSelection={mapSelection} setlayerhighlight = {setLayerHighlight}/>
        case 'Ecological Inference':
          return <EcologicalInference mapSelection={mapSelection} chartSelection={chartSelection}/>
        case 'Gingles Plot':
          return <GinglesGraph mapSelection={mapSelection}/>
        case 'Box and Whiskers':
          return <BWGraph mapSelection={mapSelection}/>
        case 'Dem Rep Splits':
          return <DRGraph mapSelection={mapSelection}/>
        case 'Ensemble Opportunity Districts':
          return <EnsembleOpportunityGraph mapSelection={mapSelection} chartSelection={chartSelection} comparison={statevstate}></EnsembleOpportunityGraph>
        case 'Vote Seat Share Curve':
          return <VoteSeatShare mapSelection={mapSelection}/>
      }
    }
    function firstRenderChart(){

      switch(firstChartSelection.selectedChartType){
        case 'Bar Chart':
          return <BarChart mapSelection={firstMapSelection} chartSelection={firstChartSelection} comparison={statevstate}/>
        case 'State Data Summary':
          return <StateTable mapSelection={firstMapSelection}/>
        case 'State Assembly Table':
          return <DistrictTable mapSelection={firstMapSelection} comparison={statevstate}/>
        case 'Ecological Inference':
          return <EcologicalInference mapSelection={firstMapSelection} chartSelection={firstChartSelection} comparison={statevstate}/>
        case 'Gingles Plot':
          return <GinglesGraph mapSelection={firstMapSelection}/>
        case 'Box and Whiskers':
          return <BWGraph mapSelection={firstMapSelection}/>
        case 'Dem Rep Splits':
          return <DRGraph mapSelection={firstMapSelection}/>
        case 'Ensemble Opportunity Districts':
          return <EnsembleOpportunityGraph mapSelection={firstMapSelection} chartSelection={firstChartSelection} comparison={statevstate}></EnsembleOpportunityGraph>
        case 'Vote Seat Share Curve':
          return <VoteSeatShare mapSelection={firstMapSelection}/>
      }
    }
    function secondRenderChart(){
      switch(secondChartSelection.selectedChartType){
        case 'Bar Chart':
          return <BarChart mapSelection={secondMapSelection} chartSelection={secondChartSelection} comparison={statevstate}/>
        case 'State Data Summary':
          return <StateTable mapSelection={secondMapSelection}/>
        case 'State Assembly Table':
          return <DistrictTable mapSelection={secondMapSelection} comparison={statevstate}/>
        case 'Ecological Inference':
          return <EcologicalInference mapSelection={secondMapSelection} chartSelection={secondChartSelection}/>
        case 'Gingles Plot':
          return <GinglesGraph mapSelection={secondMapSelection} />
        case 'Box and Whiskers':
          return <BWGraph mapSelection={secondMapSelection} />
        case 'Dem Rep Splits':
          return <DRGraph mapSelection={secondMapSelection}/>
          case 'Ensemble Opportunity Districts':
            return <EnsembleOpportunityGraph mapSelection={secondMapSelection} chartSelection={secondChartSelection} comparison={statevstate}></EnsembleOpportunityGraph>
      }
    }


  return (
      <>
      {isWelcomePageVisible ? (<WelcomePage onStateSelected={handleSelectState}/>) : 
        (
          <>
          <div className="navbar-container" id="navbar">
           {!statevstate && <MyNavbar
                mapSelection={mapSelection} 
                setMapSelection={setMapSelection} 
                chartSelection={chartSelection} 
                setChartSelection={setChartSelection} 
                setComparison = {setComparison}
                comparison={statevstate}
              />}
              
            {statevstate && <ComparisonNavBar

                mapSelection={firstMapSelection} 
                setMapSelection={setFirstMapSelection} 
                chartSelection={firstChartSelection} 
                setChartSelection={setFirstChartSelection} 

                secondMapSelection={secondMapSelection} 
                setSecondMapSelection={setSecondMapSelection} 
                secondChartSelection={secondChartSelection} 
                setSecondChartSelection={setSecondChartSelection} 
                setComparison = {setComparison}
              />}
  
          <div className="main-container">
            <div className="left-container" id ="leftContainer">
              {!statevstate && <TestMap mapSelection={mapSelection} chartSelection={chartSelection} highlightDistrict = {highlightDistrict} setHighlight ={setLayerHighlight}/>}
              {statevstate && firstRenderChart()}
            </div>
            <div className="right-container" id = "rightContainer">
              {!statevstate && renderChart()}
              {statevstate && secondRenderChart() }
            </div>
          </div>
          </div>
        </>
       )}
      </>
    );
}

export default App;