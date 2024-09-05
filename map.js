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
const locations = [
    { name: "Station 2", coords: [6.652577, 3.285758] },
    { name: "Station 3", coords: [6.614550, 3.506447] },
    { name: "Station 1", coords: [6.474621, 3.610795] },
    { name: "Station 4", coords: [6.715674, 3.274769] },
    { name: "Station 5", coords: [6.4700, 3.6752] }
];
locations.forEach(location => {
    L.marker(location.coords).bindPopup(location.name).addTo(markersLayer);
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
