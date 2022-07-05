import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MapArticle.css';
import { create_kakao_map, add_marker, wtm_to_wsg } from 'jslib/kakaomap';

function MapArticle(props) {

    useEffect(() => {
        create_kakao_map('map', 37.5675, 126.98, 11);
        wtm_to_wsg(210821.835896495,428601.909355725, add_marker);
    }, []);
        
    return (
        <>
        <div id="map"></div>
        </>
    );
}

export default MapArticle;