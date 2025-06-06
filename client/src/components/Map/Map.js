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
    const outline = "#000000";
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
                  layer.setStyle({color: 'red'});
                  layer.bringToFront();
                  map.fitBounds(layer.getBounds());
                  setHighlighted(layer);
                }  
              }
              if(currentHighlight == null && (Number(layer.feature.properties.district) == highlightDistrict)){
                layer.setStyle({color: 'red', weight:2});
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
          if(mapSelection.selectedMapType === 'Approved Districting Plan' || mapSelection.selectedMapType === 'Approved Districting Plan Heatmap') {
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
    }, [mapSelection.selectedState, mapSelection.selectedMapType]);

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
            layer.bindPopup(`<h1>District: ${districtReps[0].districtNum}</h1><img src=${districtReps[0].image} style="width: 220px; height: 250px;"/><h3>Representative ${districtReps[0].name}</h3>`);
            layer.openPopup();
          }
          else{
           let image = `<h1>District: ${districtReps[0].districtNum}</h1>`;
            for(let index =0; index<districtReps.length;index++){
                image +=`<img src=${districtReps[index].image} style="width: 220px; height: 250px;"/>\n<h5>Representative ${districtReps[index].name}</h5>`;
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
      if (mapSelection.selectedMapType !== "Approved Districting Plan") {
        if (!mapInstance.current.legendControl) {
          let legend = L.control({ position: 'topright' });
          legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend');
            const labels = ["&gt; 30%", "20% - 30%", "10% - 20%", "&lt; 10%"];
            const opacities = [0.7, 0.6, 0.5, 0.4];
            div.innerHTML = '<strong>Minority Population %</strong><br>';
            for (let i = 0; i < opacities.length; i++) {
              div.innerHTML +=
                '<i style="background:#1DA1F2; opacity: ' + opacities[i] + '">&nbsp;&nbsp;&nbsp;&nbsp;</i> ' +
                labels[i] + '<br>';
            }
            div.style.backgroundColor = "#f2f3f4";
            div.style.padding = "6px";
            div.style.fontSize = "12px";
            div.style.borderRadius = "5px";
            div.style.borderColor = "gray";
            div.style.borderStyle = "solid";
            div.style.borderWidth = "1px";
            return div;
          };
          legend.addTo(mapInstance.current);
          mapInstance.current.legendControl = legend;
        }
      } else {
        if (mapInstance.current.legendControl) {
          mapInstance.current.legendControl.remove();
          mapInstance.current.legendControl = null;
        }
      }
      if (mapSelection.selectedState) {
        const { center, zoom } = mapSelection;
        mapInstance.current.setView(center, zoom);
      }
      let geoJSONLayer;
      if (geoJSONData && mapInstance.current) {
        const getOpacityByMinority = (totalPop, minorityPop) => {
          if (mapSelection.selectedMapType == "Approved Districting Plan") {
            return 0
          }
          const percentage = minorityPop / totalPop
          if (percentage > 0.3) {
            return 0.8
          } else if (percentage > 0.2) {
            return 0.6
          } else if (percentage > 0.1) {
            return 0.4
          } else {
            return 0.2
          }
        };
        geoJSONLayer = L.geoJSON(geoJSONData, {
            style: function(feature) {
                const population = feature.properties.population
                let minorityPopulation
                if (mapSelection.selectedMapType === 'Approved Districting Plan Heatmap') {
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
    return <div ref={mapContainerRef} style={{ height: '950px', width: '100%', border: '4px solid #000'}} />;
}

export default Map;