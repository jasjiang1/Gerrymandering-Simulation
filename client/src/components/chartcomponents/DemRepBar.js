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
            let splits250 = {}
            let splits5000 = {}
            if (state == "NJ") {
                splits250 = {'20/20':1,'21/19':6,'22/18':21,'23/17':64,'24/16':92,'25/15':55,'26/14':11,'27/13':0, '28/12':0}
                splits5000 = {'20/20':7,'21/19':72,'22/18':476,'23/17':1292,'24/16':1839,'25/15':1012,'26/14':269,'27/13':30,'28/12':3}
            } else {
                splits250 = {'62/118':0, '63/117':0,'64/116':0,'65/115': 1, '66/114': 2, '67/113': 8, '68/112': 7, '69/111': 19, '70/110': 14, '71/109': 29, '72/108': 32, '73/107': 42, '74/106': 25, '75/105': 23, '76/104': 19, '77/103': 19, '78/102': 7, '79/101':0,'80/100': 3,'81/99':0, '82/98':0}
                splits5000 = {'62/118': 1, '63/117': 2, '64/116': 6, '65/115': 19, '66/114': 36, '67/113': 76, '68/112': 174, '69/111': 308, '70/110': 413, '71/109': 613, '72/108': 659, '73/107': 738, '74/106': 644, '75/105': 522, '76/104': 357, '77/103': 227, '78/102': 119, '79/101': 48, '80/100': 25, '81/99': 11, '82/98': 2}
            }
            try {
                const url = `http://localhost:8080/api/graph/dem_rep_splits/${state}`
                const response = await axios.get(url)
                const data = response.data.filter(sz => sz.size === 250 || sz.size === 5000 || sz.size === 1)
                const ensemble250 = data.find(dic => dic.size === 250)
                const ensemble5000 = data.find(dic => dic.size === 5000)
                const actual = data.find(dic => dic.size === 1)
                setSplitsData250(splits250)
                setEnsembleWinner250(ensemble250.expectedWinner)
                setEnsembleDemDistr250(ensemble250.averageDemDistricts)
                setEnsembleRepDistr250(ensemble250.averageRepDistricts)

                setSplitsData5000(splits5000)
                setEnsembleWinner5000(ensemble5000.expectedWinner)
                setEnsembleDemDistr5000(ensemble5000.averageDemDistricts)
                setEnsembleRepDistr5000(ensemble5000.averageRepDistricts)

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
        if (splitsData5000 && splitsData250 && canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            let xAxes = []
            if (size === 250) {
                xAxes = Object.keys(splitsData250)
            } else {
                xAxes = Object.keys(splitsData5000)
            }
            const DRArray250 = Object.values(splitsData250)
            const DRArray5000 = Object.values(splitsData5000)
            
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
                        y:{title:{display:true, text:"Split Frequency",font: {weight:'bold'}}},
                        x:{title:{display:true, text:"Dem/Rep Split",font: {weight:'bold'}}}
                    }
                },
                data: {
                    labels: xAxes,
                    datasets: [{
                        label: ensembleLabel,
                        data: toShow
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
        <div className = "chart-container" style={{ border: '4px solid #000' }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>{mapSelection.selectedState} Democratic Republic Splits</h1> 
                <h1>Select Ensemble Size</h1>
                <Form>
                    <Form.Group controlId="selectBWEnsembleSize">
                    <Form.Control as="select" onChange = {handleChange}>
                        <option value = "250">250</option>
                        <option value = "5000">5000</option>
                    </Form.Control>
                    </Form.Group>
                </Form>
                <canvas ref={canvasRef} width="200" height="75"></canvas>
                <table border = "1">
                    <tr>
                        <td></td>
                        <td>Ensemble Plan</td>
                        <td>Enacted Plan</td>
                    </tr>
                    <tr>
                        <td>Expected/Enacted Winner</td>
                        {size === '250' && <td>{ensembleWinner250}</td>}
                        {size === '5000' && <td>{ensembleWinner5000}</td>}
                        <td>{actualWinner}</td>
                    </tr>
                    <tr>
                        <td>Expected/Enacted # Dem Districts</td>
                        {size === '250' && <td>{ensembleDemDistr250}</td>}
                        {size === '5000' && <td>{ensembleDemDistr5000}</td>}
                        <td>{actualDemDistr}</td>
                    </tr>
                    <tr>
                        <td>Expected/Enacted # Rep Districts</td>
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