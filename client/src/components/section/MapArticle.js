import React, { useState, useEffect } from 'react';
import './MapArticle.css';
import KakaoMap from 'jslib/kakaomap';
import { get_markerinfo } from 'jslib/request/markerinfo';

function MapArticle(props) {
    const [kmap, setKmap] = useState(null);

    useEffect(() => {
        setKmap(new KakaoMap('map'));
    }, []);

    useEffect(() => {
        if(kmap !== null) {
            get_markerinfo(kmap);
        }
    },[kmap]);
        
    return (
        <>
        <div id="map"></div>
        </>
    );
}

export default MapArticle;