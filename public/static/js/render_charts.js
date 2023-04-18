async function fetchAndRenderAccidentsChart(zipCode) {
    const response = await fetch(`/accidentsPerTimeIntervals/${zipCode}`);
    const data = await response.json();

    console.log('data:', data);

    // Generate hourly labels for the x-axis
    const labels = [];
    for (let i = 0; i < 24; i++) {
        const startHour = i.toString().padStart(2, '0');
        const endHour = (i + 1).toString().padStart(2, '0');
        labels.push(`${startHour}:00-${endHour}:00`);
    }

    // Create an array of counts initialized with 0
    const counts = new Array(24).fill(0);

    // Fill in the counts based on the received data
    data.forEach(d => {
        const hour = parseInt(d[0].substring(0, 2), 10);
        counts[hour] = d[1];
    });

    const ctx = document.getElementById('accidentsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Number of Accidents',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1, // Use 1 or an appropriate number for your data scale
                    },
                },
            },
        },
    });
}
