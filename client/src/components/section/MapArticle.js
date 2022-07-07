import React, { useEffect } from 'react';
import './MapArticle.css';
import { create_kakao_map, tm_to_wsg } from 'jslib/kakaomap';
import { get_coordinates } from 'jslib/request/coordinate';

function MapArticle(props) {

    useEffect(() => {
        create_kakao_map('map', 37.5675, 126.98, 9);
        get_coordinates(tm_to_wsg);
    }, []);
        
    return (
        <>
        <div id="map"></div>
        </>
    );
}

export default MapArticle;