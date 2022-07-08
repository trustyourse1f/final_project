
const { kakao } = window;

class KakaoMap {
    constructor(container_id, lat = 37.5675, lng = 126.98, lvl = 8) {
        const container = document.getElementById(container_id);
        const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: lvl
        };
        this.map = new kakao.maps.Map(container, options);
    }

    deploymarker(marker) {
        if(marker === null) {
            console.error('There is no marker');
        } else {
            marker.setMap(this.map);
        }
    }

    add_marker(lat, lng) {
        var markerPosition  = new kakao.maps.LatLng(lat, lng); 

        // 마커를 생성합니다
        return new kakao.maps.Marker({
            position: markerPosition
        });
    }

    transcoord_TM(x, y, callback) {
        var geocoder = new kakao.maps.services.Geocoder(); // 좌표계 변환 객체를 생성합니다

        // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
        geocoder.transCoord(x, y, callback, {
            input_coord: kakao.maps.services.Coords.TM, // 변환을 위해 입력한 좌표계 입니다
            output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다 
        });
    }

    settitle(marker, title) {
        // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
        var iwContent = `<div style="padding:5px;">${title}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent
        });

        // 마커에 마우스오버 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseover', () => {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
            infowindow.open(this.map, marker);
        });

        // 마커에 마우스아웃 이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'mouseout', () => {
            // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
            infowindow.close();
        });
    }
}

export default KakaoMap;