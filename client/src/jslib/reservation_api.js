import axios from 'axios';

function post_reservation(req_data) {
    if(req_data.Time === 0) {
        return Promise.reject('time is not selected');
    }
    return axios({
        method: 'POST',
        url: '/reserve',
        data: req_data
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
        throw err;
    })
}

function get_buisnesshour(hid, set_cbk) {
    return axios({
        method: 'GET',
        url: '/buisnesshour?hospitalid=' + String(hid)
    })
    .then(res => {
        set_cbk(res.data);
    })
    .catch(err => {
        console.error(err);
    });
}

function get_reservationtable(hid, set_cbk) {
    return axios({
        method: 'GET',
        url: '/reserveinfo?hospitalid=' + String(hid)
    })
    .then(res => {
        set_cbk(res.data);
        return res;
    })
    .catch(err => {
        console.error(err);
    })
}

export { post_reservation, get_buisnesshour, get_reservationtable };