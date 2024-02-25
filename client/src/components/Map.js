import React, { useState, useEffect } from 'react';
import * as L from 'leaflet';
import '../App.css';
import NewJerseyCounties from '../mocks/NewJerseyCounties.json';
import GeorgiaCounties from '../mocks/GeorgiaCounties.json';
import GeorgiaState from '../mocks/GeorgiaState.json';
import NewJerseyState from '../mocks/NewJerseyState.json';
import GeorgiaApproved from '../mocks/GeorgiaApproved.json';
import NewJerseyApproved from '../mocks/NewJerseyApproved.json';

function Map({ mapSelection }) {
  const [map, setMap] = useState(null);
  const [selectedState, setSelectedState] = useState([])
  const [statesData, setStatesData] = useState({
    "type": "FeatureCollection",
    "features": []
  });
  const color = () => {
    return {
      fillColor: '#C4A484',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.7,
    };
  };

  useEffect(() => {
    if (mapSelection.selectedMapType === "State" || mapSelection.selectedMapType === "") {
      setStatesData({"type": "FeatureCollection", "features": [...NewJerseyState.features, ...GeorgiaState.features]});
    } else if (mapSelection.selectedMapType === "Counties") {
      setStatesData({"type": "FeatureCollection", "features": [...NewJerseyCounties.features, ...GeorgiaCounties.features]});
    } else {
      setStatesData({"type": "FeatureCollection", "features": [...NewJerseyApproved.features, ...GeorgiaApproved.features]});
    }
    if (mapSelection.selectedState === "Georgia") {
      setSelectedState([32.7, -83.4])
    } else if (mapSelection.selectedState === "New Jersey") {
      setSelectedState([40.1, -74.7])
    } else {
      setSelectedState([37.8, -95])
    }
  }, [mapSelection]);

  useEffect(() => {
    if (!statesData.features.length) return;
    var mapInstance = map || L.map('map').setView(selectedState, 4);
    if (!map) {
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapInstance);
      setMap(mapInstance);
    }
    L.geoJson(statesData, {
      style: color(),
      onEachFeature: function (feature, layer) {
        layer.on({
          click: function (e) {
            mapInstance.fitBounds(e.target.getBounds());
          }
        });
      }
    }).addTo(mapInstance);
    return () => {
      if (mapInstance) {
        mapInstance.eachLayer((layer) => {
          if (layer instanceof L.GeoJSON) {
            mapInstance.removeLayer(layer);
          }
        });
      }
    };
  }, [statesData]);  

  useEffect(() => {
    if (map) {
      if(mapSelection.selectedState === "Georgia" || mapSelection.selectedState === "New Jersey") {
        map.setView(selectedState, 7);
      } else {
        map.setView([37.8, -95], 4);
      }
    }
  }, [selectedState]);

  return <div className="vh-100" id="map"></div>;
}

export default Map;
