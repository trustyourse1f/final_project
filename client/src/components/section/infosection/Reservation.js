import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import moment from 'moment';
import { post_reservation, get_buisnesshour, get_reservationtable } from 'jslib/reservation_api';
import 'assets/CSS/Calendar.css';
import 'assets/CSS/Reservation.css';

function getCurrentDate() {
    let today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today;
}

function Reservation(props) {
    const st_and_at = useSelector(state => state.selectedInfo.symptoms_animaltype);
    const [bsnsHour, setBsnsHour] = useState({});
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [postData, setPostData] = useState({
        HospitalID: props.HospitalID,
        Customer_name:'',
        Customer_number:'',
        AnimalType: st_and_at.AnimalType,
        Symptom: st_and_at.Symptom,
        Time: 0,
        AdditionalInfo: ''
    });
    const [reservationTable, setReservationTable] = useState([]);
    const [timeSelectionBtns, setTimeSelectionBtns] = useState([]);

    useEffect(() => {
        get_buisnesshour(props.HospitalID, setBsnsHour);
    }, [props.HospitalID]);

    useEffect(() => {
        get_reservationtable(props.HospitalID, setReservationTable);
    }, [bsnsHour]);

    useEffect(() => {
        timeSelectionBtns.splice(0, timeSelectionBtns.length);
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
            if(reservationTable.includes(tstmp) || tstmp <= new Date().getTime()) {
                timeSelectionBtns.push(<div><button className="invalidbtn">{`${("0"+hour).slice(-2)}:${("0"+minute).slice(-2)}`}</button></div>);
            } else {
                const clickbtn = (e) => {
                    postData.Time = tstmp;
                    document.querySelectorAll('.time-selection .validbtn').forEach(function(item) {
                        item.style.backgroundColor = null
                        item.style.color = null;
                    });
                    e.target.style.backgroundColor = '#0095df';
                    e.target.style.color = 'white';
                }
                timeSelectionBtns.push(<div><button onClick={clickbtn} className="validbtn">
                    {`${("0"+hour).slice(-2)}:${("0"+minute).slice(-2)}`}</button></div>);
            }
        }
        setTimeSelectionBtns([...timeSelectionBtns]);
    }, [selectedDate, reservationTable]);

    useEffect(() => {
        document.querySelectorAll('.time-selection button').forEach(function(item) {
            item.removeAttribute("style");
        });
    }, [timeSelectionBtns]);
    
    return (
        <div className="reservewin">
            <div className='reserve-header'>
                <h1>{props.name}</h1>
                <button onClick={props.closeBtn}>X</button>
            </div>
            <div className='reserve-section'>
                <div className="calendar-container">
                    <h1>날짜 선택</h1>
                    <Calendar onChange={setSelectedDate} formatDay={(locale, date) => moment(date).format("D")}
                    formatMonthYear={(locale,date) => moment(date).format('YYYY.MM')}/>
                </div>
                <div className="time-selection-container">
                    <h1>
                        시간선택 &emsp;
                        <span style={{fontSize: '10px'}}>{moment(selectedDate.getTime()).format('M월 D일 (ddd)')}</span>
                    </h1>
                    <div className="time-selection">
                        {timeSelectionBtns}
                    </div>
                    <div className="time-selection-desc">
                        <div style={{backgroundColor: '#e5f4fb',
                    display: 'inline-block',
                    width: '12px',
                    height: '12px'}}/> 예약가능 &nbsp; &nbsp;
                        <div style={{backgroundColor: '#7f7f7f',
                    display: 'inline-block',
                    width: '12px',
                    height: '12px'}}/> 예약불가
                    </div>
                    <div className="userinfo-input-container">
                        <div className='userinfo-input'>
                            <label for="userinput0">아이 이름</label>
                            <input type='text' onChange={(e) => {postData.Customer_name = e.target.value; setPostData({...postData});}}
                            placeholder="춘식이" value={postData.Customer_name} id="userinput0"/>
                        </div>
                        <div className='userinfo-input'>
                            <label for="userinput1">전화번호</label>
                            <input type='text' onChange={(e) => {postData.Customer_number = e.target.value; setPostData({...postData});}}
                            placeholder="전화 (010-0000-0000)" value={postData.Customer_number} id="userinput1"/>
                        </div>
                        <div className='userinfo-input'>
                            <label for="userinput2">{'종 '}</label>
                            <input type='text' onChange={(e) => {postData.AnimalType = e.target.value; setPostData({...postData});}}
                            placeholder="종 (강아지)" value={postData.AnimalType} id="userinput2"/>
                        </div>
                        <div className='userinfo-input'>
                            <label for="userinput3">주요 증상</label>
                            <textarea onChange={(e) => {postData.Symptom = e.target.value; setPostData({...postData});}}
                            placeholder="혈변, 앞다리 떨림, ..." value={postData.Symptom} id="userinput3"/>
                        </div>
                        <div className='userinfo-input'>
                            <label for="userinput4">추가 전달 사항</label>
                            <textarea onChange={(e) => {postData.AdditionalInfo = e.target.value; setPostData({...postData});}}
                            placeholder="포메리안, 암컷, 2세, 어제부터 아팠어요, ..." value={postData.AdditionalInfo} id="userinput4"/>
                        </div>
                    </div>
                    <button onClick={(e) => {
                        if(postData.Customer_number.length < 7) {
                            window.alert("전화번호를 입력해주세요")
                        } else {
                            post_reservation(postData).then(res => {
                                get_reservationtable(props.HospitalID, setReservationTable).then(res => {
                                    window.alert("예약을 성공했습니다!");
                            });
                            }).catch(err => {
                                window.alert("예약을 실패했습니다! (시간을 선택했는지 확인해주세요)");
                            });
                        }
                    }} className="reserve-button">예약하기</button>
                </div>
            </div>
        </div>
    );
}

export default Reservation;