import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';
import { Table, Typography, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function StateAssembly({mapSelection, setlayerhighlight}) {
    const [assemblyReps, setReps] = useState([]);
    const [state, setState] = useState(false);
    const [filterRace, setFilterRace] = useState('');
    const [filterParty, setFilterParty] = useState('');
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
        const filteredReps = assemblyReps.filter(rep => 
            (filterRace ? rep.ethnicity === filterRace : true) &&
            (filterParty ? rep.party === filterParty : true)
        );
        const handleRaceChange = (event) => {
            setFilterRace(event.target.value);
        };

        const handlePartyChange = (event) => {
            setFilterParty(event.target.value);
        };
      return (
        <Paper sx={{ width: '100%' }}>
        <Typography variant="h6" component="div" sx={{ padding: 2, fontFamily: 'Georgia', background: '#86C232', color: 'white', textAlign: 'center', fontSize: '1.5rem' }}>
            Assembly Representatives
        </Typography>
            <div>
                <label htmlFor="party-select" >Filter by Race:</label>
                <select id="race-select" style={{ fontSize: '2.4rem' }} onChange={handleRaceChange} value={filterRace}>
                    <option value="">All Races</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Asian">Asian</option>
                    <option value="African American">African American</option>
                    <option value="White">White</option>
                </select>
                <label htmlFor="party-select">Filter by Party:</label>
                <select id="party-select" style={{ fontSize: '2.4rem' }} onChange={handlePartyChange} value={filterParty}>
                    <option value="">All Parties</option>
                    <option value="D">Democratic</option>
                    <option value="R">Republican</option>
                    </select>
            </div>
          <TableContainer sx={{ maxHeight: 750, overflow: 'auto','&::-webkit-scrollbar': {display: 'none'} }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontFamily: 'Georgia', fontSize: '1.5rem'}}>District</TableCell>
                  <TableCell sx={{fontFamily: 'Georgia', fontSize: '1.5rem'}}>Representative</TableCell>
                  <TableCell sx={{fontFamily: 'Georgia', fontSize: '1.5rem'}}>Party</TableCell>
                  <TableCell sx={{fontFamily: 'Georgia', fontSize: '1.5rem'}}>Ethnicity</TableCell>
                  <TableCell sx={{fontFamily: 'Georgia', fontSize: '1.5rem'}}>% Vote Margin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReps.map((row) => (
                <TableRow sx={{ color: 'white' }} onClick={() => setlayerhighlight(row.districtNum)}>
                    <TableCell sx={{ color: 'white', fontFamily: 'Georgia', fontSize: '1.5rem' }}>{row.districtNum}</TableCell>
                    <TableCell sx={{ color: 'white', fontFamily: 'Georgia', fontSize: '1.5rem' }}>{row.name}</TableCell>
                    <TableCell sx={{ color: 'white', fontFamily: 'Georgia', fontSize: '1.5rem' }}>{row.party}</TableCell>
                    <TableCell sx={{ color: 'white', fontFamily: 'Georgia', fontSize: '1.5rem' }}>{row.ethnicity}</TableCell>
                    <TableCell sx={{ color: 'white', fontFamily: 'Georgia', fontSize: '1.5rem' }}>{row.voterMargin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Paper>
          
    );
}

export default StateAssembly;
