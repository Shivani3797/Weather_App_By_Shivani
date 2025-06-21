const apiKey = 'ppDt---------------cqv'; // 🔁 Replace with your real key

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function updateUI(city, data) {
  // Update the main cards
  $("#temp").text(data.temp);
  $("#min_temp").text(data.min_temp);
  $("#max_temp").text(data.max_temp);
  $("#humidity").text(data.humidity);
  $("#wind_speed").text(data.wind_speed);
  $("#wind_degrees").text(data.wind_degrees);
  $("#cloud_pct").text(data.cloud_pct);
  $("#sunrise").text(formatTime(data.sunrise));
  $("#sunset").text(formatTime(data.sunset));

  // Update the table
  const today = new Date().toLocaleDateString('en-IN');
  $("#city-weather-table tr").each(function () {
    const rowCity = $(this).find("th").text().toLowerCase();
    if (rowCity === city.toLowerCase()) {
      const cells = $(this).find("td");
      cells.eq(0).text(today);
      cells.eq(1).text(`${data.cloud_pct}%`);
      cells.eq(2).text(`${data.feels_like}°C`);
      cells.eq(3).text(`${data.humidity}%`);
      cells.eq(4).text(`${data.max_temp}°C`);
      cells.eq(5).text(`${data.min_temp}°C`);
      cells.eq(6).text(formatTime(data.sunrise));
      cells.eq(7).text(formatTime(data.sunset));
      cells.eq(8).text(`${data.temp}°C`);
      cells.eq(9).text(`${data.wind_degrees}°`);
      cells.eq(10).text(`${data.wind_speed} km/h`);
    }
  });
}

function getWeather(city) {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/weather?city=' + encodeURIComponent(city + ',India'),
    headers: { 'X-Api-Key': apiKey },
    contentType: 'application/json',
    success: function (result) {
      updateUI(city, result);
    },
    error: function (jqXHR) {
      alert("❌ City not found or API error.");
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

// Handle search form
$("#cityForm").on("submit", function (e) {
  e.preventDefault();
  const city = $("#cityInput").val().trim();
  if (city !== "") {
    getWeather(city);
  }
});

// Load default cities
["Delhi", "Mumbai", "Bangalore"].forEach(city => getWeather(city));

