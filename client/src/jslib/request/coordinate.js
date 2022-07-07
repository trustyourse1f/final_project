import axios from 'axios';

async function get_coordinates(callback) {
    try{
        const res = await axios({
                    method:'GET',
                    url: `/coordinates`
                    });
        for(let i=0; i<res.data.length; i++)
        {
            callback(res.data[i][0], res.data[i][1]);
        }
    }
    catch(err) {
        console.error(err);
    }
}

export { get_coordinates };