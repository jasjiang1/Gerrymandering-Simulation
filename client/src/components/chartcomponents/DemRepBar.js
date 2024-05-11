import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function DRGraph({ mapSelection }) {
    const chartRef = useRef(null)
    const canvasRef = useRef(null)
    const [size, setSize] = useState('250')
    
    const [splitsData250, setSplitsData250] = useState(null)
    const [ensembleWinner250, setEnsembleWinner250] = useState(null)
    const [ensembleDemDistr250, setEnsembleDemDistr250] = useState(null)
    const [ensembleRepDistr250, setEnsembleRepDistr250] = useState(null)

    const [splitsData5000, setSplitsData5000] = useState(null)
    const [ensembleWinner5000, setEnsembleWinner5000] = useState(null)
    const [ensembleDemDistr5000, setEnsembleDemDistr5000] = useState(null)
    const [ensembleRepDistr5000, setEnsembleRepDistr5000] = useState(null)

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
                const data = response.data.filter(sz => sz.size === 250 || sz.size === 5000 || sz.size === 1)
                const ensemble250 = data.find(dic => dic.size === 250)
                const ensemble5000 = data.find(dic => dic.size === 5000)
                const actual = data.find(dic => dic.size === 1)
                setSplitsData250(ensemble250.demRepSplits)
                setEnsembleWinner250(ensemble250.expectedWinner)
                setEnsembleDemDistr250(ensemble250.averageDemDistricts)
                setEnsembleRepDistr250(ensemble250.averageRepDistricts)

                setSplitsData5000(ensemble5000.demRepSplits)
                setEnsembleWinner5000(ensemble5000.expectedWinner)
                setEnsembleDemDistr5000(ensemble5000.averageDemDistricts)
                setEnsembleRepDistr5000(ensemble5000.averageRepDistricts)

                setSctualSplitsData(actual.demRepSplits)
                setActualWinner(actual.expectedWinner)
                setActualDemDistr(actual.averageDemDistricts)
                setActualRepDistr(actual.averageRepDistricts)
            } catch (error) {
                console.error('Error fetching bar chart data:', error)
            }
        };
        fetchData();
    }, [mapSelection.selectedState, size]);

    useEffect(() => {
        if (splitsData5000 && actualSplitsData && canvasRef.current) {
            console.log(size)
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            const xAxes = Object.keys(splitsData250)
            const totalDR250 = Object.values(splitsData250).reduce((acc, cur) => acc + cur, 0)
            const totalDR5000 = Object.values(splitsData5000).reduce((acc, cur) => acc + cur, 0)
            const totalActual = Object.values(actualSplitsData).reduce((acc, cur) => acc + cur, 0)
            const DRArray250 = Object.values(splitsData250).map(val => val/totalDR250)
            const DRArray5000 = Object.values(splitsData5000).map(val => val/totalDR5000)
            const actualArray = Object.values(actualSplitsData).map(val => val/totalActual)
            
            let toShow = DRArray250
            let ensembleLabel = '250 Ensemble'
            if (size === '250') {
                toShow = DRArray250
                ensembleLabel = '250 Ensemble'
            } else if (size === '5000') {
                toShow = DRArray5000
                ensembleLabel = '5000 Ensemble'
            }

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
                        label: ensembleLabel,
                        data: toShow
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
    }, [splitsData5000, size])

    const handleChange = (event) => {
        const {value} = event.target
        setSize(value)
    }

    return (
        <div className = "chart-container">
            <div>
                <div id="charttitle">{mapSelection.selectedState} Dem Rep Splits</div>
                <Form>
                    <Form.Group controlId="selectBWEnsembleSize">
                    <Form.Label>Select Ensemble Size</Form.Label>
                    <Form.Control as="select" onChange = {handleChange}>
                        <option value = "250">250</option>
                        <option value = "5000">5000</option>
                    </Form.Control>
                    </Form.Group>
                </Form>
                <canvas ref={canvasRef} width="200" height="150"></canvas>
                <table border = "1">
                    <tr>
                        <td></td>
                        <td>Ensemble Plan</td>
                        <td>Actual Plan</td>
                    </tr>
                    <tr>
                        <td>Expected/Actual Winner</td>
                        {size === '250' && <td>{ensembleWinner250}</td>}
                        {size === '5000' && <td>{ensembleWinner5000}</td>}
                        <td>{actualWinner}</td>
                    </tr>
                    <tr>
                        <td>Expected/Actual # Dem Districts</td>
                        {size === '250' && <td>{ensembleDemDistr250}</td>}
                        {size === '5000' && <td>{ensembleDemDistr5000}</td>}
                        <td>{actualDemDistr}</td>
                    </tr>
                    <tr>
                        <td>Expected/Actual # Rep Districts</td>
                        {size === '250' && <td>{ensembleRepDistr250}</td>}
                        {size === '5000' && <td>{ensembleRepDistr5000}</td>}
                        <td>{actualRepDistr}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}
export default DRGraph