import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Graph({ mapSelection, chartSelection }) {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (mapSelection.selectedState !== '' && chartSelection.selectedChartType === "Bar Chart" && chartSelection.selectedAreaType === "Currently Viewing State") {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let popdata;
            let dataentries;

            if (mapSelection.selectedState === "Georgia") {
                popdata = [5555483/10711908*100, 3320513/10711908*100, 50618/10711908*100, 479028/10711908*100, 1123457/10711908*100, 7299/10711908*100, 555059/10711908*100];
                dataentries = [115/180*100, 54/180*100, 7/180*100, 2/180*100,0/180*100,0/180*100];
            } else {
                popdata = [5112280/9288994*100, 1219770/9288994*100, 51186/9288994*100, 950000/9288994*100, 2002575/9288994*100, 3533/9288994*100, 1048641/9288994*100];
                dataentries = [55/80*100, 14/80*100, 3/80*100, 8/80*100,0/80*100,0/80*100];
            }

            const config = {
                type: "bar",
                data: {
                    labels: ['White', 'African American', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
                    datasets: [{
                        label: 'Number of District Representatives',
                        data: dataentries,
                        backgroundColor: ['#15DB95'],
                        borderColor: ['#182628'],
                        borderWidth: 1,
                        borderRadius: 5
                    }, {
                        label: 'Population By Race',
                        data: popdata,
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
    }, [mapSelection, chartSelection]);
    return (
        <div className="chart-container">
            <div>
                <div id="charttitle"></div>
                <canvas ref={canvasRef} width="250" height="200"></canvas>
                <canvas id="second-barchart" width="250" height="200"></canvas>
            </div>
        </div>
    );
}

export default Graph;
