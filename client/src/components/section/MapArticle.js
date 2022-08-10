import React, { useState, useEffect } from 'react';
import 'assets/CSS/MapArticle.css';
import KakaoMap from 'jslib/kakaomap';
import { getGeoPosition, findNearestHospital } from 'jslib/geoApi';
import { useSelector, useDispatch } from 'react-redux';
import { setHospitals } from 'reduxapp/feature/hospitals';
import { setInfo } from 'reduxapp/feature/selected_info';
import axios from 'axios';


function MapArticle(props) {
    const [kmap, setKmap] = useState(null);
    const [polyline, setPolyline] = useState(null);
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
            let mk_lst = [];

            for(let i=0; i<res.data.length; i++)
            {
                let mkimg = null;
                if(res.data[i].is24) {
                    mkimg = tmp_map.add_markerImage('/Images/m_r.png', [24, 32], [12, 32]);
                } else {
                    mkimg = tmp_map.add_markerImage('/Images/m_b.png', [24, 32], [12, 32]);
                }
                let mk = tmp_map.add_marker(res.data[i].latitude, res.data[i].longitude, true, mkimg);
                mk_lst.push(mk);

                tmp_map.deploymarker(mk, false);

                let additional_info = [];
                if(res.data[i].isBeautyParlor) {
                    additional_info.push('<img src="/Images/1-scissors.png"/>');
                }
                if(res.data[i].isHotel) {
                    additional_info.push('<img src="/Images/1-hotel.png"/>');
                }
                if(res.data[i].isStore) {
                    additional_info.push('<img src="/Images/1-store.png"/>');
                }
                if(res.data[i].hasParkingLot) {
                    additional_info.push('<img src="/Images/1-parking.png"/>');
                }
                let infowindow = `<div class="infowin" id="h${i}">
                                    <header>
                                        <img src="/Images/hospital_icon.png"/>
                                        <h1>${res.data[i].name}</h1>
                                        <button class="close">X</button>
                                    </header>
                                    <div class="infowindesc">
                                        <div>${res.data[i].address}</div>
                                        <div>${res.data[i].businessHours}</div>
                                        <div>Tel. ${res.data[i].contract}</div>
                                        <div class="icon-container">${additional_info.join('')}</div>
                                        <div><button class="go-reserve">예약하기</button></div>
                                    </div>
                                </div>`;
                tmp_map.setInfoWindow_CO(mk, infowindow, i, () => {
                    dispatch(setInfo(res.data[i]));
                });
            }
            axios({
                method: 'GET',
                url: '/guinfo'
            })
            .then(res => {
                let gumarker_lst = [];
                let gumarker_content = '';
                for(let i=0; i<res.data.length; i++) {
                    gumarker_content = `<div class="gumarker">
                                        <div>${res.data[i].name}</div>
                                        <div>병원: ${res.data[i].total}</div>
                                        <div>24시: ${res.data[i].Is24}</div></div>`;
                    let tmpgu = tmp_map.add_customOverlay(res.data[i].latitude, res.data[i].longitude, gumarker_content)
                    gumarker_lst.push(tmpgu);
                    tmp_map.deploymarker(tmpgu, true);
                }

                let zoomcbk = (lvl) => {
                    if(lvl > 6) {
                        mk_lst.forEach((val) => {
                            tmp_map.deploymarker(val, false);
                        });
                        gumarker_lst.forEach((val) => {
                            tmp_map.deploymarker(val, true);
                        });
                    } else {
                        mk_lst.forEach((val) => {
                            tmp_map.deploymarker(val, true);
                        });
                        gumarker_lst.forEach((val) => {
                            tmp_map.deploymarker(val, false);
                        });
                    }
                };
                tmp_map.zoomlevelListener(zoomcbk);
    
                setKmap(tmp_map);
            })
            .catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    function nearestHospital() {
        if(polyline === null){
            getGeoPosition((lat, lng) => {findNearestHospital(lat, lng).then(res => {
                kmap.setCenter(res.data.latitude, res.data.longitude);
                let tmp_pl = kmap.add_polyline([kmap.create_LatLng(lat, lng),
                    kmap.create_LatLng(res.data.latitude, res.data.longitude)]);
                kmap.deploymarker(tmp_pl, true);
                setPolyline(tmp_pl);
            })});
        } else {
            kmap.deploymarker(polyline, false);
            setPolyline(null);
        }
    }
        
    return (
        <div id="mapwrap">
            <div id="map"></div>
            <div id="emmergencebtn">
                <img src="/Images/red_siren.png" onClick={nearestHospital}/>
            </div>
        </div>
    );
}

export default MapArticle;