import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';
import {isMobile} from 'jslib/device_detector';

function ChatBot(props) {

    const { kakao } = window;

    useEffect(() => {
        const container = document.getElementById('map');
		const options = {
			center: new kakao.maps.LatLng(35.154301, 129.061897),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
    }, []);
        
    return (
        <>
        <div id="map" style={{width:'500px',height:'400px'}}></div>
        </>
    );
}

export default ChatBot;