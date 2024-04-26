import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useRef, useState } from 'react';

function StateAssembly({mapSelection, setlayerhighlight}) {
    const [assemblyReps, setReps] = useState(false);
    const [state, setState] = useState(false);
    useEffect(() => {
        const fetchRepsJSON = async () => {
          let stateParam = mapSelection.selectedState
          if(stateParam === "Georgia"){
            stateParam = "GA";
          }
          else{
            stateParam = "NJ";
          }
          try {
            const url = `http://localhost:8080/api/reps?state=${stateParam}`;
            const response = await axios.get(url);
            const data = response.data;
            let sortedData = sortBy(data, districtData => Number(districtData.districtNum));
            
            if(data != false){
              setReps(sortedData);
              setState(stateParam);
            }
          } catch (error) {
            console.error(`Error fetching ${mapSelection.selectedState} Assembly Reps data:`, error);
          }
        };
        if (mapSelection.selectedState) {
            fetchRepsJSON();
        }
      }, [mapSelection.selectedState]);

      useEffect(()=>{
        let table = document.getElementById("assemblytable");
        table.innerHTML = "";
        let columns = document.createElement("tr");
        let district = document.createElement('td');
        let name = document.createElement('td');
        let party = document.createElement('td');
        let ethnicity = document.createElement('td');
        let votemargin = document.createElement('td');
        district.textContent = "District";
        name.textContent = "Representative";
        votemargin.textContent = "% Vote Margin";
        ethnicity.textContent = "Ethnicity";
        party.textContent = "Party";
        columns.appendChild(district);
        columns.appendChild(name);
        columns.appendChild(party);
        columns.appendChild(ethnicity);
        columns.appendChild(votemargin);
        document.getElementById("assemblytable").appendChild(columns);
        if(assemblyReps != false ){
           for(let index =0; index<assemblyReps.length;index++){
            let row = document.createElement("tr");
            let districtNum = document.createElement('td');
            districtNum.textContent = assemblyReps[index].districtNum;
            let repname = document.createElement('td');
            repname.textContent = assemblyReps[index].name;
            let repparty;
            if(assemblyReps[index].party === "D"){
                repparty = "Democratic";
            }
            else{
              repparty = "Republican";
            };
            let party = document.createElement('td');
            party.textContent = repparty;
            let ethnicity = document.createElement('td');
            ethnicity.textContent = assemblyReps[index].ethnicity;
            row.appendChild(districtNum);
            row.appendChild(repname);
            row.appendChild(party);
            row.appendChild(ethnicity);
            row.onclick= ()=>{
              setlayerhighlight(assemblyReps[index].districtNum);
            };
            document.getElementById("assemblytable").appendChild(row);
           }
        }
      })

      return (
        <div class = "assemlbysummarytable" >
          <h1 id = "title">State Assembly Table</h1>
       <table id = "assemblytable">
        </table>
      </div>
    );
}

export default StateAssembly;
