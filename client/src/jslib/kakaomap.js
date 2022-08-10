
const { kakao } = window;

class KakaoMap {
    constructor(container_id, lat = 37.5275, lng = 126.975, lvl = 8) {
        const container = document.getElementById(container_id);
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: lvl
        };
        this.map = new kakao.maps.Map(container, options);
    }

    deploymarker(marker, deploy = true) {
        if(marker === null) {
            console.error('There is no marker');
        } else {
            if(deploy) {
                marker.setMap(this.map);
            } else {
                marker.setMap(null);
            }
        }
    }

    create_LatLng(lat, lng) {
        return new kakao.maps.LatLng(lat, lng);
    }

    add_marker(lat, lng, clickable = false, image = null) {
        var markerPosition  = new kakao.maps.LatLng(lat, lng); 

        // 마커를 생성합니다
        return new kakao.maps.Marker({
            position: markerPosition,
            clickable: clickable,
            image: image
        });
    }

    setCenter(lat, lng) {
        // 이동할 위도 경도 위치를 생성합니다 
        var moveLatLon = new kakao.maps.LatLng(lat, lng);
        
        // 지도 중심을 이동 시킵니다
        this.map.setCenter(moveLatLon);
        this.map.setLevel(4);
    }

    transcoord_TM(x, y, callback) {
        var geocoder = new kakao.maps.services.Geocoder(); // 좌표계 변환 객체를 생성합니다

        // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
        geocoder.transCoord(x, y, callback, {
            input_coord: kakao.maps.services.Coords.TM, // 변환을 위해 입력한 좌표계 입니다
            output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다 
        });
    }

    setInfoWindow_CO(marker, iwContent = '<div></div>', h_id=0, reserve_cbk) {
        // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
        // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.CustomOverlay({
            clickable: true,
            content : iwContent,
            position : marker.getPosition(),
            yAnchor: 1.2,
            zIndex: 1000
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', () => {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.setMap(this.map);
            let clsbtn = document.querySelector(`#h${h_id} .close`);
            clsbtn.addEventListener("click", () => {
                infowindow.setMap(null)
            });
            let emt = document.querySelector(`#h${h_id} .go-reserve`);
            emt.addEventListener("click", reserve_cbk);
        });
    }

    checkAddress(address, lat, lng, ind) {
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
            try{
                // 정상적으로 검색이 완료됐으면 
                result[0].x = parseFloat(result[0].x);
                result[0].y = parseFloat(result[0].y);
                if (status === kakao.maps.services.Status.OK) {
                    if(result[0].y + 0.0005 < lat || result[0].y - 0.0005 > lat) {
                        console.warn(address, result[0].x, result[0].y, ind);
                    } else if(result[0].x + 0.0005 < lng || result[0].x - 0.0005 > lng) {
                        console.warn(address, result[0].x, result[0].y, ind);
                    }
                }
            }
            catch(err) {
                console.error('없는 주소', address, ind);
            }
        });
    }

    add_markerImage(src, size, offset) {
        let imgSize = new kakao.maps.Size(size[0], size[1]);
        let imgOpt = {offset: new kakao.maps.Point(offset[0], offset[1])};

        return  new kakao.maps.MarkerImage(src, imgSize, imgOpt);
    }

    zoomlevelListener(cbk = (lvl) => {}) {
        kakao.maps.event.addListener(this.map, 'zoom_changed', () => {
            cbk(this.map.getLevel());
        });
    }

    add_customOverlay(lat, lng, content) {
        // 커스텀 오버레이가 표시될 위치입니다
        var position = new kakao.maps.LatLng(lat, lng);

        // 커스텀 오버레이를 생성합니다
        return new kakao.maps.CustomOverlay({
            position: position,
            content: content
        });
    }

    add_polyline(poslst = [new kakao.maps.LatLng(35.2, 126.9), new kakao.maps.LatLng(35.3, 127.0)]) {
        return new kakao.maps.Polyline({
            map: this.map, // 선을 표시할 지도입니다 
            path: poslst, // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
            strokeWeight: 3, // 선의 두께입니다 
            strokeColor: '#db4040', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid' // 선의 스타일입니다
        });
    }
}

export default KakaoMap;