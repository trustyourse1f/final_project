import { useEffect } from 'react';
import { post_reservation, get_buisnesshour } from 'jslib/reservation_api';

function Reservation(props) {
    let hname = null;
    let reserveContainer = [];
    hname = props.name;

    useEffect(() => {
        get_buisnesshour(props.HospitalID);
    }, [])

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
    }
    
    return (
        <div>
            <h1>{hname}</h1>
            <div>
                {reserveContainer}
            </div>
        </div>
    );
}

export default Reservation;