import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Map({ mapSelection }) {
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);
    function isValidLatLng(lat, lng, featureId) {
      if (
        lat === undefined || lng === undefined ||
        lat < -90 || lat > 90 ||
        lng < -180 || lng > 180
      ) {
        console.error(`Invalid LatLng [${lat}, ${lng}] in feature ${featureId}`);
        return false;
      }
      return true;
    }
    
    function validateGeometry(geometry, featureId) {
      switch (geometry.type) {
        case 'Point':
          return isValidLatLng(geometry.coordinates[1], geometry.coordinates[0], featureId);
        case 'Polygon':
          return geometry.coordinates.every((polygon, index) =>
            polygon.every((coordinate) =>
              isValidLatLng(coordinate[1], coordinate[0], `${featureId} Polygon Ring ${index}`)
            )
          );
        case 'MultiPolygon':
          return geometry.coordinates.every((multiPolygon, mpIndex) =>
            multiPolygon.every((polygon, pIndex) =>
              polygon.every((coordinate) =>
                isValidLatLng(coordinate[1], coordinate[0], `${featureId} MultiPolygon ${mpIndex} Ring ${pIndex}`)
              )
            )
          );
        default:
          return true;
      }
    }
    
    function checkGeoJSONFeatures(geoJSONData) {
      geoJSONData.forEach((feature, index) => {
        if (!validateGeometry(feature.geometry, `Feature ${index + 1}`)) {
          console.log(feature);
        }
      });
    }
    function isEmptyArray(arr) {
      return Array.isArray(arr) && arr.length === 0;
  }
  
    useEffect(() => {
      const fetchGeoJSON = async () => {
        try {
          const stateParam = mapSelection.selectedState.toLowerCase().replace(/\s/g, '');
          const url = `http://localhost:8080/api/geojson/district/${stateParam}`;
          const response = await axios.get(url);
          const data = response.data;
          const cleanedData = data.map(feature => {
            const filteredCoordinates = feature.geometry.coordinates.filter(coord => coord.length >= 2 && !isEmptyArray(coord));
            return {
                ...feature,
                geometry: {
                    ...feature.geometry,
                    coordinates: filteredCoordinates
                }
            };
          });
          console.log(cleanedData)
          setGeoJSONData(cleanedData);
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

      let geoJSONLayer;
      if (geoJSONData && mapInstance.current) {
        checkGeoJSONFeatures(geoJSONData);
        let validFeatures = geoJSONData.filter(feature => validateGeometry(feature.geometry));
        geoJSONLayer = L.geoJSON(validFeatures).addTo(mapInstance.current);
      }

      return () => {
        if (geoJSONLayer) {
          mapInstance.current.removeLayer(geoJSONLayer);
        }
      };
    }, [geoJSONData]);

    useEffect(() => {
      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }, []);

    return <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />;
}

export default Map;
