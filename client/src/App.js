import MyNavbar from './components/NavbarHeader';
import WelcomePage from "./components/WelcomePage.js"
import React, { useState, useEffect } from 'react';
import './App.css'
import TestMap from "./components/Map/Map.js";
import StateTable from "./components/chartcomponents/StateTable.js"
import BarChart from "./components/chartcomponents/BarChart.js";
import DistrictTable from "./components/chartcomponents/DistrictTable.js"
import EcologicalInference from "./components/chartcomponents/EcologicalInference.js"
import GinglesGraph from "./components/chartcomponents/Gingles.js";

function App() {
  const [isWelcomePageVisible, setIsWelcomePageVisible] = useState(true);
  const [highlightDistrict,setLayerHighlight] = useState("");
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
          return <BarChart mapSelection={mapSelection} chartSelection={chartSelection}/>
        case 'State Data Summary':
          return <StateTable mapSelection={mapSelection}/>
        case 'State Assembly Table':
          return <DistrictTable mapSelection={mapSelection} setlayerhighlight = {setLayerHighlight}/>
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
            />
        <div className="main-container">
          <div className="left-container">
            <TestMap mapSelection={mapSelection} chartSelection={chartSelection} highlightDistrict = {highlightDistrict} setHighlight ={setLayerHighlight}/>
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