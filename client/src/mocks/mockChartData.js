import Chart from 'chart.js/auto';
import { LinearScale, CategoryScale } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import regression from 'regression';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';

export function renderBarCharts({ mapSelection, chartSelection, showmodal }) {
    var dataentries;
    Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);
    if (document.getElementById("barchart") !== null && (mapSelection.selectedState !== '')) {
        var canvas = document.getElementById("barchart");
        var secondCanvas = document.getElementById("second-barchart"); // New canvas element for the second chart
        if (chartSelection.selectedChartType === "Bar Chart" && showmodal) {
            if (mapSelection.selectedState === "Georgia") {
                dataentries = [115, 54, 7, 2];
                document.getElementById("contained-modal-title-vcenter").innerHTML = "Ethnicity of District Representatives (Georgia Vs. New Jersey)";
            }
            else if (mapSelection.selectedState === "New Jersey") {
                dataentries = [55, 14, 3, 8];
                document.getElementById("contained-modal-title-vcenter").innerHTML = "Ethnicity of District Representatives (New Jersey Vs. Georgia)";
            }
            var config = {
                type: "bar",
                data: {
                    labels: ['White', 'African American', 'Asian American', 'Latino'],
                    datasets: [{
                        label: 'Number of District Representatives',
                        data: dataentries,
                        backgroundColor: ['lightblue',
                            'pink',
                            'violet',
                            'lightgreen'],
                        borderColor: [
                            'blue',
                            'red',
                            'purple',
                            'green'
                        ],
                        borderWidth: 1
                    }],
                }
            }
            var barchart = new Chart(canvas, config);
            var secondDataentries;
            if (mapSelection.selectedState === "Georgia") {
                secondDataentries = [55, 14, 3, 8];
            }
            else if (mapSelection.selectedState === "New Jersey") {
                secondDataentries = [115, 54, 7, 2];
            }
            var secondConfig = {
                type: "bar",
                data: {
                    labels: ['White', 'African American', 'Asian American', 'Latino'],
                    datasets: [{
                        label: 'Number of District Representatives',
                        data: secondDataentries,
                        backgroundColor: ['lightblue',
                            'pink',
                            'violet',
                            'lightgreen'],
                        borderColor: [
                            'blue',
                            'red',
                            'purple',
                            'green'
                        ],
                        borderWidth: 1
                    }],
                }
            }
            let secondBarchart = new Chart(secondCanvas, secondConfig);
            return [barchart, secondBarchart];
        }  else if (chartSelection.selectedChartType === "Pie Chart") {
            let canvas = document.getElementById("barchart");
            let secondCanvas = document.getElementById("second-barchart"); 

            let dataentries;
            let dataentries2;

            if (mapSelection.selectedState === "Georgia") {
                dataentries = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
                dataentries2 = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
            } else {
                dataentries = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
                dataentries2 = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
            }

            var config = {
                type: "pie",
                data: {
                    labels: ['White', 'African American', 'American Indian', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
                    datasets: [{
                        label: 'Population By Race',
                        data: dataentries,
                        backgroundColor: [
                            'lightblue',
                            'pink',
                            'violet',
                            'lightgreen',
                            "yellow",
                            "lightred",
                            "orange"
                        ],
                        borderColor: 'red',
                        borderWidth: 2
                    }],
                },
                options: {
                    plugins: {
                        datalabels: {
                            textAlign: 'center',
                            backgroundColor: "lightblue",
                            borderRadius: 5,
                            borderColor: 'red',
                            borderWidth: 1,
                            font: {
                                weight: 'bold',
                                size: 13,
                            },
                            color: 'black',
                            formatter: (value, cxt) => {
                                var data = cxt.chart.data.datasets[0].data;
                                var index = 0;
                                var sum = 0;
                                while (data[index] != null) {
                                    sum += data[index];
                                    index++;
                                }
                                var percent = value / sum * 100;
                                return (percent.toFixed(2) + "%");
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            };

            var configSecond = {
                type: "pie",
                data: {
                    labels: ['White', 'African American', 'American Indian', 'Asian American', 'Latino', 'Native Hawaiin', 'Other'],
                    datasets: [{
                        label: 'Population By Race',
                        data: dataentries2,
                        backgroundColor: [
                            'lightblue',
                            'pink',
                            'violet',
                            'lightgreen',
                            "yellow",
                            "lightred",
                            "orange"
                        ],
                        borderColor: 'red',
                        borderWidth: 2
                    }],
                },
                options: {
                    plugins: {
                        datalabels: {
                            textAlign: 'center',
                            backgroundColor: "lightblue",
                            borderRadius: 5,
                            borderColor: 'red',
                            borderWidth: 1,
                            font: {
                                weight: 'bold',
                                size: 13,
                            },
                            color: 'black',
                            formatter: (value, cxt) => {
                                var data = cxt.chart.data.datasets[0].data;
                                var index = 0;
                                var sum = 0;
                                while (data[index] != null) {
                                    sum += data[index];
                                    index++;
                                }
                                var percent = value / sum * 100;
                                return (percent.toFixed(2) + "%");
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            };

            document.getElementById("contained-modal-title-vcenter").innerHTML = "Population By Race";

            var piechart = new Chart(canvas, config);
            var piechartSecond = new Chart(secondCanvas, configSecond);
            return [piechart, piechartSecond]
        }else if (chartSelection.selectedChartType === "Box and Whiskers") {
            let canvas = document.getElementById("barchart");
            let secondCanvas = document.getElementById("second-barchart");

            let dataentries;
            let dataentries2;

            if (mapSelection.selectedState === "Georgia") {
                dataentries = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
                dataentries2 = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
            } else {
                dataentries = [5112280, 1219770, 51186, 950000, 2002575, 3533, 1048641];
                dataentries2 = [5555483, 3320513, 50618, 479028, 1123457, 7299, 555059];
            }

            var config = {
                type: "boxplot",
                options: {
                    scales: {
                        y: {
                            label: "% Minority Group",
                            max: 100,
                            title: {
                                display: true,
                                text: '% Minority Population'
                            }
                        },
                    }
                },
                data: {
                    labels: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7'],
                    datasets: [{
                        label: '% of Minority',
                        backgroundColor: [
                            'lightblue',
                            '#b2eee6',
                            '#8ad6cc',
                            '#66beb2',
                            "#f97171",
                            "#f99192",
                            "pink"
                        ],
                        borderColor: [
                            'red',
                            'blue',
                            'red',
                            'green',
                            "green",
                            "purple",
                            "blue"
                        ],
                        borderWidth: 1,
                        padding: 10,
                        itemRadius: 0,
                        itemStyle: 'circle',
                        outlierRadius: 3,
                        outlierBackgroundColor: 'red',
                        data: [
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                            [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                            [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
                            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                            [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
                            [7, 14, 21, 28, 35, 42, 49, 56, 63, 70]
                        ]
                    }]
                }
            };

            var configSecond = {
                type: "boxplot",
                options: {
                    scales: {
                        y: {
                            label: "% Minority Group",
                            max: 100,
                            title: {
                                display: true,
                                text: '% Minority Population'
                            }
                        },
                    }
                },
                data: {
                    labels: ['District 1', 'District 2', 'District 3', 'District 4', 'District 5', 'District 6', 'District 7'],
                    datasets: [{
                        label: '% of Minority',
                        backgroundColor: [
                            'lightblue',
                            '#b2eee6',
                            '#8ad6cc',
                            '#66beb2',
                            "#f97171",
                            "#f99192",
                            "pink"
                        ],
                        borderColor: [
                            'red',
                            'blue',
                            'red',
                            'green',
                            "green",
                            "purple",
                            "blue"
                        ],
                        borderWidth: 1,
                        padding: 10,
                        itemRadius: 0,
                        itemStyle: 'circle',
                        outlierRadius: 3,
                        outlierBackgroundColor: 'red',
                        data: [
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
                            [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
                            [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
                            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
                            [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
                            [7, 14, 21, 28, 35, 42, 49, 56, 63, 70]
                        ]
                    }]
                }
            };

            document.getElementById("contained-modal-title-vcenter").innerHTML = "%Vote Share of Minority ";
            var boxplot = new Chart(canvas, config);
            var boxplotSecond = new Chart(secondCanvas, configSecond);
            return [boxplot, boxplotSecond]
        } else if (chartSelection.selectedChartType === "Scatter Plot" && chartSelection.selectedAreaType === "Currently Viewing State") {
            let canvas = document.getElementById("barchart");
            let secondCanvas = document.getElementById("second-barchart");
            var Dregdata1;
var Rregdata1;
var regression_D1;
var regression_R1;
var dataentriesD1;
var dataentriesR1;

if (mapSelection.selectedState === "Georgia") {
    dataentriesR1 = [
        [10, 70],
        [20, 65],
        [40, 55],
        [60, 20],
        [80, 15],
        [90, 10],
        [95, 5]
    ];
    dataentriesD1 = [
        [1, 10],
        [20, 25],
        [35, 39],
        [40, 60],
        [55, 55],
        [65, 75]
    ];
} else {
    // Data for New Jersey
    dataentriesR1 = [
        [5, 65],
        [15, 60],
        [30, 50],
        [50, 15],
        [70, 10],
        [85, 5],
        [90, 1]
    ];
    dataentriesD1 = [
        [2, 15],
        [18, 30],
        [35, 40],
        [45, 55],
        [60, 50],
        [70, 65],
        [80, 80]
    ];
}

// Perform regression analysis for Georgia
const dataD1 = dataentriesD1;
const dataR1 = dataentriesR1;
regression_D1 = regression.polynomial(dataD1);
regression_R1 = regression.polynomial(dataR1);
Dregdata1 = regression_D1.points.map(([x, y]) => { return { x, y }; });
Rregdata1 = regression_R1.points.map(([x, y]) => { return { x, y }; });

// Configuration for Georgia
var config1 = {
    type: "scatter",
    data: {
        datasets: [{
                label: 'Democratic',
                backgroundColor: 'blue',
                data: dataentriesD1,
                type: 'scatter',
            },
            {
                label: 'Republican',
                backgroundColor: 'red',
                data: dataentriesR1,
                type: 'scatter'
            },
            {
                label: "line",
                data: Dregdata1,
                type: 'line',
                borderWidth: 1,
                borderColor: 'lightblue'
            },
            {
                label: "line",
                data: Rregdata1,
                type: 'line',
                borderWidth: 1,
                borderColor: 'pink',
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    filter: label => label.text != "line"
                }
            }
        },
        scales: {
            y: {
                max: 100,
                title: {
                    display: true,
                    text: '% Vote Share'
                }
            },
            x: {
                max: 100,
                title: {
                    display: true,
                    text: '% Minority Population'
                }
            }
        }
    }
};

// Now, you can use `config1` for Georgia

// Reset variables for New Jersey
var Dregdata2;
var Rregdata2;
var regression_D2;
var regression_R2;
var dataentriesD2;
var dataentriesR2;

if (mapSelection.selectedState === "New Jersey") {
    dataentriesR2 = [
        [5, 65],
        [15, 60],
        [30, 50],
        [50, 15],
        [70, 10],
        [85, 5],
        [90, 1]
    ];
    dataentriesD2 = [
        [2, 15],
        [18, 30],
        [35, 40],
        [45, 55],
        [60, 50],
        [70, 65],
        [80, 80]
    ];
}

// Perform regression analysis for New Jersey
const dataD2 = dataentriesD2;
const dataR2 = dataentriesR2;
regression_D2 = regression.polynomial(dataD2);
regression_R2 = regression.polynomial(dataR2);
Dregdata2 = regression_D2.points.map(([x, y]) => { return { x, y }; });
Rregdata2 = regression_R2.points.map(([x, y]) => { return { x, y }; });

// Configuration for New Jersey
var config2 = {
    type: "scatter",
    data: {
        datasets: [{
                label: 'Democratic',
                backgroundColor: 'blue',
                data: dataentriesD2,
                type: 'scatter',
            },
            {
                label: 'Republican',
                backgroundColor: 'red',
                data: dataentriesR2,
                type: 'scatter'
            },
            {
                label: "line",
                data: Dregdata2,
                type: 'line',
                borderWidth: 1,
                borderColor: 'lightblue'
            },
            {
                label: "line",
                data: Rregdata2,
                type: 'line',
                borderWidth: 1,
                borderColor: 'pink',
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    filter: label => label.text != "line"
                }
            }
        },
        scales: {
            y: {
                max: 100,
                title: {
                    display: true,
                    text: '% Vote Share'
                }
            },
            x: {
                max: 100,
                title: {
                    display: true,
                    text: '% Minority Population'
                }
            }
        }
    }
};
            document.getElementById("contained-modal-title-vcenter").innerHTML = "Precinct Analysis";
            if (canvas && secondCanvas) {
            var scatterPlotD = new Chart(canvas, config1);
            var scatterPlotR = new Chart(secondCanvas, config2);
            }
            return [scatterPlotD, scatterPlotR]
        }
}
}
