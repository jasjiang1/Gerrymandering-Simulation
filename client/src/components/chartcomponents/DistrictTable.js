import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function StateAssembly({mapSelection}) {
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
            //Can we add a by state option for reps api with mapSelection.selectedState as arguement?
            const url = `http://localhost:8080/api/reps?state=${stateParam}`;
            const response = await axios.get(url);
            const data = response.data;
            setReps(data);
            setState(stateParam);
            if(data != false){

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
        let vote = document.createElement('td');
        district.textContent = "District";
        name.textContent = "Representative";
        vote.textContent = "% Vote Margin";
        ethnicity.textContent = "Ethnicity";
        party.textContent = "Party";

        columns.appendChild(district);
        columns.appendChild(name);
        columns.appendChild(party);
        columns.appendChild(ethnicity);
        columns.appendChild(vote);
        document.getElementById("assemblytable").appendChild(columns);








        if(assemblyReps != false ){
           for(let index =0; index<assemblyReps.length;index++){
            console.log(assemblyReps[index]);
            console.log(assemblyReps[index].name);
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
            document.getElementById("assemblytable").appendChild(row);
             /*district number--Added 
             the representative-Added
             the representative’s party-Added
             the representative’s racial/ethnic group--Added
             vote margin as a percentage in the most recent election--Need to add
            */ 
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
