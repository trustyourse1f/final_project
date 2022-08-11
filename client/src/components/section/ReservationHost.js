import { useState, useEffect } from "react";
import moment from 'moment';
import { get_reservationtableHost } from 'jslib/reservation_api';
import 'assets/CSS/ReservationHost.css';

function ReservationHost(props) {
    const [tabledata, setTabledata] = useState({
                                                    name: '',
                                                    reservations: []
    });
    const [showtable, setShowtable] = useState({
        name: '',
        reservations: []
    });

    useEffect(() => {
        if (tabledata.reservations.length > 0) {
            let a = {
                name: tabledata.name,
                reservations: tabledata.reservations.sort((a, b) => {
                    if(a.Time < b.Time) {
                        return -1
                    } else if(a.Time > b.Time) {
                        return 1
                    }
                    return 0
                })
            };
            setShowtable(a);
        }
    }, [tabledata]);

    function searchhid(e) {
        if(e.key === "Enter") {
            get_reservationtableHost(e.target.value, setTabledata);
        }
    }

    return (
        <section id="section-re">
            <article id="reservationtable-article">
                <div id="reservationtable-desc">
                    본 페이지는 수의사 선생님들만 열람이 가능한 페이지입니다.<br/>
                    병원에 부여된 병원 아이디를 입력하고 예약 현황을 확인하세요.
                </div>
                <div id="reserve-input">
                    <input type="text" onKeyDown={searchhid} placeholder="병원 ID"/>
                </div>
                <div id="reserve-table">
                    <h1>{showtable.name}</h1>
                    <table>
                        <tr>
                            <th>시간</th>
                            <th>이름</th>
                            <th>전화번호</th>
                            <th>종</th>
                            <th>증상</th>
                            <th>추가사항</th>
                        </tr>
                        {showtable.reservations.map((val, ind) => {
                            return (<tr key={`${ind}`}>
                                <td>{moment(new Date(val.Time)).format('YYYY.MM.DD HH:mm')}</td>
                                <td>{val.Customer_name}</td>
                                <td>{val.Customer_number}</td>
                                <td>{val.AnimalType}</td>
                                <td>{val.Symptom}</td>
                                <td>{val.AdditionalInfo}</td>
                            </tr>);
                        })}
                    </table>
                </div>
            </article>
        </section>
    );
}

export default ReservationHost;