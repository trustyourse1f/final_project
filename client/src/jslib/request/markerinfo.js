import axios from 'axios';

const { kakao } = window;

async function get_markerinfo(kakaomapapi) {
    try{
        const res = await axios({
                    method:'GET',
                    url: '/markerinfo'
                    });
        for(let i=0; i<res.data.length; i++)
        {
            const cbk = (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    let mk = kakaomapapi.add_marker(result[0].y, result[0].x);
                    kakaomapapi.deploymarker(mk);
                    kakaomapapi.settitle(mk, res.data[i].title);
                }
            }
            kakaomapapi.transcoord_TM(res.data[i].x, res.data[i].y, cbk);
        }
    }
    catch(err) {
        console.error(err);
    }
}

export { get_markerinfo };