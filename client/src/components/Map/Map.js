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

    function image(event,layer) {
      let map = mapInstance.current
      const fetchGeoJSON = async () => {
        try {
          let stateParam = mapSelection.selectedState
          if(stateParam === "Georgia"){
            stateParam = "GA";
          }
          else{
            stateParam = "NJ";
          }
          const  district = Number(event.target.feature.properties.district);
          const url = `http://localhost:8080/api/reps?districtNum=${district}`;
          const response = await axios.get(url);
          let data  = response.data;  
          let districtReps = [];
          let numberOfreps = 0;
          for(let index =0; index<data.length;index++){
            if(data[index].state === stateParam){
              districtReps[numberOfreps++] = data[index];
            }
          }
          if(map != null){
            map.fitBounds(layer.getBounds());
          }
          if(districtReps.length ===1){
            layer.bindPopup(`<h1>District: ${districtReps[0].districtNum}</h1><img src=${districtReps[0].image} width =250px height=250px/><h3>Representative ${districtReps[0].name}</h3>`);
            layer.openPopup();
          }
          else{
           let image = `<h1>District: ${districtReps[0].districtNum}</h1>`;
            for(let index =0; index<districtReps.length;index++){
                image +=`<img src=${districtReps[index].image} width =150px height=150px/>\n<h5>Representative ${districtReps[index].name}</h5>`;
            }
            layer.bindPopup(image);
            layer.openPopup();
          }
          
        } catch (error) {
          console.error(`Error fetching ${mapSelection.selectedState} GeoJSON data:`, error);
        }
      };
      if (mapSelection.selectedState) {
        fetchGeoJSON();
      }
    }

    function popUp(feature, layer) {
      layer.on({
        click: (event)=>{image(event,layer)}
      });
    }
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
            onEachFeature: popUp 
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