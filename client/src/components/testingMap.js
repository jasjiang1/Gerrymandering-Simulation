import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Map({ mapSelection }) {
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);
    const outline = "#FFFFFF"
    const mapColor = "#1DA1F2"
    useEffect(() => {
      const fetchGeoJSON = async () => {
        try {
          const stateParam = mapSelection.selectedState.toLowerCase().replace(/\s/g, '');
          const url = `http://localhost:8080/api/geojson/district/${stateParam}`;
          const response = await axios.get(url);
          const data = response.data;
          setGeoJSONData(data);
        } catch (error) {
          console.error(`Error fetching ${mapSelection.selectedState} GeoJSON data:`, error);
        }
      };
      if (mapSelection.selectedState) {
        fetchGeoJSON();
      }
    }, [mapSelection.selectedState]);

    useEffect(() => {
      if (!mapInstance.current && mapContainerRef.current) {
        mapInstance.current = L.map(mapContainerRef.current).setView([37.8, -95], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstance.current);
      }
      if (mapSelection.selectedState) {
        const { center, zoom } = mapSelection;
        mapInstance.current.setView(center, zoom);
      }
      let geoJSONLayer;
      if (geoJSONData && mapInstance.current) {
        const getOpacityByMinority = (totalPop, minorityPop) => {
          const percentage = minorityPop / totalPop
          if (percentage > 0.3) {
            return 0.7
          } else if (percentage > 0.2) {
            return 0.6
          } else if (percentage > 0.1) {
            return 0.5
          } else {
            return 0.4
          }
        };
        const getMinorityPopulation = (feature) => {
          if (mapSelection.selectedEthnicity == "Hispanic") {
            return feature.properties.hispanic
          } else if (mapSelection.selectedEthnicity == "Asian") {
            return feature.properties.asian
          } else if (mapSelection.selectedEthnicity == "White") {
            return feature.properties.white
          } else {
            return feature.properties.africanAmerican
          }
        }
        geoJSONLayer = L.geoJSON(geoJSONData, {
            style: function(feature) {
                const population = feature.properties.population;
                const minorityPopulation = getMinorityPopulation(feature)
                return {
                    color: outline,
                    fillColor: mapColor,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: getOpacityByMinority(population, minorityPopulation)
                };
            }
        }).addTo(mapInstance.current);
    }

      return () => {
        if (geoJSONLayer) {
          mapInstance.current.removeLayer(geoJSONLayer);
        }
      };
    }, [geoJSONData, mapSelection]);

    useEffect(() => {
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }, []);

    return <div ref={mapContainerRef} style={{ height: '950px', width: '100%'}} />;
}

export default Map;
