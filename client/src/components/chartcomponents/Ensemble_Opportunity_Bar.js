import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function EnsembleOpportunityGraph({ mapSelection, chartSelection }) {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [barChartData, setBarChartData] = useState(null);
    const [threshold, setThreshold] = useState('37%');
    useEffect(() => {
         let state = mapSelection.selectedState;
          if(state === "Georgia"){
            state = "GA";
          }
          else{
            state = "NJ";
          }
        const fetchData = async () => {
            if (mapSelection.selectedState !== '' && chartSelection.selectedChartType === "Ensemble Opportunity Districts") {
                try {
                    const response = await axios.get(`http://localhost:8080/api/graph/ensembleOpp/${state}`);
                    setBarChartData(response.data);
                } catch (error) {
                    console.error('Error fetching bar chart data:', error);
                }
            }
        };
        fetchData();
    }, [mapSelection, chartSelection]);

    useEffect(() => {
        let ensemble;
        let actual
        
        if(barChartData != null){
            ensemble = barChartData[1];
            actual = barChartData[2];
            console.log(barChartData)
            
        
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
        else if(threshold === "40%"){
            asian = [ensemble.average_opp_40.asian,ensemble.max_opp_40.asian, actual.average_opp_40.asian ]
            aa = [ensemble.average_opp_40.aa,ensemble.max_opp_40.aa, actual.average_opp_40.aa]
            hispanic = [ensemble.average_opp_40.hispanic,ensemble.max_opp_40.hispanic, actual.average_opp_40.hispanic ]
            white = [ensemble.average_opp_40.white,ensemble.max_opp_40.white, actual.average_opp_40.white]
        }
        else{
            asian = [ensemble.average_opp_50.asian,ensemble.max_opp_50.asian, actual.average_opp_50.asian ]
            aa = [ensemble.average_opp_50.aa,ensemble.max_opp_50.aa, actual.average_opp_50.aa]
            hispanic = [ensemble.average_opp_50.hispanic,ensemble.max_opp_50.hispanic, actual.average_opp_50.hispanic ]
            white = [ensemble.average_opp_50.white,ensemble.max_opp_50.white, actual.average_opp_50.white]
        }

        if (barChartData && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            const config = {
                type: "bar",
                data: {
                    labels: ['Average_'+threshold, 'Maximum_'+threshold,'Actual_'+threshold],
                    datasets: [{
                        label: 'African American',
                        data: aa,
                        backgroundColor: ['#DE3700'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5
                    }, {
                        label: 'Asian',
                        data: asian,
                        backgroundColor: ['#F58B00'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5,
                    }
                    , {
                        label: 'Hispanic',
                        data: hispanic,
                        backgroundColor: ['#E1FF00'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5,
                    }
                ]
                },
            options: {
                    scales: {
                      y: {
                        title: {
                          display: true,
                          text: 'Number of Opportunity Districts'
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
    }, [barChartData, threshold]);

    const handleThresholdChange = (event) => {
        setThreshold(event.target.value);
    };

    return (
        <div className = "chart-container" style={{ border: '4px solid #000' }}>
            <div>
                <h1 style={{ textAlign: 'center' }}>5000-Ensemble Opportunity District Bar Chart</h1>
                <div id = "threshold">
                    <label htmlFor="party-select" id = "labelthresh">Select Threshold</label>
                    <select id="race-select" onChange={handleThresholdChange} value={threshold}>
                        <option value="37%">37%</option>
                        <option value="43%">43%</option>
                        <option value="50%">50%</option>
                    </select>
                </div>
                <canvas ref={canvasRef} width="200" height="75"></canvas>
            </div>
        </div>
    );
}

export default EnsembleOpportunityGraph;

