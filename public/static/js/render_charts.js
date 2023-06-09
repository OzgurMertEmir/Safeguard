let currentChart1 = null;
let currentChart2 = null;
let currentChart3 = null;
let currentChart4 = null;
let currentChart5 = null;

async function fetchAndRenderTrend1Chart(state) {
    const response = await fetch(`/severityToTimeIntervals/${state}`);
    const data = await response.json();
    const values = [];
    const labels = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5,
        17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5];
    let idx = 0;
    const data_points = data.forEach(d => {
        values[idx] = d[1];
        idx++;
    });

    const ctx = document.getElementById('trend1Chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Average Severity',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barPercentage: 1,
                    categoryPercentage: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    offset: false,
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Hours',
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Accidents',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        callback: (value) => {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        },
                    },
                    grid: {
                        display: false
                    },
                    min: 1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Number of Accidents vs Time Interval at ${state}`,
                    font: {
                        size: 28
                    }
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            if (!items.length) {
                                return '';
                            }
                            const item = items[0];
                            const x = item.parsed.x;
                            const min = x - 0.5;
                            const max = x + 0.5;
                            return `Hours: ${min} - ${max}`;
                        }
                    }
                }
            }
        }
    });
    currentChart1 = chart;
    return chart;
}

async function updateTrend1Chart(state) {

    if (!currentChart1) {
        return;
    }
    const response = await fetch(`/severityToTimeIntervals/${state}`);
    const data = await response.json();

    const labels = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5,
        17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5];
    const values = [];

    let idx = 0;
    const data_points = data.forEach(d => {
        values[idx] = d[1];
        idx++;
    });


    currentChart1.data.datasets[0].data = values;
    currentChart1.data.labels = labels;
    currentChart1.options.plugins.title.text = `Severity of Accidents vs Time of the Day at ${state}`;
    currentChart1.update();
}


async function fetchAndRenderTrend2Chart(weather, state, severityFilter) {
    const encodedWeather = encodeURIComponent(weather);
    const response = await fetch(`/severityToWeatherCondition/${encodedWeather}/${state}/${severityFilter}`);
    const data = await response.json();

    const labels = ['1', '2', '3', '4']
    const values = new Array(4).fill(0);
    for (let i = 0; i < data.length; i++){
        values[data[i][0]-1] = data[i][1]
    }

    const ctx = document.getElementById('trend2Chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Number of Accidents',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barPercentage: 0.65,
                    categoryPercentage: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    offset: true,

                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Severity',
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Number of Accidents',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        callback: (value) => {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        },
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Severity of Accidents vs Weather Conditions at ${state}, Weather Condition: ${weather}`,
                    font: {
                        size: 20
                    }
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            if (!items.length) {
                                return '';
                            }
                            const item = items[0];
                            const x = item.parsed.x;
                            return `Severity: ${labels[x]}`;
                        }
                    }
                }
            }
        }
    });
    currentChart2 = chart;
    return chart;
}

async function updateTrend2Chart(weather, state, severityFilter) {

    if (!currentChart2) {
        return;
    }
    const encodedWeather = encodeURIComponent(weather);
    const response = await fetch(`/severityToWeatherCondition/${encodedWeather}/${state}/${severityFilter}`);
    const data = await response.json();

    const labels = ['1', '2', '3', '4']
    const values = new Array(4).fill(0);
    for (let i = 0; i < data.length; i++){
        values[data[i][0]-1] = data[i][1]
    }
    currentChart2.data.datasets[0].data = values;
    currentChart2.data.labels = labels;
    currentChart2.options.plugins.title.text = `Severity of Accidents vs Weather Conditions at ${state}, Weather Condition: ${weather}`;
    currentChart2.update();

}

