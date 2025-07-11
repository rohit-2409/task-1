document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "8a526de249f6723eb8fe006bfb50e190";
    const weatherInfo = document.getElementById("weatherInfo");

    if (city === "") {
        weatherInfo.innerHTML = "<p>⚠️ Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    weatherInfo.innerHTML = "🔄 Loading...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            weatherInfo.innerHTML = `
                <div class="weather-card">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                    <div>
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>🌡 <b>${data.main.temp}°C</b> (${data.weather[0].description})</p>
                        <p>💨 Wind: <b>${data.wind.speed} m/s</b></p>
                        <p>💧 Humidity: <b>${data.main.humidity}%</b></p>
                    </div>
                </div>
            `;
        } else {
            weatherInfo.innerHTML = `<p>❌ ${data.message}</p>`;
        }
    } catch (error) {
        console.error(error);
        weatherInfo.innerHTML = "<p>⚠️ Failed to fetch data. Check your connection.</p>";
    }
}
