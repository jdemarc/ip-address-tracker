/*----- constants -----*/
const API_URL = '0'
const MAPBOX_ACCESS_KEY = '0'

/*----- app's state (variables) -----*/
let ipAddress;

/*----- cached element references -----*/
const submitBtnEl = document.getElementById('search');

const ipEl = document.getElementById('ip');
const locEl = document.getElementById('loc');
const tzEl = document.getElementById('tz');
const ispEl = document.getElementById('isp');

/*----- event listeners -----*/
submitBtnEl.addEventListener('click', handleSubmit);


/*----- functions -----*/
init();

function init() {
  ipAddress = '';

  queryAPI(ipAddress);
}

function handleSubmit() {
  ipAddress = document.getElementById('user-input').value;

  queryAPI(ipAddress);
}

function showAddress(address) {
  ipEl.textContent = address.ip;
  locEl.textContent = address.location;
  tzEl.textContent = address.timezone;
  ispEl.textContent = address.isp;
}

function showMap(coords) {
  if (L.DomUtil.get('map')) { 
    L.DomUtil.get('map')._leaflet_id = null; 
 }

  const myMap = L.map('map').setView([coords.lat, coords.lng], 15)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_ACCESS_KEY,
  }).addTo(myMap);

  var marker = L.marker([coords.lat, coords.lng]).addTo(myMap);
}

function queryAPI(ip) {
  fetch(API_URL + ip)
  .then((response) => {
    return response.json();
  })
  .then((result) => {

    const address = {
      ip: result.ip,
      location: `${result.location.city}, ${result.location.region}`,
      timezone: result.location.timezone,
      isp: result.isp
    }
    
    const coords = {
      lat: result.location.lat,
      lng: result.location.lng
    }

    showAddress(address);
    showMap(coords);
    
  })
  .catch((error) => {
    console.log('Error: ', error);
  })
}