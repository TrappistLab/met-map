// Initialize the map
const map = L.map('map').setView([0 , 20], 3);

// Add OSM base layer
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add Google Satellite base layer
const googleSatelliteLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '© Google'
});

// Layer control
const baseLayers = {
    "OpenStreetMap": osmLayer,
    "Google Satellite": googleSatelliteLayer
};

const markersLayer = L.layerGroup();

// Add search control
const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
    console.log(e.geocode.name)
    console.log(e)
    const bbox = e.geocode.bbox;
    const poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
    ])
    map.fitBounds(poly.getBounds());
})
.addTo(map);



// Add markers for different locations in Africa

// Define a custom icon with a modified size
const customMarkerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Default marker icon URL
    iconSize: [15, 24], // Set the size of the icon (width, height) - Smaller size
    iconAnchor: [7.5, 24], // Anchor point of the marker (half of width and full height)
    popupAnchor: [0, -20], // Point from which the popup should open relative to the iconAnchor
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', // Shadow for the marker
    shadowSize: [24, 32], // Size of the shadow
    shadowAnchor: [7.5, 32] // Anchor point of the shadow (matches the smaller marker)

});



var stations

// Fetch the CSV file from the public folder
fetch('../public/african_stations_positions_addresses.csv')
.then(response => response.text()) // Get the file as text
.then(csvText => {
    // Use PapaParse to parse the CSV text
    const result = Papa.parse(csvText, {
        header: true,  // Use the first row as headers
        dynamicTyping: true // Automatically type numbers and booleans
    });

    // Display the JSON output
    stations = result.data

    stations.forEach(station => {

        const coords = [station.lat, station.lon]; // Extract the latitude and longitude
        const name = station.ID; // Use the address as the popup content
        console.log(name, coords)
        L.marker(coords, { icon: customMarkerIcon }).bindPopup(name).addTo(markersLayer);
    });
})
.catch(error => {
    console.error('Error fetching the CSV file:', error);
});







// Add the markersLayer to the map and the layer control
markersLayer.addTo(map);

const overlayLayers = {
    "Weather Station": markersLayer
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

map.on('mouseover', function () {
    console.log('Your mouse is over the map');
});

map.on('mousemove', function (e) {
    document.getElementsByClassName('coordinate')[0].innerHTML = 'Lat: '+ e.latlng.lat.toFixed(5) + ', Lng: '+ e.latlng.lng.toFixed(5);
    console.log('Lat: '+ e.latlng.lat.toFixed(5), 'Lng: '+ e.latlng.lng.toFixed(5));
});




