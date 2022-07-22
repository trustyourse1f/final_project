import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { post_reservation, get_buisnesshour } from 'jslib/reservation_api';
import 'assets/CSS/Calendar.css';

function Reservation(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    let hname = null;
    //let reserveContainer = [];
    hname = props.name;

    useEffect(() => {
        get_buisnesshour(props.HospitalID);
    }, [])

    /*
    for(let i=9; i<18; i++)
    {
        let clickbtn = (e) => {
            let data = {
                HospitalID: props.HospitalID,
                Customer_name:'이진우',
                Customer_number:'010-1234-1234',
                AnimalType: '개',
                Symptom: '결막염',
                Time: '10:00'
            };
            post_reservation(data);
        }
        reserveContainer.push(<div><button onClick={clickbtn}>{`${i}시 예약`}</button></div>);
    }*/
    
    return (
        <div>
            <h1>{hname}</h1>
            <div className="calendar-container">
                <Calendar onChange={setSelectedDate} value={selectedDate}/>
            </div>
            <div className="time-selection-container">
                <h1>
                    {`${selectedDate.getFullYear()}년 ${selectedDate.getMonth()}월 ${selectedDate.getDate()}일`}
                </h1>
                <div className="time-selection">
                    <button>9:00</button>
                    <button>9:30</button>
                </div>
            </div>
        </div>
    );
}

export default Reservation;