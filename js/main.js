/*----- constants -----*/
const API_URL = ''

/*----- app's state (variables) -----*/
let ipAddress;

/*----- cached element references -----*/
const submitBtnEl = document.getElementById('search');
const main = document.querySelector('main');

/*----- event listeners -----*/
submitBtnEl.addEventListener('click', handleSubmit);


/*----- functions -----*/
init();

function init() {
  ipAddress = '8.8.8.8';
  //queryAPI(ipAddress);

}

function handleSubmit() {
  ipAddress = document.getElementById('user-input').value;

  queryAPI(ipAddress);
  // query API
}

function showAddress(address) {
  const section = document.createElement('section');
  section.setAttribute('class', 'tracked');
  
  main.appendChild(section);
  
  for (property in address) {
    const div = document.createElement('div');
    div.setAttribute('class', 'address-info');
    div.textContent = address[property];

    section.appendChild(div);
  }

  showMap(address.lat, address.lng);
}

function showMap(lat, lng) {
  let myMap = L.map('map').setView([lat, lng], 15)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ''
  }).addTo(myMap);

  var marker = L.marker([lat, lng]).addTo(myMap);
}

function queryAPI(ip) {
  fetch(API_URL + ip)
  .then((response) => {
    return response.json();
  })
  .then((result) => {

    const address =  {
      ip: result.ip,
      region: result.location.region,
      city: result.location.city,
      lat: result.location.lat,
      lng: result.location.lng,
      timezone: result.location.timezone
    }

    // console.log(address);
    showAddress(address);
    
  })
  .catch((error) => {
    console.log('Error: ', error);
  })
}
