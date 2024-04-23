import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Legend, Line, ResponsiveContainer} from 'recharts';
import regression from 'regression';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function GinglesGraph({ mapSelection }) {
    const [ginglesData, setGinglesData] = useState([]);
    const [regressionDataD, setRegressionDataD] = useState([]);
    const [regressionDataR, setRegressionDataR] = useState([]);
    const termMapping = {
        "New Jersey": "NJ",
        "Georgia": "GA",
        "Asian": "asianPCT",
        "White": "whitePCT",
        "Black": "africanAmericanPCT",
        "Hispanic": "hispanicPCT"
    };
    useEffect(() => {
        const fetchGinglesData = async () => {
            try {
                const state = termMapping[mapSelection.selectedState];
                const ethnicity = termMapping[mapSelection.selectedEthnicity]
                const url = `http://localhost:8080/api/graph/gingles/${state}`;
                const response = await axios.get(url);
                const data = response.data.map(info => ({
                    ...info,
                    minorityPCT: info[ethnicity],
                    republicanPCT: info.republicPCT,
                    democraticPCT: info.democraticPCT
                }));
                setGinglesData(data);
                const regressionResultD = regression.polynomial(
                    data.map(d => [d.minorityPCT, d.democraticPCT]),
                    { order: 2, precision: 5 }
                );
                const regressionResultR = regression.polynomial(
                    data.map(d => [d.minorityPCT, d.republicanPCT]),
                    { order: 2, precision: 5 }
                );
                const formattedRegressionDataD = regressionResultD.points.map(point => ({
                    minorityPCT: point[0],
                    y: String(point[1])
                }));
                const formattedRegressionDataR = regressionResultR.points.map(point => ({
                    minorityPCT: point[0],
                    y: String(point[1])
                }));
                setRegressionDataD(formattedRegressionDataD);
                setRegressionDataR(formattedRegressionDataR);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        if (mapSelection.selectedState) {
            fetchGinglesData();
        }
    }, [mapSelection.selectedState, mapSelection.selectedEthnicity]);
    return (
        <>
        <h1 style={{textAlign: 'center'}}>Governor Election Sorted By Percent {mapSelection.selectedEthnicity} Within Each Precinct</h1>
        <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="minorityPCT" name="Minority %" label={{ value: 'Minority Percentage', position: 'insideBottomRight', offset: 0 }} />
                <YAxis type="number" name="Vote Percentage" label={{ value: 'Vote Percentage', angle: -90, position: 'insideLeft' }}>
                    <YAxis.Label value="Vote Percentage" angle={-90} position="insideLeft" />
                </YAxis>
                <Legend />
                <Scatter name="Democratic Votes" data={ginglesData} fill="rgba(135, 206, 235)" shape="circle" dataKey="democraticPCT" />
                <Scatter name="Republican Votes" data={ginglesData} fill="rgba(230,149,152)" shape="circle" dataKey="republicanPCT" />
                <Scatter name="Democratic Line" data={regressionDataD} fill="rgba(0, 0, 255)" shape="circle" dataKey="y" />
                <Scatter name="Repbulican Line" data={regressionDataR} fill="rgba(255, 0, 0)" shape="circle" dataKey="y" />
                </ScatterChart>
        </ResponsiveContainer>
        </>
    );
}

export default GinglesGraph;
