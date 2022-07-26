import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { post_reservation, get_buisnesshour, get_reservationtable } from 'jslib/reservation_api';
import 'assets/CSS/Calendar.css';
import 'assets/CSS/Reservation.css';

function Reservation(props) {
    const [bsnsHour, setBsnsHour] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [postData, setPostData] = useState({
        HospitalID: props.HospitalID,
        Customer_name:'',
        Customer_number:'010-0000-0000',
        AnimalType: '',
        Symptom: '',
        Time: 0
    });
    const [reservationTable, setReservationTable] = useState([]);

    let timeSelectionBtns = [];
    useEffect(() => {
        selectedDate.setHours(0);
        selectedDate.setMinutes(0);
        get_buisnesshour(props.HospitalID, setBsnsHour);
        get_reservationtable(props.HospitalID, setReservationTable);
    }, [])

    let stt = 0;
    let end = 24;
    switch(selectedDate.getDay()) {
        case 0:
            stt = bsnsHour.sun_start;
            end = bsnsHour.sun_end;
            break;
        case 1:
            stt = bsnsHour.mon_start;
            end = bsnsHour.mon_end;
            break;
        case 2:
            stt = bsnsHour.tue_start;
            end = bsnsHour.tue_end;
            break;
        case 3:
            stt = bsnsHour.wed_start;
            end = bsnsHour.wed_end;
            break;
        case 4:
            stt = bsnsHour.thu_start;
            end = bsnsHour.thu_end;
            break;
        case 5:
            stt = bsnsHour.fri_start;
            end = bsnsHour.fri_end;
            break;
        case 6:
            stt = bsnsHour.sat_start;
            end = bsnsHour.sat_end;
            break;
    }

    if(stt%60 > 30) {
        stt = stt + 60 - (stt%60);
    } else {
        stt = stt - (stt%60);
    }

    for(let i=stt; i<end; i+=30)
    {
        const hour = parseInt(i/60);
        const minute = i % 60;
        if(minute >= 30) {
            minute = 30;
        } else {
            minute = 0;
        }
        selectedDate.setHours(hour);
        selectedDate.setMinutes(minute);
        const tstmp = selectedDate.getTime();
        if(reservationTable.includes(tstmp)) {
            timeSelectionBtns.push(<button className="invalidbtn">{`${("0"+hour).slice(-2)}:${("0"+minute).slice(-2)}`}</button>);
        } else {
            const clickbtn = (e) => {
                postData.Time = tstmp;
                document.querySelectorAll('.time-selection .validbtn').forEach(function(item) {
                    item.style.backgroundColor = '#e9e9e9'
                });
                e.target.style.backgroundColor = '#10e910';
            }
            timeSelectionBtns.push(<button onClick={clickbtn} className="validbtn">{`${("0"+hour).slice(-2)}:${("0"+minute).slice(-2)}`}</button>);
        }
    }
    document.querySelectorAll('.time-selection button').forEach(function(item) {
        item.removeAttribute("style");
    });
    
    return (
        <div>
            <button onClick={props.closeBtn}>X</button>
            <h1>{props.name}</h1>
            <div className="calendar-container">
                <Calendar onChange={setSelectedDate}/>
            </div>
            <div className="time-selection-container">
                <h1>
                    {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`}
                </h1>
                <div className="time-selection">
                    {timeSelectionBtns}
                </div>
                <div>
                    <input type='text' onChange={(e) => {postData.Customer_name = e.target.value}} placeholder="이름"/>
                    <input type='text' onChange={(e) => {postData.Customer_number = e.target.value}} placeholder="전화번호"/>
                    <input type='text' onChange={(e) => {postData.AnimalType = e.target.value}} placeholder="동물종류"/>
                    <input type='text' onChange={(e) => {postData.Symptom = e.target.value}} placeholder="증상"/>
                    <button onClick={() => {post_reservation(postData).then(res => {
                        get_reservationtable(props.HospitalID, setReservationTable);
                        postData.Time = 0;
                    }).catch(err => {
                        console.error(err);
                    });}}>예약하기</button>
                </div>
            </div>
        </div>
    );
}

export default Reservation;