import axios from 'axios';

function post_reservation(req_data) {
    axios({
        method: 'POST',
        url: '/reserve',
        data: req_data
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })
}

function get_buisnesshour(hid) {
    axios({
        method: 'GET',
        url: '/buisnesshour?hospitalid=' + String(hid)
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    })
}

export { post_reservation, get_buisnesshour };