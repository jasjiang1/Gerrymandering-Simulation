import React, { useEffect, useRef, useState } from 'react';
import { getMinorityPopulationDistrict, getMinorityPopulationPrecinct } from './MapHelpers.js';
import * as L from 'leaflet';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css'

function Map({ mapSelection,chartSelection,highlightDistrict, setHighlight}) {
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);
    const [geoJSONData, setGeoJSONData] = useState(null);
    const [currentHighlight, setHighlighted] = useState(null);
    const outline = "#FFFFFF";
    const mapColor = "#1DA1F2";
    useEffect(() => {
      const { center, zoom } = mapSelection;
      let map;
      if(mapInstance.current != null){
        map = mapInstance.current;
      }
      if(chartSelection.selectedChartType != "State Assembly Table" && currentHighlight != null && map != null){
        currentHighlight.setStyle({ color: outline});
        setHighlighted(null);
        map.setView(center, zoom);
        setHighlight("");
      }
      else if(highlightDistrict != "" && map != null){
        if(map){
          map.eachLayer(function(layer) {
            if(layer.feature ){
              if(currentHighlight != null && (Number(layer.feature.properties.district) == highlightDistrict)){
                if((highlightDistrict != Number(currentHighlight.feature.properties.district))){
                  currentHighlight.setStyle({ color: outline});
                  layer.setStyle({color: 'black'});
                  layer.bringToFront();
                  map.fitBounds(layer.getBounds());
                  setHighlighted(layer);
                }  
              }
              if(currentHighlight == null && (Number(layer.feature.properties.district) == highlightDistrict)){
                layer.setStyle({color: 'black', weight:2});
                layer.bringToFront();
                map.fitBounds(layer.getBounds());
                setHighlighted(layer);
              }
            
            }
          });
        }
      }
    }, [highlightDistrict,chartSelection]);

    useEffect(() => {
      const fetchGeoJSON = async () => {
        try {
          const stateParam = mapSelection.selectedState.toLowerCase().replace(/\s/g, '');
          let url
          if(mapSelection.selectedMapType === 'Approved Districting Plan') {
            url = `http://localhost:8080/api/geojson/district/${stateParam}`;
          } else {
            url = `http://localhost:8080/api/geojson/precinct/${stateParam}`;
          }
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
    }, [mapSelection]);
/*
    function image(event) {
      console.log(event.target.feature.properties.district);
    
      const fetchGeoJSON = async () => {
        try {
          let stateParam = mapSelection.selectedState
          if(stateParam === "Georgia"){
            stateParam = "GA";
          }
          else{
            stateParam = "NJ";
          }
          const  district = event.target.feature.properties.district;
          const url = `http://localhost:8080/api/reps?districtNum=${district}&state=${stateParam}`;
          const response = await axios.get(url);
          const data = response.data;
          console.log(data);
        } catch (error) {
          console.error(`Error fetching ${mapSelection.selectedState} GeoJSON data:`, error);
        }
      };
      if (mapSelection.selectedState) {
        fetchGeoJSON();
      }
    }*/
    //Replace feature.properties.popupContent with what ever is in GeoJSON for district
    /*function popUp(feature, layer) {
      console.log(layer);
      layer.on({
        click: image
    });*/
     /* if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
      }
    }*/
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
        geoJSONLayer = L.geoJSON(geoJSONData, {
            style: function(feature) {
                const population = feature.properties.population
                let minorityPopulation
                if (mapSelection.selectedMapType === 'Approved Districting Plan') {
                  minorityPopulation = getMinorityPopulationDistrict(feature, mapSelection)
                } else {
                  minorityPopulation = getMinorityPopulationPrecinct(feature, mapSelection)
                }
                return {
                    color: outline,
                    fillColor: mapColor,
                    weight: 2,
                    opacity: 1,
                    fillOpacity: getOpacityByMinority(population, minorityPopulation)
                };
            },
            //onEachFeature: popUp //Add popUp details in function above
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