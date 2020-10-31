/*----- constants -----*/
const API_URL = ''

/*----- app's state (variables) -----*/
let ipAddress;

/*
  const address = {
    ip: ''; // "8.8.8.8"
    region: ''; // "California"
    city: ''; // "Mountain View"
    lat: 0; // 37.40599
    lng: 0; // -122.078514
    timezone: ''; // "-07:00",

  }
*/

/*----- cached element references -----*/
const submitBtnEl = document.getElementById('search');
const main = document.querySelector('main');

/*----- event listeners -----*/
submitBtnEl.addEventListener('click', handleSubmit);


/*----- functions -----*/
init();

function init() {
  ipAddress = null;


}

function handleSubmit() {
  ipAddress = document.getElementById('user-input').value;

  console.log(ipAddress);

  queryAPI(ipAddress);
  // query API
}

function showAddress(result) {
  const section = document.createElement('section');
  section.setAttribute('class', 'tracked');
  
  main.appendChild(section);
  
  for (property in result) {
    const div = document.createElement('div');
    div.textContent = result[property];

    section.appendChild(div);
  }
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

    console.log(address);
    showAddress(address);
    
  })
  .catch((error) => {
    console.log('Error: ', error);
  })
}
