let currentChart4 = null;
let currentChart5 = null;
async function fetchAndRenderTrend4Chart(zipCode) {
    const response = await fetch(`/accidentsPerTimeIntervals/${zipCode}`);
    const data = await response.json();

    console.log('data:', data);

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
    console.log(counts)
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
                        offset: false
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
                            size: 14
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
                    text: `Number of Accidents vs Time Interval at ${zipCode} `,
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
    console.log(currentChart4.data.datasets[0].data)
    currentChart4.options.plugins.title.text = `Number of Accidents vs Time Interval at ${zipCode}`;
    currentChart4.update();
}


async function fetchAndRenderTrend5Chart(trafficFeature){

    const response = await fetch(`/severityToTrafficCalming/${trafficFeature}`);
    const data = await response.json();

    const ctx = document.getElementById('severityChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4'],
            datasets: [
                {
                    label: 'Severity Count',
                    data: data,
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
                        text: 'Count',
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














async function fetchAndRenderTrend3Chart(weather, state) {
    const response = await fetch(`/accidentProbabilityPerDayInMornings/${weather}/${state}`);
    const data = await response.json();
    const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const values = new Array(7).fill(0);
    const data_points = data.forEach(d => {
        const day = d[0];
        let idx = 0;
        switch (day) {
            case "Monday":
              idx = 0;
              break;
            case "Tuesday":
              idx = 1;
              break;
            case "Wednesday":
              idx = 2;
              break;
            case "Thursday":
              idx = 3;
              break;
            case "Friday":
              idx = 4;
              break;
            case "Saturday":
              idx = 5;
              break;
            case "Sunday":
              idx = 6;
              break;
            default:
                console.log(day);
          }
          console.log(d[1]);
        values[idx] = d[1];
    });;
    const ctx = document.getElementById('trend3Chart').getContext('2d');
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
                        offset: false
                    },
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Day',
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
                            size: 14
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
                    text: `Number of Accidents vs Morning of the Week at ${state}, Weather Condition: ${weather}`,
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
    currentChart5 = chart;
    return chart;
}

async function updateQuery3(weather, state) {

    if (!currentChart5) {
        return;
    }
    const response = await fetch(`/accidentProbabilityPerDayInMornings/${weather}/${state}`);
    const data = await response.json();

    currentChart5.data.datasets[0].data = data;
    currentChart5.update();
}
async function updateTrend5Chart(trafficFeature) {


    if (!currentChart5) {
        return;
    }
    const response = await fetch(`/severityToTrafficCalming/${trafficFeature}`);
    const data = await response.json();

    currentChart5.data.datasets[0].data = data;
    currentChart5.options.plugins.title.text = `Severity of accidents in presence of ${trafficFeature}`;
    currentChart5.update();
}

function getSelectedTrafficFeature() {
    const trafficFeaturesSelect = document.getElementById("trafficFeatures");
    return trafficFeaturesSelect.value;
}
