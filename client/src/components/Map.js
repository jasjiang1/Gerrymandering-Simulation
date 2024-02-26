import React, { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import '../App.css';
import NewJerseyCounties from '../mocks/NewJerseyCounties.json';
import GeorgiaCounties from '../mocks/GeorgiaCounties.json';
import GeorgiaState from '../mocks/GeorgiaState.json';
import NewJerseyState from '../mocks/NewJerseyState.json';
import GeorgiaApproved from '../mocks/GeorgiaApproved.json';
import NewJerseyApproved from '../mocks/NewJerseyApproved.json';

function Map({ mapSelection }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

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
    let statesData;
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

    const geoJsonLayer = L.geoJson(statesData, {
      style: () => ({
        fillColor: '#C4A484',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
      }),
    }).addTo(mapRef.current);

    return () => {
      geoJsonLayer.remove();
    };
  }, [mapSelection]);

  return <div ref={mapContainerRef} className="vh-100" id="map"></div>;
}

export default Map;


