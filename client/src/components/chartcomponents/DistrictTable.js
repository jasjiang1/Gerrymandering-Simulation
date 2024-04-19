import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function StateAssembly({mapSelection}) {
    const [assemblyReps, setReps] = useState(false);
    useEffect(() => {
        const fetchRepsJSON = async () => {
          try {
            //Can we add a by state option for reps api with mapSelection.selectedState as arguement?
            const url = `http://localhost:8080/api/reps`;
            const response = await axios.get(url);
            const data = response.data;
            setReps(data);
          } catch (error) {
            console.error(`Error fetching ${mapSelection.selectedState} Assembly Reps data:`, error);
          }
        };
        if (mapSelection.selectedState) {
            fetchRepsJSON();
        }
      }, [mapSelection.selectedState]);
      useEffect(()=>{
        console.log(assemblyReps);
      })
    return (
        <div id = "assemlbysummarytable">
        { <table id = "assemblytable">
         
        </table>}
      </div>
    );
}

export default StateAssembly;
