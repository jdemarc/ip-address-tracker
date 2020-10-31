/*----- constants -----*/
const API_URL = ''

/*----- app's state (variables) -----*/
let ipAddress;

/*
  const data = {
    region: ''; // "California"
    city: ''; // "Mountain View"
    lat: 0; 37.40599
    lng: 0; -122.078514
    timezone: ''; "-07:00",

  }
*/

/*----- cached element references -----*/
const submitBtnEl = document.getElementById('search');

/*----- event listeners -----*/
submitBtnEl.addEventListener('click', handleSubmit);


/*----- functions -----*/
init();

function init() {
  ipAddress = null;

  // render();
}

function handleSubmit() {
  ipAddress = document.getElementById('user-input').value;

  console.log(ipAddress);

  //queryAPI(ipAddress);
  // query API
}

function render() {
  // render API content
}

function queryAPI(ip) {
  fetch(API_URL + ip)
  .then((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(`Region: ${result.location.region}`);
  })
}
