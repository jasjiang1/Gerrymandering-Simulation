import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function EIGraph({ mapSelection }) {
    const canvasRef = useRef(null);
    const [ecologicalInferenceData, setEcologicalInferenceData] = useState(null);
    const termMapping = {
        "New Jersey": "NJ",
        "Georgia": "GA",
        "Asian": "Asian",
        "White": "White",
        "Black": "AfricanAmerican",
        "Hispanic": "Hispanic"
    };
    const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'];
    const borderColors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'];
    useEffect(() => {
        const fetchEIData = async () => {
            try {
                const state = termMapping[mapSelection.selectedState];
                const minority = termMapping[mapSelection.selectedEthnicity];
                const url = `http://localhost:8080/api/graph/ei/${state}/${minority}`;
                const response = await axios.get(url);
                const data = response.data;
                setEcologicalInferenceData(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (mapSelection.selectedState && mapSelection.selectedEthnicity) {
            fetchEIData();
        }
    }, [mapSelection.selectedEthnicity, mapSelection.selectedState]);

    useEffect(() => {
        if (ecologicalInferenceData && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ecologicalInferenceData.minorityEI[0].x,
                    datasets: ecologicalInferenceData.minorityEI.map((candidate, index) => ({
                        label: candidate.candidate,
                        data: candidate.y,
                        fill: true,
                        backgroundColor: colors[index % colors.length],
                        borderColor: borderColors[index % borderColors.length]
                    }))
                },
                options: {
                    scales: {
                        x: {
                            title:{display:true, text:"Minority (%)",font: {weight:'bold'}},
                            type: 'linear',
                            min: 0,
                            max: 1
                        },
                        y: {
                            title:{display:true, text:"Probability Density (%)",font: {weight:'bold'}},
                            beginAtZero: true
                        }
                    }
                }
            });
            return () => {
                chartInstance.destroy();
            };
        }
    }, [ecologicalInferenceData]);

    return (
        <div className = "chart-container" style={{ border: '4px solid #000' }}>
            <h1 style={{textAlign: 'center'}}>Support For Candidates Among {mapSelection.selectedEthnicity} </h1>
            <canvas ref={canvasRef} width="200" height="75"></canvas>
        </div>
    );
}
export default EIGraph;
