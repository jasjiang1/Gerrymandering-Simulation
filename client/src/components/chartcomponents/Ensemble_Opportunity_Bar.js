import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function EnsembleOpportunityGraph({ mapSelection, chartSelection }) {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [ensembleData37, setEnsembleData37] = useState(null)
    const [ensembleData43, setEnsembleData43] = useState(null)
    const [ensembleData50, setEnsembleData50] = useState(null)
    const [barChartData, setBarChartData] = useState(null);
    const [threshold, setThreshold] = useState('50%');
    const [aaOpp, setAaOpp] = useState([0,0,0])
    const [asianOpp, setAsianOpp] = useState([0,0,0])
    const [hispanicOpp, setHispanicOpp] = useState([0,0,0])
    const [size, setSize] = useState('5000')
    const termMapping = {
        "New Jersey": "NJ", 
        "Georgia": "GA",
        "White": "white",
        "Black": "aa",
        "Asian": "asian",
        "Hispanic": "hispanic"
    }
    useEffect(() => {
        let state = termMapping[mapSelection.selectedState]
        let race = termMapping[mapSelection.selectedEthnicity]
        let oppData250 = {}
        let oppData5000 = {}
        if (state === 'NJ') {
            oppData250 = {
                '37%':{'aa': {0:0, 1: 40, 2: 160, 3: 50}, 
                        'asian': {0: 228, 1: 22}, 
                        'hispanic': {0:0, 1:0, 2:0, 3: 3, 4: 27, 5: 84, 6: 104,7: 28, 8: 4}},
               '43%':{'aa': {0: 2, 1: 96, 2: 139, 3: 13}, 
                        'asian': {0: 248, 1: 2}, 
                        'hispanic': {0:0, 1: 1, 2: 49, 3: 91, 4: 77, 5: 29, 6: 3}},
               '50%':{'aa': {0: 13, 1: 169, 2: 67, 3: 1}, 
                        'asian': {0: 250, 1:0}, 
                        'hispanic': {0: 21, 1: 121, 2: 95, 3: 11, 4: 2}},
           }
            oppData5000 = {
                '37%':{'aa': {0:0, 1: 719, 2: 3199, 3: 1068, 4: 14}, 
                       'asian': {0: 4697, 1: 299, 2: 4}, 
                       'hispanic': {0:0, 1:0, 2: 2,3: 75,4: 644, 5: 1707,  6: 1730, 7: 717, 8: 117,  9: 8, }},
                '43%':{'aa': {0: 9, 1: 1842, 2: 2868, 3: 281, 4:0}, 
                       'asian': {0: 4984, 1: 16, 2:0}, 
                       'hispanic': {0: 2, 1: 99, 2: 708, 3: 1989, 4: 1688, 5: 467, 6: 47, 7:0, 8:0, 9:0}},
                '50%':{'aa': {0: 235, 1: 3278, 2: 1475, 3: 12, 4:0}, 
                       'asian': {0: 5000, 1:0, 2:0}, 
                       'hispanic': {0: 479,1: 2574,2: 1625, 3: 302, 4: 20, 5:0, 6:0, 7:0, 8:0, 9:0}}}
        } else {
            oppData250 = {
                '37%':{'aa': {36: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0, 49: 0, 50: 0, 51: 0,52: 2,53: 3,54: 8,55: 9,56: 27,57: 17,58: 27,59: 38,60: 28,61: 32,62: 31,  63: 12, 64: 9,  65: 3, 66: 2,  67: 1,  68: 1}, 
                      'asian': { 0: 134,1: 100, 2: 16}, 
                      'hispanic': {0:0, 1: 1,2: 19,3: 56,4: 67, 5: 70, 6: 28,  7: 9}},
               '43%':{'aa': {36:0, 37:0, 38:0, 39:0, 40: 1, 41: 1, 42: 2, 43: 12, 44: 25, 45: 21, 46: 34, 47: 38, 48: 28, 49: 34, 50: 21, 51: 20, 52: 9, 53: 3, 54: 1}, 
                     'asian': {0: 244, 1: 6, 2:0}, 
                     'hispanic': {0: 6,1: 74,2: 108, 3: 53,  4: 6,5: 2, 6: 1, }},
               '50%':{'aa': {36: 41, 32: 10, 37: 38, 39: 18, 35: 41, 33: 20, 38: 39, 34: 19, 40: 12, 41: 5, 42: 2, 30: 1, 31: 2, 43: 1, 44: 1}, 
                     'asian': {0: 2501, 1:0, 2:0}, 
                     'hispanic': { 0: 128,1: 115, 2: 6, 3: 1}}
           }
            oppData5000 = {
                '37%':{'aa': {27: 0, 28: 0, 29: 0, 30: 0, 31: 0, 32: 0, 33: 0, 34: 0, 35: 0, 36: 0, 37: 0, 38: 0, 39: 0, 40: 0, 41: 0, 42: 0, 43: 0, 44: 0, 45: 0, 46: 0, 47: 0, 48: 0,49: 1, 50: 3, 51: 7, 52: 19, 53: 42, 54: 103, 55: 206, 56: 324, 57: 496, 58: 650, 59: 697, 60: 670, 61: 647, 62: 489, 63: 314, 64: 176, 65: 94, 66: 37, 67: 14, 68: 8, 69: 3}, 
                      'asian': {0: 2471, 1: 2273, 2: 248, 3: 8}, 
                      'hispanic': {0:0, 1: 22, 2: 319,3: 1056,4: 1544,  5: 1288, 6: 602, 7: 150,  8: 18, 9: 1}},
               '43%':{'aa': {27: 0, 28: 0, 29: 0, 30: 0, 31: 0, 32: 0, 33: 0, 34: 0, 35: 0, 36: 0, 37: 0, 38: 0,39: 5, 40: 15, 41: 38, 42: 88, 43: 203, 44: 313, 45: 488, 46: 667, 47: 757, 48: 756, 49: 593, 50: 461, 51: 284, 52: 169, 53: 91, 54: 49, 55: 19, 56: 4}, 
                     'asian': {0: 4882, 1: 118, 2:0, 3:0}, 
                     'hispanic': {0: 130,1: 1405,2: 2079,  3: 1100, 4: 256,  5: 28, 6: 2, 7:0, 8:0, 9:0}},
               '50%':{'aa': {27: 1, 28: 4, 29: 3, 30: 18, 31: 76, 32: 179, 33: 356, 34: 603, 35: 734, 36: 830, 37: 771, 38: 658, 39: 379, 40: 204, 41: 121, 42: 44, 43: 13, 44: 5, 45: 1}, 
                     'asian': {0: 5000, 1:0, 2:0, 3:0}, 
                     'hispanic': {0: 2463,1: 2235,  2: 297, 3: 5, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0}}}
        }
        let oppData = {}
        if (size === '250') {
            oppData = oppData250
        } else {
            oppData = oppData5000
        }
        const fetchData = async () => {
            if (mapSelection.selectedState !== '' && chartSelection.selectedChartType === "Ensemble Opportunity Districts") {
                try {
                    const response = await axios.get(`http://localhost:8080/api/graph/ensembleOpp/${state}`);
                    setBarChartData(response.data);
                    setEnsembleData37(oppData['37%'][race])
                    setEnsembleData43(oppData['43%'][race])
                    setEnsembleData50(oppData['50%'][race])
                } catch (error) {
                    console.error('Error fetching bar chart data:', error);
                }
            }
        };
        fetchData();
    }, [mapSelection.selectedState, mapSelection.selectedEthnicity, chartSelection, size]);

    useEffect(() => {
        let ensemble;
        let actual
    
        if(barChartData != null){
            if (size === '250') {
                ensemble = barChartData[0]
            } else {
                ensemble = barChartData[1]
            }
            actual = barChartData[2];
            
        let asian;
        let aa;
        let hispanic;
        let white;
        
        if(threshold === "37%"){
          asian = [ensemble.average_opp_37.asian,ensemble.max_opp_37.asian, actual.average_opp_37.asian ]
          aa = [ensemble.average_opp_37.aa,ensemble.max_opp_37.aa, actual.average_opp_37.aa]
          hispanic = [ensemble.average_opp_37.hispanic,ensemble.max_opp_37.hispanic, actual.average_opp_37.hispanic ]
          white = [ensemble.average_opp_37.white,ensemble.max_opp_37.white, actual.average_opp_37.white]
        }
        else if(threshold === "43%"){
            asian = [ensemble.average_opp_43.asian,ensemble.max_opp_43.asian, actual.average_opp_43.asian ]
            aa = [ensemble.average_opp_43.aa,ensemble.max_opp_43.aa, actual.average_opp_43.aa]
            hispanic = [ensemble.average_opp_43.hispanic,ensemble.max_opp_43.hispanic, actual.average_opp_43.hispanic ]
            white = [ensemble.average_opp_43.white,ensemble.max_opp_43.white, actual.average_opp_43.white]
        }
        else{
            asian = [ensemble.average_opp_50.asian,ensemble.max_opp_50.asian, actual.average_opp_50.asian ]
            aa = [ensemble.average_opp_50.aa,ensemble.max_opp_50.aa, actual.average_opp_50.aa]
            hispanic = [ensemble.average_opp_50.hispanic,ensemble.max_opp_50.hispanic, actual.average_opp_50.hispanic ]
            white = [ensemble.average_opp_50.white,ensemble.max_opp_50.white, actual.average_opp_50.white]
        }

        setAaOpp(aa)
        setAsianOpp(asian)
        setHispanicOpp(hispanic) 
        if (barChartData && ensembleData37 && ensembleData43 && ensembleData50 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let xAxes = Object.keys(ensembleData37)
            const opp37 = Object.values(ensembleData37)
            const opp43 = Object.values(ensembleData43)
            const opp50 = Object.values(ensembleData50)

            let toShow = opp37
            if (threshold === '37%') {
                toShow = opp37
            } else if (threshold === '43%') {
                toShow = opp43
            } else if (threshold === '50%') {
                toShow = opp50
            }
            const config = {
                type: "bar",
                data: {
                    labels: xAxes,
                    datasets: [{
                        label: '5000 Ensemble at '+ threshold,
                        data: toShow,
                        backgroundColor: ['#DE3700'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
            options: {
                    scales: {
                      y: {
                        title: {
                          display: true,
                          text: 'Number of Plans',
                          font: {weight:'bold', size:20}
                        }
                      },
                      x:{
                        title:{
                            display:true, 
                            text:"Number of " + mapSelection.selectedEthnicity + " Opportunity Districts",
                            font: {weight:'bold', size:20}
                        }
                      }
                    }     
                  }
            };
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, config);
        }
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }
    }, [barChartData, threshold, mapSelection.selectedEthnicity, mapSelection.selectedState, size]);

    const handleThresholdChange = (event) => {
        setThreshold(event.target.value);
    };
    const handleSizeChange = (event) => {
        setSize(event.target.value);
    }

    return (
        <div className = "chart-container" style={{ border: '4px solid #000' }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>Opportunity District Bar Chart</h1>
                <div id = "threshold">
                    <label htmlFor="party-select" id = "labelthresh">Select Threshold</label>
                    <select id="race-select" onChange={handleThresholdChange} value={threshold}>
                        <option value="37%">37%</option>
                        <option value="43%">43%</option>
                        <option value="50%">50%</option>
                    </select>
                </div>
                <Form>
                    <Form.Group controlId="selectBWEnsembleSize">
                    <Form.Control as="select" onChange = {handleSizeChange}>
                        <option value = "250">250</option>
                        <option value = "5000">5000</option>
                    </Form.Control>
                    </Form.Group>
                </Form>
                <canvas ref={canvasRef} width="200" height="75"></canvas>
                <table border = "1">
                    <tr>
                        <td></td>
                        <td>Average Ensemble Plan</td>
                        <td>Maximum Ensemble Plan</td>
                        <td>Enacted Plan</td>
                    </tr>
                    <tr>
                        <td>Number Black Opportunity Districts at {threshold}</td>
                        <td>{aaOpp[0]}</td>
                        <td>{aaOpp[1]}</td>
                        <td>{aaOpp[2]}</td>
                    </tr>
                    <tr>
                        <td>Number Asian Opportunity Districts at {threshold}</td>
                        <td>{asianOpp[0]}</td>
                        <td>{asianOpp[1]}</td>
                        <td>{asianOpp[2]}</td>
                    </tr>
                    <tr>
                        <td>Number Hispanic Opportunity Districts at {threshold}</td>
                        <td>{hispanicOpp[0]}</td>
                        <td>{hispanicOpp[1]}</td>
                        <td>{hispanicOpp[2]}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default EnsembleOpportunityGraph;

