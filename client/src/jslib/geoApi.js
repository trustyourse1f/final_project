import axios from 'axios';

function getGeoPosition(setpos = (lat, lng) => {console.log(lat,lng);}) {
    navigator.geolocation.getCurrentPosition((position) => {
        setpos(position.coords.latitude, position.coords.longitude);
    });
}

function findNearestHospital(lat, lng) {
    return axios({
        method: 'GET',
        url: `/distance?latitude=${lat}&longitude=${lng}`
    })
    .then(res => {
        return res;
    });
}

export { getGeoPosition, findNearestHospital };