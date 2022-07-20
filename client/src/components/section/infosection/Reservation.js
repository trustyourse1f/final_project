import { useSelector } from 'react-redux';
import { post_reservation } from 'jslib/reservation_api';

function Reservation(props) {
    const selected_info = useSelector(state => state.selectedInfo.value);
    let hname = null;
    let reserveContainer = [];

    if(Object.keys(selected_info).length !== 0) {
        hname = selected_info.name;
        for(let i=9; i<18; i++)
        {
            let clickbtn = (e) => {
                let data = {
                    HospitalID: selected_info.HospitalID,
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
    }
    
    return (
        <>
            <h1>{hname}</h1>
            <div>
                {reserveContainer}
            </div>
        </>
    );
}

export default Reservation;