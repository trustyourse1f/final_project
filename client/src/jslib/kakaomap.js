
const { kakao } = window;
var map;

function create_kakao_map(container_id, lat, lng, lvl){
    const container = document.getElementById(container_id);
    const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: lvl
    };
    map = new kakao.maps.Map(container, options);
}

function add_marker(lat, lng) {
    var markerPosition  = new kakao.maps.LatLng(lat, lng); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}

function tm_to_wsg(x, y, callback = add_marker) {
    var geocoder = new kakao.maps.services.Geocoder(); // 좌표계 변환 객체를 생성합니다
    
    // 좌표 변환 결과를 받아서 처리할 콜백함수 입니다.
    function transCoordCB(result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

            callback(result[0].y, result[0].x)
        }
    }

    // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
    geocoder.transCoord(x, y, transCoordCB, {
        input_coord: kakao.maps.services.Coords.TM, // 변환을 위해 입력한 좌표계 입니다
        output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다 
    });
}

export { create_kakao_map, add_marker, tm_to_wsg };