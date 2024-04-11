var map;

function mapLoc(locationObject) {
    // Remove previous map instance if it exists
    if (map) {
        map.remove();
    }
    
    // Create a new map instance
    map = L.map('map').setView([locationObject.lat, locationObject.lng], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

async function fetchData(event) {
    const inputValue = document.querySelector(".inputIp").value;

    const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_DPgJr99ADb89gm3vXHGNJZ4Xhk8Ek&ipAddress=" + inputValue); // Replace with your API URL
    const data = await response.json();

    document.querySelector("#ipHone").innerHTML = inputValue; // Corrected line
    document.querySelector("#locationHone").innerHTML = data.location.city + ", " + data.location.country;
    document.querySelector("#timezoneHone").innerHTML = "UTC " + data.location.timezone;
    document.querySelector("#ispHone").innerHTML = data.isp;

    // Create a new object with the data
    const locationData = {
        lat: data.location.lat,
        lng: data.location.lng
    }

    // Call mapLoc with the location object
    mapLoc(locationData);
}

window.onload = async function() {
    // Fetch initial data when the page loads
    const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_DPgJr99ADb89gm3vXHGNJZ4Xhk8Ek"); // Fetch data without providing IP address
    const data = await response.json();

    // Set initial values on the page
    document.querySelector("#ipHone").innerHTML = ""; // No initial IP
    document.querySelector("#locationHone").innerHTML = data.location.city + ", " + data.location.country;
    document.querySelector("#timezoneHone").innerHTML = "UTC " + data.location.timezone;
    document.querySelector("#ispHone").innerHTML = data.isp;

    // Create a new object with the initial data
    const locationData = {
        lat: data.location.lat,
        lng: data.location.lng
    }

    // Call mapLoc with the initial location object
    mapLoc(locationData);
}