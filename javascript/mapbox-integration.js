// Mapbox Integration Script

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbGptYXBib3giLCJhIjoiY21hdzdrd3VtMGFyMDJscXllbXd0dGlzaiJ9.dOD6EZCPpbhiW0iriMh9Yw';

// Fixed coordinates (latitude, longitude)
// Example: Cape Town, South Africa
const fixedCoordinates = [18.4241, -33.9249]; // [longitude, latitude]

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get the map container
    const mapContainer = document.querySelector('.map-container');
    
    // Clear any placeholder content
    mapContainer.innerHTML = '';
    
    // Create a div for the map
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '100%';
    mapContainer.appendChild(mapDiv);
    
    // Initialize the Mapbox map
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12', // Map style
        center: fixedCoordinates, // [lng, lat]
        zoom: 14 // Zoom level (0-22, higher = closer)
    });
    
    // Add navigation controls (zoom in/out buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add a marker at the fixed location
    const marker = new mapboxgl.Marker({
        color: '#d4816f' // Matching your theme color
    })
        .setLngLat(fixedCoordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML('<h3 style="margin:0 0 10px 0; color:#d4816f;">Our Location</h3><p style="margin:0;">Visit us here!</p>')
        )
        .addTo(map);
    
    // Optional: Show popup on load
    marker.togglePopup();
});