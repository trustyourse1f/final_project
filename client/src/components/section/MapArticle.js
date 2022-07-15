import React, { useState, useEffect } from 'react';
import './MapArticle.css';
import KakaoMap from 'jslib/kakaomap';
import { useSelector, useDispatch } from 'react-redux';
import { setHospitals } from 'reduxapp/feature/hospitals';
import { setInfo } from 'reduxapp/feature/selected_info';
import axios from 'axios';


function MapArticle(props) {
    const [kmap, setKmap] = useState(null);
    const hospitals_info = useSelector(state => state.hospitals.value);
    const dispatch = useDispatch();

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/markerinfo'
        })
        .then(res => {
            dispatch(setHospitals(res.data));
            let tmp_map = new KakaoMap('map');
            for(let i=0; i<res.data.length; i++)
            {
                let mk = tmp_map.add_marker(res.data[i].latitude, res.data[i].longitude, true);
                tmp_map.deploymarker(mk);
                let infowindow = `<div class="infowin" id="h${i}">
                                    <h1>${res.data[i].name}</h1>
                                    <div class="infowindesc">${res.data[i].contract}<br/>
                                    ${res.data[i].address}</div>
                                    <button>예약하기</button></div>`;
                tmp_map.setInfoWindow(mk, infowindow, i, () => {
                    dispatch(setInfo(res.data[i]));
                });
            }
            setKmap(tmp_map);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);
        
    return (
        <>
        <div id="map"></div>
        </>
    );
}

export default MapArticle;