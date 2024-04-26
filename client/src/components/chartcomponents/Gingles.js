import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import regression from 'regression';
import uPlot from 'uplot';
import 'uplot/dist/uPlot.min.css';
import '../../App.css';

function GinglesGraph({ mapSelection }) {
    const [ginglesData, setGinglesData] = useState([])
    const plotRef = useRef(null)
    const chartRef = useRef(null)
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
                const regressionResultD = regression.polynomial(
                    data.map(d => [d.minorityPCT, d.democraticPCT]),
                    { order: 2, precision: 5 }
                );
                const regressionResultR = regression.polynomial(
                    data.map(d => [d.minorityPCT, d.republicanPCT]),
                    { order: 2, precision: 5 }
                );
                const plotData = [
                    data.map(d => d.minorityPCT),
                    data.map(d => d.democraticPCT),
                    data.map(d => d.republicanPCT),
                    regressionResultD.points.map(point => point[1]),
                    regressionResultR.points.map(point => point[1])
                ];
                setGinglesData(plotData)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        if (mapSelection.selectedState) {
            fetchGinglesData();
        }
    }, [mapSelection.selectedState, mapSelection.selectedEthnicity]);

    useEffect(() => {
        if (ginglesData.length > 0 && plotRef.current) {
            const opts = {
                width: plotRef.current.offsetWidth,
                height: 400,
                scales: {
                    x: {
                        time: false,
                        min: 0.0,
                        max: 1.0
                    },
                    y: {
                        min: 0.0,
                        max: 1.0
                    }
                },
                series: [
                    { label: "Minority Percentage" },
                    { 
                        label: "Democratic Votes",
                        stroke: "rgba(135, 206, 235)",
                        points: { show: true, size: 3 },
                        paths: () => null
                    },
                    {
                        label: "Republican Votes",
                        stroke: "rgba(230,149,152)",
                        points: { show: true, size: 3 },
                        paths: () => null
                    },
                    {
                        label: "Democratic Regression Line",
                        stroke: "blue",
                        width: 2,
                        points: { show: true, size: 3 },
                        paths: () => null
                    },
                    {
                        label: "Republican Regression Line",
                        stroke: "red",
                        width: 2,
                        points: { show: true, size: 3 },
                        paths: () => null
                    }
                ],
                axes: [
                    { stroke: "black", grid: { show: true }, label: "Minority Percentage" },
                    { stroke: "black", grid: { show: true }, label : "Vote Percentage Margin" }
                ]
            };
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new uPlot(opts, ginglesData, plotRef.current);
        }
    }, [ginglesData]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Governor Election Sorted By Percent {mapSelection.selectedEthnicity} Within Each Precinct</h1>
            <div ref={plotRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
    );
}

export default GinglesGraph;