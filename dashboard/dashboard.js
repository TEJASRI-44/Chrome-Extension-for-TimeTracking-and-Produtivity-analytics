async function fetchAnalytics() {
  const userId = "user123"; // Replace with dynamic user ID
  const res = await fetch(`http://localhost:5000/api/analytics/weekly/${userId}`);
  const data = await res.json();

  const labels = data.map(entry => entry.domain);
  const times = data.map(entry => entry.timeSpent / 60000); // convert ms to minutes
console.log("📊 Fetched data:", data);
  const ctx = document.getElementById("usageChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Time Spent (minutes)",
        data: times,
        backgroundColor: times.map(time => time > 30 ? "red" : "green")
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

fetchAnalytics();
