import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function BWGraph({ mapSelection }) {
    Chart.register(BoxPlotController, BoxAndWiskers)
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [BWData250, setBWData250] = useState([])
    const [BWData5000, setBWData5000] = useState([])
    const [actualBW, setActualBW] = useState([])
    const termMapping = {
        "New Jersey": "NJ", 
        "Georgia": "GA",
        "White": "white",
        "Black": "aa",
        "Asian": "asian",
        "Hispanic": "hispanic"
    }
    let x = null
    useEffect(() => {
        const fetchData = async () => {
            const state = termMapping[mapSelection.selectedState]
            const ethnicity = termMapping[mapSelection.selectedEthnicity]
            try {
                const url = `http://localhost:8080/api/graph/box_and_whisker/${state}`            
                const response = await axios.get(url)
                const data = response.data.filter(bw => bw.race === ethnicity)
                setBWData250(data.find(dic => dic.size === 250).index_districts)
                setBWData5000(data.find(dic => dic.size === 5000).index_districts)
                setActualBW(data.find(dic => dic.size === 1).index_districts)
            } catch (error) {
                console.error('Error fetching box and whisker data', error)
            }
        }            
        fetchData()
    }, [mapSelection.selectedState, mapSelection.selectedEthnicity])

    useEffect(() => {
        if (BWData250 && BWData5000 && actualBW && canvasRef.current) {
            console.log(actualBW)
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
            for (let i = 1; i <= BWData250.length;i++) {
                indexes.push(i)
            }
            const config = {
                type:"boxplot",
                options:{
                    scales:{
                        y:{max: 1,title:{display:true, text:"% Minority Population"},ticks:{font:{size:10, weight:'bold', lineHeight:0.1}}},
                        x:{title:{display:true, text:"Index District"},ticks:{font: {weight:'bold'}}}
                    }
                },
                data: {
                    labels: indexes,
                    datasets:[
                        {
                            label: "250-Ensemble",
                            backgroundColor:'orange', 
                            borderColor:'orange',
                            borderWidth:1,
                            padding:10,
                            data: BWData250
                        },
                        {
                            label: "5000-Ensemble",
                            backgroundColor:'blue', 
                            borderColor:'blue',
                            borderWidth:1,
                            padding:10,
                            data: BWData5000
                        },
                        {
                            label: "Actual Plan",
                            backgroundColor:'black', 
                            borderColor:'black',
                            borderWidth:10,
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
    }, [BWData250, BWData5000])

    return (
        <div className = "chart-container">
            <div>
                <div id="charttitle">{mapSelection.selectedState} Box And Whiskers</div>
                <canvas ref={canvasRef} width="200" height="150"></canvas>
            </div>
        </div>
    )

}

export default BWGraph