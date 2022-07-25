import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { post_reservation, get_buisnesshour } from 'jslib/reservation_api';
import 'assets/CSS/Calendar.css';

function Reservation(props) {
    const [bsnsHour, setBsnsHour] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    let hname = null;
    let timeSelectionBtns = [];
    hname = props.name;

    useEffect(() => {
        get_buisnesshour(props.HospitalID, setBsnsHour);
        selectedDate.setHours(0);
        selectedDate.setMinutes(0);
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
        const clickbtn = (e) => {
            let data = {
                HospitalID: props.HospitalID,
                Customer_name:'이진우',
                Customer_number:'010-1234-1234',
                AnimalType: '개',
                Symptom: '결막염',
                Time: tstmp
            };
            post_reservation(data);
        }
        timeSelectionBtns.push(<button onClick={clickbtn}>{`${hour}:${minute}`}</button>);
    }
    
    return (
        <div>
            <h1>{hname}</h1>
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
            </div>
        </div>
    );
}

export default Reservation;