const getURL =
  'https://geo.ipify.org/api/v1?apiKey=at_ytkErHxGTlWJQuQ9dAVMaDpACP8Xq&ipAddress=';
var mymap;

async function fillDetails(data) {
  const ipField = document.getElementById('ip-address');
  const location = document.getElementById('location');
  const timeZone = document.getElementById('time-zone');
  const isp = document.getElementById('isp');

  ipField.innerText = data.ip;
  isp.innerText = data.isp;
  location.innerText =
    (data.location.region ? data.location.region : '') +
    (data.location.country ? ', ' + data.location.country : '') +
    (data.location.postalCode ? ', ' + data.location.postalCode : '');
  timeZone.innerText = 'UTC ' + data.location.timezone;
  constructMap(data.location.lat, data.location.lng);
}

async function getIPdetails() {
  const ipaddress = searchInput.value.trim();
  let apiURL = getURL + ipaddress;
  const res = await fetch(apiURL);
  const data = await res.json();
  console.log(data);
  fillDetails(data);
}

function constructMap(lat, lng) {
  if (mymap != undefined) mymap.remove();
  mymap = L.map('mapid').setView([lat, lng], 15);
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        'pk.eyJ1IjoiYmF0c3kyNDA3IiwiYSI6ImNrcjg1MmhvbDAxMzUyb3F1MmhmMjl6d2sifQ.FU3KYBWoOd_wCZfFSdDCcQ',
    }
  ).addTo(mymap);

  var markerIcon = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconAnchor: [22, 94],
  });

  var marker = L.marker([lat, lng], { icon: markerIcon }).addTo(mymap);
}

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('searchIP');

searchInput.addEventListener('click', (e) => {
  searchInput.value = '';
});

searchBtn.addEventListener('click', getIPdetails);

getIPdetails();
