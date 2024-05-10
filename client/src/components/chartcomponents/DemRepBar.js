import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function DRGraph({ mapSelection }) {
    const chartRef = useRef(null)
    const canvasRef = useRef(null)
    const [splitsData, setSplitsData] = useState(null)
    const [ensembleWinner, setEnsembleWinner] = useState(null)
    const [ensembleDemDistr, setEnsembleDemDistr] = useState(null)
    const [ensembleRepDistr, setEnsembleRepDistr] = useState(null)

    const [actualSplitsData, setSctualSplitsData] = useState(null)
    const [actualWinner, setActualWinner] = useState(null)
    const [actualDemDistr, setActualDemDistr] = useState(null)
    const [actualRepDistr, setActualRepDistr] = useState(null)

    const termMapping = {
        "New Jersey": "NJ", 
        "Georgia": "GA",
    }
    useEffect(() => {
        const fetchData = async () => {
            const state = termMapping[mapSelection.selectedState]
            try {
                const url = `http://localhost:8080/api/graph/dem_rep_splits/${state}`
                const response = await axios.get(url)
                const data = response.data.filter(sz => sz.size ===5000 || sz.size === 1)
                const ensemble = data.find(dic => dic.size === 5000)
                const actual = data.find(dic => dic.size === 1)
                setSplitsData(ensemble.demRepSplits)
                setEnsembleWinner(ensemble.expectedWinner)
                setEnsembleDemDistr(ensemble.averageDemDistricts)
                setEnsembleRepDistr(ensemble.averageRepDistricts)

                setSctualSplitsData(actual.demRepSplits)
                setActualWinner(actual.expectedWinner)
                setActualDemDistr(actual.averageDemDistricts)
                setActualRepDistr(actual.averageRepDistricts)
            } catch (error) {
                console.error('Error fetching bar chart data:', error)
            }
        };
        fetchData();
    }, [mapSelection.selectedState]);

    useEffect(() => {
        if (splitsData && actualSplitsData && canvasRef.current && ensembleWinner && ensembleDemDistr && 
            ensembleRepDistr && actualWinner && actualDemDistr && actualRepDistr) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            const xAxes = Object.keys(splitsData)
            const totalDR = Object.values(splitsData).reduce((acc, cur) => acc + cur, 0)
            const totalActual = Object.values(actualSplitsData).reduce((acc, cur) => acc + cur, 0)
            const DRArray = Object.values(splitsData).map(val => val/totalDR)
            const actualArray = Object.values(actualSplitsData).map(val => val/totalActual)
            
            const config = {
                type:"bar",
                options:{
                    scales:{
                        y:{max:0.055, title:{display:true, text:"% Split Occurence",font: {weight:'bold'}}},
                        x:{title:{display:true, text:"Dem/Rep Split",font: {weight:'bold'}}}
                    }
                },
                data: {
                    labels: xAxes,
                    datasets: [{
                        label: '5000 Ensemble',
                        data: DRArray
                    }, {
                        label: 'Actual Plan',
                        data: actualArray
                    }]
                }
            }
            if (chartRef.current) {
                chartRef.current.destroy()
            }
            chartRef.current = new Chart(ctx, config);
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy()
            }
        }
    }, [splitsData])

    return (
        <div className = "chart-container">
            <div>
                <div id="charttitle">{mapSelection.selectedState} Dem Rep Splits</div>
                <canvas ref={canvasRef} width="200" height="150"></canvas>
                <table border = "1">
                    <tr>
                        <td></td>
                        <td>Ensemble Plan</td>
                        <td>Actual Plan</td>
                    </tr>
                    <tr>
                        <td>Expected/Actual Winner</td>
                        <td>{ensembleWinner}</td>
                        <td>{actualWinner}</td>
                    </tr>
                    <tr>
                        <td>Expected/Actual # Dem Districts</td>
                        <td>{ensembleDemDistr}</td>
                        <td>{actualDemDistr}</td>
                    </tr>
                    <tr>
                        <td>Expected/Actual # Rep Districts</td>
                        <td>{ensembleRepDistr}</td>
                        <td>{actualRepDistr}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default DRGraph