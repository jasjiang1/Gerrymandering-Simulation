import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function VoteSeatShareGraph({ mapSelection, chartSelection }) {
    const canvasRef = useRef(null);
    const [voteSeatShareData, setVoteSeatShareData] = useState(null);
    const [loading, setLoading] = useState(true);
    const stateMapping = {
        "New Jersey": "NJ",
        "Georgia": "GA"
    };

    useEffect(() => {
        const fetchVoteSeatShareData = async () => {
            try {
                const state = stateMapping[mapSelection.selectedState];
                const url = `http://localhost:8080/api/graph/vote_seat_share_curve/${state}`;
                const response = await axios.get(url);
                const data = response.data;
                console.log("Fetched Data:", data);
                setVoteSeatShareData(data);
            } catch (error) {
                console.log("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVoteSeatShareData();
    }, [mapSelection, chartSelection]);

    useEffect(() => {
        if (voteSeatShareData && voteSeatShareData.vote_seat_share_curve && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: voteSeatShareData.vote_seat_share_curve.map(entry => entry.votes),
                    datasets: [
                        {
                            label: 'Republican Seats',
                            data: voteSeatShareData.vote_seat_share_curve.map(entry => entry.seatsR),
                            fill: true,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)'
                        },
                        {
                            label: 'Democratic Seats',
                            data: voteSeatShareData.vote_seat_share_curve.map(entry => entry.seatsD),
                            fill: true,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)'
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            title: { display: true, text: "% Vote Share", font: { weight: 'bold' } },
                            type: 'linear',
                            beginAtZero: true,
                        },
                        y: {
                            title: { display: true, text: "Seats Share", font: { weight: 'bold' } },
                            beginAtZero: true
                        }
                    }
                }
            });
            return () => {
                chartInstance.destroy();
            };
        }
    }, [voteSeatShareData]);

    console.log("VoteSeatShareData:", voteSeatShareData);
    console.log("Loading:", loading);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!voteSeatShareData || !voteSeatShareData.vote_seat_share_curve) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Vote-Seat Share Curve for {mapSelection.selectedState}</h1>
            <canvas ref={canvasRef} width="600" height="400"></canvas>
        </div>
    );
}

export default VoteSeatShareGraph;
