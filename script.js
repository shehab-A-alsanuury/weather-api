function fetchWeather(cities) {
    const apiKey = '10723b234cbdfca9349b1f164dafd8b8'; 
    const cityArray = cities.split(',').map(city => city.trim()); 

    cityArray.forEach(city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching data for ${city}`);
                }
                return response.json();
            })
            .then(data => {
                renderWeather(data, city); 
            })
            .catch(error => console.error('Error:', error));
    });
}

function renderWeather(data, city) {
    const weatherResult = document.getElementById('weatherResult');
    const weather = ` 
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${data.main.temp} °c</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Condition: ${data.weather[0].icon}</p>
        <p>Condition: ${data.sys.type}</p>
        <p>Condition: ${data.sys.id}</p>
        <p>Condition: ${data.wind.speed}</p>

    `;
    weatherResult.innerHTML += weather; 
}

document.getElementById('getWeather').addEventListener('click', function() {
    const cities = document.getElementById('cities').value; 
    document.getElementById('weatherResult').innerHTML = ''; 
    fetchWeather(cities); 
});

