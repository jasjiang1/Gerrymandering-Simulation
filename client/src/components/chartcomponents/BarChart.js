import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function Graph({ mapSelection, chartSelection }) {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const [barChartData, setBarChartData] = useState(null);

    useEffect(() => {
        const state = mapSelection.selectedState.toLowerCase().replace(/\s/g, '');
        const fetchData = async () => {
            if (mapSelection.selectedState !== '' && chartSelection.selectedChartType === "Bar Chart" && chartSelection.selectedAreaType === "Currently Viewing State") {
                try {
                    console.log(mapSelection.selectedState);
                    const response = await axios.get(`http://localhost:8080/api/graph/barchart/${state}`);
                    console.log(response);
                    console.log(response.data);
                    setBarChartData(response.data);
                } catch (error) {
                    console.error('Error fetching bar chart data:', error);
                }
            }
        };
        fetchData();
    }, [mapSelection, chartSelection]);

    useEffect(() => {
        if (barChartData && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            const config = {
                type: "bar",
                data: {
                    labels: ['White', 'African American', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
                    datasets: [{
                        label: 'Number of District Representatives',
                        data: barChartData.districtRepresentativesPercentages,
                        backgroundColor: ['#15DB95'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5
                    }, {
                        label: 'Population By Race',
                        data: barChartData.populationPercentages,
                        backgroundColor: ['#0074E1'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5,
                    }]
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
    }, [barChartData]);

    return (
        <div className="chart-container">
            <div>
                <div id="charttitle">{mapSelection.selectedState} Bar Chart</div>
                <canvas ref={canvasRef} width="250" height="200"></canvas>
            </div>
        </div>
    );
}

export default Graph;

