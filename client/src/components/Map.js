import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NewJerseyCounties from '../mocks/NewJerseyCounties.json';
import GeorgiaCounties from '../mocks/GeorgiaCounties.json';
import GeorgiaState from '../mocks/GeorgiaState.json';
import NewJerseyState from '../mocks/NewJerseyState.json';//trying to replace with server
import GeorgiaApproved from '../mocks/GeorgiaApproved.json'; 
import NewJerseyApproved from '../mocks/NewJerseyApproved.json';
import legend from '../mocks/MockLegend.jpg'

import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

function Map({ mapSelection }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mockHeatMap = {
    approvedGeorgiaWhite: [0.5,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.7,0.9,0.9,0.7,0.9,0.9,0.9,0.7,0.3,0.5,0.9,0.9,0.9,0.7,0.5,0.7,0.5,0.9,0.9,0.7,0.5,0.9,0.5,0.9,0.9,0.7,0.9,0.7,0.7,0.9,0.7,0.9,0.7,0.9,0.9,0.9,0.7,0.9,0.9,0.7,0.3,0.9,0.9,0.9,0.5,0.9,0.9,0.9,0.9,0.5,0.9,0.9,0.3,0.9,0.3,0.9,0.9,0.9,0.5,0.9,0.5,0.9,0.7,0.9,0.5,0.9,0.5,0.7,0.5,0.9,0.5,0.7,0.5,0.3,0.3,0.9,0.7,0.5,0.9,0.5,0.9,0.9,0.5,0.7,0.7,0.5,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.5,0.7,0.5,0.9,0.7,0.9,0.3,0.5,0.9,0.9,0.5,0.9,0.9,0.7,0.9,0.9,0.9,0.5,0.3,0.9,0.9,0.9,0.7,0.3,0.9,0.5,0.9,0.9,0.7,0.9,0.9,0.5,0.5,0.9,0.7,0.5,0.9,0.9,0.7,0.9,0.5,0.7,0.9,0.5,0.7,0.9,0.7,0.7,0.5,0.9,0.9,0.3,0.9,0.9,0.3,0.5,0.9,0.9,0.9,0.7,0.3,0.9,0.9,0.9,0.7,0.5,0.7,0.9,0.9,0.5,0.9,0.7,0.9,0.9,0.9,0.9,0.9,0.9],
    approvedGeorgiaBlack: [0.7,0.5,0.3,0.3,0.9,0.9,0.3,0.3,0.3,0.9,0.5,0.9,0.9,0.5,0.3,0.5,0.3,0.9,0.9,0.9,0.3,0.3,0.3,0.9,0.9,0.5,0.3,0.3,0.3,0.5,0.3,0.5,0.9,0.3,0.9,0.7,0.5,0.7,0.3,0.9,0.3,0.9,0.5,0.9,0.3,0.3,0.9,0.3,0.3,0.7,0.7,0.7,0.7,0.9,0.9,0.5,0.3,0.3,0.7,0.9,0.7,0.7,0.7,0.3,0.3,0.7,0.7,0.9,0.7,0.3,0.9,0.7,0.3,0.3,0.3,0.3,0.9,0.3,0.3,0.9,0.7,0.9,0.3,0.5,0.9,0.7,0.3,0.9,0.3,0.7,0.3,0.9,0.3,0.9,0.5,0.9,0.3,0.7,0.9,0.9,0.3,0.3,0.3,0.3,0.5,0.7,0.9,0.7,0.3,0.9,0.7,0.9,0.3,0.9,0.9,0.9,0.9,0.3,0.9,0.3,0.5,0.3,0.9,0.3,0.3,0.9,0.5,0.9,0.3,0.3,0.9,0.5,0.9,0.7,0.9,0.7,0.7,0.3,0.5,0.9,0.5,0.5,0.5,0.5,0.9,0.3,0.9,0.5,0.9,0.9,0.3,0.9,0.9,0.9,0.5,0.3,0.9,0.3,0.9,0.9,0.3,0.5,0.9,0.5,0.5,0.5,0.7,0.5,0.5,0.9,0.7,0.7,0.3,0.9,0.3,0.7,0.9,0.5,0.7,0.3],
    approvedGeorgiaAsian: [0.3,0.3,0.3,0.3,0.5,0.3,0.9,0.7,0.3,0.3,0.3,0.3,0.5,0.3,0.3,0.5,0.5,0.3,0.3,0.3,0.3,0.5,0.3,0.9,0.5,0.5,0.3,0.3,0.3,0.9,0.7,0.3,0.3,0.5,0.7,0.5,0.7,0.5,0.7,0.7,0.3,0.5,0.3,0.3,0.3,0.9,0.3,0.3,0.3,0.7,0.7,0.3,0.3,0.3,0.9,0.5,0.3,0.5,0.3,0.3,0.3,0.7,0.3,0.3,0.3,0.7,0.3,0.9,0.3,0.5,0.9,0.3,0.7,0.3,0.3,0.5,0.7,0.5,0.3,0.7,0.5,0.3,0.5,0.5,0.3,0.3,0.3,0.5,0.5,0.3,0.3,0.3,0.3,0.3,0.5,0.7,0.3,0.5,0.3,0.3,0.5,0.3,0.3,0.3,0.5,0.3,0.3,0.3,0.3,0.3,0.5,0.5,0.3,0.7,0.9,0.9,0.7,0.3,0.7,0.5,0.5,0.7,0.3,0.5,0.3,0.3,0.3,0.3,0.5,0.3,0.3,0.3,0.9,0.3,0.7,0.7,0.5,0.5,0.3,0.3,0.3,0.3,0.7,0.3,0.3,0.5,0.7,0.3,0.3,0.3,0.5,0.3,0.7,0.5,0.5,0.3,0.3,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.7,0.3,0.3,0.3,0.3,0.3,0.3,0.3,0.7,0.3,0.3,0.3,0.3,0.3,0.5,0.3],
    approvedGeorgiaHispanic: [0.3,0.9,0.7,0.5,0.9,0.3,0.7,0.9,0.3,0.5,0.7,0.7,0.7,0.9,0.9,0.3,0.7,0.3,0.3,0.7,0.3,0.3,0.3,0.3,0.3,0.5,0.9,0.9,0.3,0.3,0.7,0.3,0.7,0.9,0.9,0.3,0.9,0.5,0.9,0.7,0.3,0.9,0.9,0.5,0.3,0.3,0.3,0.9,0.9,0.7,0.7,0.3,0.9,0.7,0.7,0.7,0.5,0.5,0.3,0.7,0.3,0.9,0.9,0.3,0.9,0.3,0.9,0.3,0.5,0.9,0.7,0.3,0.9,0.9,0.3,0.3,0.3,0.7,0.9,0.9,0.3,0.3,0.3,0.5,0.9,0.9,0.3,0.9,0.9,0.9,0.7,0.3,0.9,0.9,0.7,0.3,0.9,0.3,0.5,0.9,0.7,0.3,0.9,0.3,0.3,0.3,0.3,0.9,0.7,0.3,0.3,0.3,0.5,0.3,0.7,0.9,0.5,0.3,0.7,0.7,0.7,0.3,0.3,0.3,0.3,0.3,0.9,0.9,0.7,0.3,0.9,0.3,0.5,0.5,0.5,0.9,0.7,0.3,0.3,0.3,0.9,0.7,0.3,0.3,0.5,0.3,0.9,0.7,0.5,0.7,0.9,0.3,0.3,0.7,0.7,0.3,0.9,0.3,0.7,0.9,0.3,0.5,0.9,0.3,0.3,0.9,0.3,0.3,0.9,0.3,0.7,0.3,0.5,0.7,0.9,0.7,0.5,0.7,0.7,0.7],
    approvedNewJerseyWhite: [0.7,0.9,0.7,0.7,0.9,0.5,0.9,0.5,0.9,0.9,0.3,0.9,0.7,0.9,0.5,0.9,0.5,0.9,0.9,0.9,0.7,0.9,0.3,0.7,0.9,0.7,0.9,0.9,0.9,0.7,0.5,0.7,0.5,0.7,0.9,0.9,0.5,0.5,0.9,0.9],
    approvedNewJerseyBlack: [0.9,0.3,0.9,0.5,0.3,0.9,0.7,0.7,0.9,0.7,0.3,0.7,0.7,0.9,0.7,0.5,0.5,0.7,0.3,0.9,0.9,0.9,0.5,0.9,0.5,0.5,0.7,0.5,0.9,0.7,0.3,0.9,0.3,0.5,0.3,0.3,0.9,0.7,0.5,0.5],
    approvedNewJerseyAsian: [0.7,0.3,0.7,0.3,0.5,0.5,0.7,0.7,0.9,0.3,0.7,0.5,0.3,0.9,0.9,0.3,0.5,0.7,0.3,0.3,0.7,0.9,0.5,0.3,0.5,0.9,0.7,0.9,0.7,0.9,0.5,0.5,0.9,0.9,0.9,0.7,0.5,0.3,0.3,0.5],
    approvedNewJerseyHispanic: [0.7,0.5,0.9,0.3,0.9,0.9,0.5,0.9,0.3,0.9,0.9,0.9,0.5,0.5,0.9,0.5,0.9,0.7,0.7,0.7,0.5,0.9,0.7,0.7,0.5,0.9,0.7,0.5,0.9,0.7,0.7,0.7,0.7,0.5,0.9,0.7,0.9,0.3,0.5,0.9]
  }

  const [newJerseyGeoJSON, setNewJerseyGeoJSON] = useState(null);
  const [test, setTest] = useState("");

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {center: [37.8, -95], zoom: 4,});
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Update map based on state selection
    if (mapSelection.selectedState) {
      const { center, zoom } = mapSelection;
      console.log(mapSelection)
      mapRef.current.setView(center, zoom);
    }

    // Cleanup function to remove map instance
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapSelection]);

  //axios call to get NJ State Data
  useEffect(() => {
    // Function to fetch New Jersey GeoJSON data
    const fetchNewJerseyGeoJSON = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/geojson/newjersey');
        const njGeoJSON = response.data;
        setNewJerseyGeoJSON(njGeoJSON[0]);
        console.log(njGeoJSON);
        console.log("hello")
      } catch (error) {
        console.error('Error fetching New Jersey GeoJSON data:', error);
      }
      try {
        const response2 = await axios.get('http://localhost:8080/api/geojson/testing');
        const testing = response2.data;
        setTest(testing);
        console.log(test);
        console.log("hello")
        console.log(response2);        
        console.log(testing)
      } catch (error) {
        console.error('Error fetching Test:', error);
      }
    };
  
    fetchNewJerseyGeoJSON();
  }, [mapSelection]);
  

  // To dynamically add GeoJSON layers based on mapSelection
  useEffect(() => {
    const opacites = [0.6, 0.7, 0.8, 0.9]
    let statesData;
    let ethnicities;    
    let opacityData;
    switch (mapSelection.selectedMapType) {
      case "State":
        //statesData = [newJerseyGeoJSON.features, newJerseyGeoJSON.features];//[...NewJerseyState.features, ...GeorgiaState.features];
        statesData = [...NewJerseyState.features, ...GeorgiaState.features]
        break;
      case "Counties":
        statesData = [...NewJerseyCounties.features, ...GeorgiaCounties.features];
        break;
      default:
        statesData = [...NewJerseyApproved.features, ...GeorgiaApproved.features];
        break;
    }

    if (mapSelection.selectedState === "Georgia") {
      if (mapSelection.selectedEthnicity === "White") {
        opacityData = mockHeatMap.approvedGeorgiaWhite.concat(mockHeatMap.approvedNewJerseyWhite);
      } else if (mapSelection.selectedEthnicity === "Black") {
        opacityData = mockHeatMap.approvedGeorgiaBlack.concat(mockHeatMap.approvedNewJerseyBlack);
      } else if (mapSelection.selectedEthnicity === "Asian") {
        opacityData = mockHeatMap.approvedGeorgiaAsian.concat(mockHeatMap.approvedNewJerseyAsian);
      } else if (mapSelection.selectedEthnicity === "Hispanic") {
        opacityData = mockHeatMap.approvedGeorgiaHispanic.concat(mockHeatMap.approvedNewJerseyHispanic);
      }
    } else if (mapSelection.selectedState === "New Jersey") {
      if (mapSelection.selectedEthnicity === "White") {
        opacityData = mockHeatMap.approvedNewJerseyWhite.concat(mockHeatMap.approvedGeorgiaWhite);
      } else if (mapSelection.selectedEthnicity === "Black") {
        opacityData = mockHeatMap.approvedNewJerseyBlack.concat(mockHeatMap.approvedGeorgiaBlack);
      } else if (mapSelection.selectedEthnicity === "Asian") {
        opacityData = mockHeatMap.approvedNewJerseyAsian.concat(mockHeatMap.approvedGeorgiaAsian);
      } else if (mapSelection.selectedEthnicity === "Hispanic") {
        opacityData = mockHeatMap.approvedNewJerseyHispanic.concat(mockHeatMap.approvedGeorgiaHispanic);
      }
    }
    
    let test = 0
    const geoJsonLayer = L.geoJson(statesData, {
      style: () => {
        return {
          fillColor: '#00AEF3',
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: opacityData[test++],
        };
      },
      onEachFeature: function(feature, layer) {
        if (feature.properties && feature.properties.name) {
          if (mapSelection.selectedMapType === "State") {
            // Always show state name
            layer.bindTooltip(feature.properties.name, {
              permanent: true,
              direction: 'center',
              className: 'state-name-tooltip'
            });
          } else {
            //only show on hover
            layer.bindTooltip(feature.properties.name, {
              className: 'state-name-tooltip'
            });
          }
        }
      }
    }).addTo(mapRef.current);
    var legend = L.control({position: 'topright'});
    legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend');
          var grades = [30, 20, 10, 10];
      
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i <grades.length; i++) { //rgb(0,174,243, opacites[i]);
          div.innerHTML +=
          '<i class="glyphicon glyphicon-stop" style="font-size:20px;  color:' + 'rgba(' + 0 + ',' + 173 + ',' + 243+ ',' + opacites[i] + ')' + '"></i>'+ (grades[i + 1] ? '+'+ grades[i] +'%'+'<br>' : '<'+grades[i] +'%');
        }
        div.style.backgroundColor="#f2f3f4";
        div.style.fontSize="12px";
        div.style.borderRadius = "5px"
        div.style.borderColor= "gray";
        div.style.borderStyle="solid";
        return div;
    };
    
    legend.addTo(mapRef.current);

    return () => {
      geoJsonLayer.remove();
    }
  }, [mapSelection]);

  const NJInfo = (
    <ul>
      <li>40 state Assembly Districts</li>
      <li>80 Representatives</li>
      <li>Does not require Preclearance</li>
    </ul>
  );

  const GAInfo = (
    <ul>
      <li>180 State Assembly Districts</li>
      <li>180 Representatives</li>
      <li>Requires Preclearance</li>
    </ul>
  )

  let stateInfo;
  if (mapSelection.selectedState === "New Jersey") {
    stateInfo = NJInfo;
  } else if (mapSelection.selectedState === "Georgia") {
    stateInfo = GAInfo;
  } else {
    stateInfo = "Select a state to see information.";
  }

  return(
    <div className="map-and-legend-container">
    <div>{test}</div>
    <div ref={mapContainerRef} className="map-container"></div>
    <div id = "table">
      <table>
        <tr><th id = "title" colspan="2">Summary of State Data</th></tr>
        <tr>
          <td>Total State Population</td>
          {mapSelection.selectedState=== "Georgia" && <td id ="state_pop" class="value">10,711,908</td>}
          {mapSelection.selectedState=== "New Jersey" && <td id ="state_pop" class="value">9,288,994</td>}
        </tr>
        <tr>
        <th colspan="2">Population By Ethnicity</th>
        </tr>
        <tr>
          <td id = "min_1">White </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">5,555,483</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">5,112,280</td>}
        </tr>
        <tr>
          <td id = "min_1">Hispanic </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">1,123,457</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">2,002,575</td>}
        </tr>
        <tr >
          <td id = "min_3">African American </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">3,320,513</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">1,219,770</td>}
        </tr>
        <tr >
          <td id = "min_2">Asian </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">479,028</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">950,000</td>}
        </tr>
        <tr>
          <td id = "min_4" >American Indian </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">50,618</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">51,186</td>}
        </tr>
        <tr>
          <td id = "min_4" >Native Hawaiian </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">7,299</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">3,533</td>}
        </tr>
        <tr>
          <td id = "min_4" >Other </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">555,059</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">1,048,641</td>}
        </tr>
        
        <th colspan ="2">Demographics of State Assembly Members </th>
        <tr>
          <td id = "min_1"># of White House of Representatives </td>
          {mapSelection.selectedState==="Georgia" && <td class="value">115</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">55</td>}
        </tr>
        <tr >
          <td id = "min_3"># of African American House of Representatives </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">54</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">14</td>}
        </tr>
        <tr>
          <td id = "min_1"># of Hispanic House of Representatives </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">2</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">8</td>}
        </tr>
        <tr >
          <td id = "min_2"># of Asian House of Representatives </td>
          {mapSelection.selectedState=== "Georgia" &&  <td class="value">7</td>}
          {mapSelection.selectedState=== "New Jersey" &&  <td class="value">3</td>}
        </tr>
        <th colspan ="2">Politcal Parties of State Assmebly Members </th>
        <tr>
          <td id = "min_1">Number of Democratic Members  </td>
          {mapSelection.selectedState=== "Georgia" && <td class="value">77</td>}
          {mapSelection.selectedState=== "New Jersey" && <td class="value">50</td>}
        </tr>
        <tr>
          <td id = "min_1">Number of Republican Members </td>

          {mapSelection.selectedState=== "Georgia" &&  <td class="value">101</td>}
          {mapSelection.selectedState=== "New Jersey" &&  <td class="value">30</td>}
        </tr>
      </table>
    </div>
  </div>
  )
}

export default Map;