async function fetchAndRenderTrend3Chart(weather, state) {
    const encodedWeather = encodeURIComponent(weather);
    const response = await fetch(`/accidentProbabilityPerDayInMornings/${encodedWeather}/${state}`);
    const data = await response.json();
    const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const values = new Array(7).fill(0);
    for (let i = 0; i < data.length; i++){
        values[i] = data[i][1]
    }

    const ctx = document.getElementById('trend3Chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Number of Accidents',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barPercentage: 0.65,
                    categoryPercentage: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    offset: true,
                    grid: {
                        offset: true,
                        display: false,
                    },
                    title: {
                        display: true,
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Accidents',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        callback: (value) => {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        },
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Number of Accidents vs Morning of the Week at ${state}, Weather Condition: ${weather}`,
                    font: {
                        size: 20
                    }
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            if (!items.length) {
                                return '';
                            }
                        }
                    }
                }
            }
        }
    });
    currentChart3 = chart;
    return chart;
}

async function updateTrend3Chart(weather, state) {

    if (!currentChart3) {
        return;
    }
    const encodedWeather = encodeURIComponent(weather);
    const response = await fetch(`/accidentProbabilityPerDayInMornings/${encodedWeather}/${state}`);
    const data = await response.json();

    const values = new Array(7).fill(0);
    for (let i = 0; i < data.length; i++){
        values[i] = data[i][1]
    }
    currentChart3.data.datasets[0].data = values;
    currentChart3.options.plugins.title.text = `Number of Accidents vs Morning of the Week at ${state}, Weather Condition: ${weather}`;
    currentChart3.update();
}


async function fetchAndRenderTrend4Chart(zipCode) {
    const response = await fetch(`/accidentsPerTimeIntervals/${zipCode}`);
    const data = await response.json();


    // Generate hourly labels for the x-axis
    const labels = [];
    for (let i = 0; i < 24; i++) {
        const startHour = i;
        const endHour = i + 1;
        labels.push(`${startHour}`);
    }

    // Create an array of counts initialized with 0
    const counts = new Array(24).fill(0);

    // Fill in the counts based on the received data
    data.forEach(d => {
        const hour = parseInt(d[0].substring(0, 2), 10);
        counts[hour] = d[1];
    });
    // Histogram code from: https://leimao.github.io/blog/JavaScript-ChartJS-Histogram/
    const x_vals = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5,
                             17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5]
    const data_points = x_vals.map((k, i) => ({x: k, y: counts[i]}));
    const ctx = document.getElementById('accidentsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Number of Accidents',
                    data: data_points,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    barPercentage: 1,
                    categoryPercentage: 1,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    offset: false,
                    grid: {
                        display: false
                    },
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Hours',
                        font: {
                            size: 14
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Accidents',
                        font: {
                            size: 16
                        }
                    },
                    ticks: {
                        callback: (value) => {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        },
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `Number of Accidents vs Time Interval at ${zipCode} `,
                    font: {
                        size: 28
                    }
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            if (!items.length) {
                                return '';
                            }
                            const item = items[0];
                            const x = item.parsed.x;
                            const min = x - 0.5;
                            const max = x + 0.5;
                            return `Hours: ${min} - ${max}`;
                        }
                    }
                }
            }
        }
    });
    currentChart4 = chart;
    return chart;
}

async function updateTrend4Chart(zipCode) {
    if (!currentChart4) {
        return;
    }
    const response = await fetch(`/accidentsPerTimeIntervals/${zipCode}`);
    const data = await response.json();

    const counts = new Array(24).fill(0);

    data.forEach(d => {
        const hour = parseInt(d[0].substring(0, 2), 10);
        counts[hour] = d[1];
    });

    const x_vals = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5,
        17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5];
    const data_points = x_vals.map((k, i) => ({x: k, y: counts[i]}));
    currentChart4.data.datasets[0].data = data_points;
    currentChart4.options.plugins.title.text = `Number of Accidents vs Time Interval at ${zipCode}`;
    currentChart4.update();
}


async function fetchAndRenderTrend5Chart(trafficFeature,severityFilter){

    const response = await fetch(`/severityToTrafficCalming/${trafficFeature}/${severityFilter}`);
    const data = await response.json();

    const labels = ['1', '2', '3', '4']
    const values = new Array(4).fill(0);
    for (let i = 0; i < data.length; i++){
        values[data[i][0]-1] = data[i][1]
    }
    const ctx = document.getElementById('severityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Accident Count',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: `Severity of accidents in presence of ${trafficFeature}`,
                    font: {
                        size: 28
                    }

                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Severity Level',
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Accidents',
                        font: {
                            size: 16
                        }
                    },
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });
    currentChart5 = chart;
    return chart;
}


async function updateTrend5Chart(trafficFeature, severityFilter) {


    if (!currentChart5) {
        return;
    }
    const response = await fetch(`/severityToTrafficCalming/${trafficFeature}/${severityFilter}`);
    const data = await response.json();

    const labels = ['1', '2', '3', '4']
    const values = new Array(4).fill(0);
    for (let i = 0; i < data.length; i++){
        values[data[i][0]-1] = data[i][1]
    }
    currentChart5.data.datasets[0].data = values;
    currentChart5.options.plugins.title.text = `Severity of accidents in presence of ${trafficFeature}`;
    currentChart5.update();
}

function getSelectedTrafficFeature() {
    const trafficFeaturesSelect = document.getElementById("trafficFeatures");
    return trafficFeaturesSelect.value;
}
