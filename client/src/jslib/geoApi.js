import axios from 'axios';

function getGeoPosition(setpos = (lat, lng) => {console.log(lat,lng);}) {
    navigator.geolocation.getCurrentPosition((position) => {
        setpos(position.coords.latitude, position.coords.longitude);
    });
}

function findNearestHospital(lat, lng) {
    axios({
        method: 'GET',
        url: `/distance?latitude=${lat}&longitude=${lng}`
    })
    .then(res => {
        console.log(res.data);
    });
}

export { getGeoPosition, findNearestHospital };