// Initialize Chart.js for Heart Rate
const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
const heartRateChart = new Chart(heartRateCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Heart Rate (bpm)',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false
        }]
    },
    options: { scales: { y: { beginAtZero: false } } }
});

// DOM elements
const form = document.getElementById('inputForm');
const alertDiv = document.getElementById('alert');
const latestHeartRateSpan = document.getElementById('latestHeartRate');
const latestStepsSpan = document.getElementById('latestSteps');
const latestSleepSpan = document.getElementById('latestSleep');
const latestRiskScoreSpan = document.getElementById('latestRiskScore');
const recommendationP = document.getElementById('recommendation');

// Fetch initial data
fetch('http://localhost:8000/data')
    .then(response => response.json())
    .then(data => updateChart(data))
    .catch(error => console.error('Error fetching initial data:', error));

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const heartRate = parseFloat(document.getElementById('heartRate').value);
    const steps = parseInt(document.getElementById('steps').value);
    const sleepHours = parseFloat(document.getElementById('sleepHours').value);

    fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heart_rate: heartRate, steps: steps, sleep_hours: sleepHours })
    })
    .then(response => response.json())
    .then(data => {
        // Update chart
        heartRateChart.data.labels.push(heartRateChart.data.labels.length);
        heartRateChart.data.datasets[0].data.push(data.heart_rate);
        if (heartRateChart.data.labels.length > 10) {
            heartRateChart.data.labels.shift();
            heartRateChart.data.datasets[0].data.shift();
        }
        heartRateChart.update();

        // Update metrics
        latestHeartRateSpan.textContent = data.heart_rate;
        latestStepsSpan.textContent = data.steps;
        latestSleepSpan.textContent = data.sleep_hours.toFixed(1);
        latestRiskScoreSpan.textContent = data.risk_score.toFixed(2);
        recommendationP.textContent = data.recommendation;

        // Alert if high risk
        if (data.risk_score > 0.7) {
            alertDiv.textContent = 'High health risk detected!';
            alertDiv.classList.remove('hidden');
        } else {
            alertDiv.classList.add('hidden');
        }
    })
    .catch(error => console.error('Error submitting data:', error));
});

// Helper function to update chart with initial data
function updateChart(data) {
    const heartRates = data.map(row => row[2]); // heart_rate from DB
    heartRateChart.data.labels = Array.from({ length: heartRates.length }, (_, i) => i);
    heartRateChart.data.datasets[0].data = heartRates;
    heartRateChart.update();

    if (data.length > 0) {
        const latest = data[data.length - 1];
        latestHeartRateSpan.textContent = latest[2];
        latestStepsSpan.textContent = latest[3];
        latestSleepSpan.textContent = latest[4].toFixed(1);
        latestRiskScoreSpan.textContent = latest[5].toFixed(2);
    }
}