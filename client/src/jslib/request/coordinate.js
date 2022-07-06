import axios from 'axios';

function get_coordinates(callback) {
    //좌표를 받아와서 지도에 마커를 생성
    axios({
        method:'GET',
        url: '/coordinates'
    })
    .then(res => {
        let lth = res.data.length;
        for(let i = 0; i<lth; i++)
        {
            callback(res.data[i][0], res.data[i][1]);
        }
    })
    .catch(err => {
        console.error(err);
    });
}

export { get_coordinates };