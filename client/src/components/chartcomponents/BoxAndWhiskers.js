import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function BWGraph({ mapSelection }) {
    Chart.register(BoxPlotController, BoxAndWiskers)
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [BWData250, seTBWData250] = useState([])
    const [BWData5000, setBWData5000] = useState([])
    const [actualBW, setActualBW] = useState([])
    const [size, setSize] = useState(250)
    const termMapping = {
        "New Jersey": "NJ", 
        "Georgia": "GA",
        "White": "white",
        "Black": "aa",
        "Asian": "asian",
        "Hispanic": "hispanic"
    }
    useEffect(() => {
        const fetchData = async () => {
            const state = termMapping[mapSelection.selectedState]
            const ethnicity = termMapping[mapSelection.selectedEthnicity]
            try {
                const url = `http://localhost:8080/api/graph/box_and_whisker/${state}`            
                const response = await axios.get(url)
                const data = response.data.filter(bw => bw.race === ethnicity)
                seTBWData250(data.find(dic => dic.size === 250).index_districts)
                setBWData5000(data.find(dic => dic.size === 5000).index_districts)
                setActualBW(data.find(dic => dic.size === 1).index_districts)
            } catch (error) {
                console.error('Error fetching box and whisker data', error)
            }
        }            
        fetchData()
    }, [mapSelection.selectedState, mapSelection.selectedEthnicity, size])

    useEffect(() => {
        if (BWData250 && BWData5000 && actualBW && canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d')
            BWData250.forEach(obj => {
                obj['median'] = obj['q2']
                delete obj['q2']
            })
            BWData5000.forEach(obj => {
                obj['median'] = obj['q2']
                delete obj['q2']
            })
            const actualplan = []
            for (let i = 0; i < actualBW.length;i++) {
                actualplan.push([actualBW[i].q1])
            }
            const indexes = []
            for (let i = 1; i <= BWData5000.length;i++) {
                indexes.push(i)
            }
            let toShow = BWData250
            let ensembleLabel = "250-Ensemble"
            if (size === '250') {
                toShow = BWData250
                ensembleLabel = "250-Ensemble"
            } else if (size === '5000') {
                toShow = BWData5000
                ensembleLabel = "5000-Ensemble"
            }
            const config = {
                type:"boxplot",
                options:{
                    scales:{
                        y:{max: 1,title:{display:true, text:"% Minority Population",font: {weight:'bold'}}},
                        x:{title:{display:true, text:"Index District",font: {weight:'bold'}}}
                    }
                },
                data: {
                    labels: indexes,
                    datasets:[
                        {
                            label: ensembleLabel,
                            backgroundColor:'blue', 
                            borderColor:'blue',
                            borderWidth:1,
                            padding:10,
                            data: toShow,
                        },
                        {
                            label: "Actual Plan",
                            backgroundColor:'black', 
                            borderColor:'black',
                            borderWidth:5,
                            padding:10,
                            data: actualplan
                        }
                    ]
                }
            }
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, config);
        }
    }, [BWData5000, BWData250, size])

    const handleChange = (event) => {
        const {value} = event.target;
        setSize(value)
    }

    return (
        <div className = "chart-container">
            <div>
                <h1 style={{ textAlign: 'center' }}>{mapSelection.selectedState} Box And Whiskers</h1>
                <Form>
                    <Form.Group controlId="selectBWEnsembleSize">
                    <Form.Label>Select Ensemble Size</Form.Label>
                    <Form.Control as="select" onChange = {handleChange}>
                        <option value = "250">250</option>
                        <option value = "5000">5000</option>
                    </Form.Control>
                    </Form.Group>
                </Form>
                <canvas ref={canvasRef} width="200" height="75"></canvas>
            </div>
        </div>
    )

}

export default BWGraph