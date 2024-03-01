import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import '../App.css';
import NewJerseyCounties from '../mocks/NewJerseyCounties.json';
import GeorgiaCounties from '../mocks/GeorgiaCounties.json';
import GeorgiaState from '../mocks/GeorgiaState.json';
import NewJerseyState from '../mocks/NewJerseyState.json';
import GeorgiaApproved from '../mocks/GeorgiaApproved.json';
import NewJerseyApproved from '../mocks/NewJerseyApproved.json';
import legend from '../mocks/MockLegend.jpg'
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
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [37.8, -95],
        zoom: 4,
      });
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

  // To dynamically add GeoJSON layers based on mapSelection
  useEffect(() => {
    const opacites = [0.6, 0.7, 0.8, 0.9]
    let statesData;
    let ethnicities;
    switch (mapSelection.selectedMapType) {
      case "State":
        statesData = [...NewJerseyState.features, ...GeorgiaState.features];
        break;
      case "Counties":
        statesData = [...NewJerseyCounties.features, ...GeorgiaCounties.features];
        break;
      default:
        statesData = [...NewJerseyApproved.features, ...GeorgiaApproved.features];
        break;
    }
    let opacityData;
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

    return () => {
      geoJsonLayer.remove();
    };
  }, [mapSelection]);

  return(
    <div className="map-and-legend-container">
    <div className="legend-container">
      <span className="legend-text">Legend:</span>
      <img src={legend} alt="Legend" className="map-legend" />
    </div>
    <div ref={mapContainerRef} className="map-container"></div>
  </div>
  )
}

export default Map;


