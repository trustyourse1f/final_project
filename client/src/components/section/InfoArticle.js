import { useState } from 'react';
import ChatBot from './infosection/ChatBot';
import Reservation from './infosection/Reservation';
import { useSelector, useDispatch } from 'react-redux';
import { setNull } from 'reduxapp/feature/selected_info';
import 'assets/CSS/InfoArticle.css';

function InfoArticle(props) {
    const selected_info = useSelector(state => state.selectedInfo.value);
    const changed_info = useSelector(state => state.selectedInfo.changed_val);
    const [popupwin, setPopupwin] = useState(null);
    const dispatch = useDispatch();
    
    if(changed_info === 1) {
        dispatch(setNull());
        document.getElementById('info0').style.display = 'none';
        const clsbtncbk = () => {
            setPopupwin(null);
            document.getElementById('info0').style.display = 'block';
        }
        setPopupwin(<div className='info-popup-window'>
                        <Reservation name={selected_info.name} HospitalID={selected_info.HospitalID} closeBtn={clsbtncbk}/>
                     </div>);
    }
    return (
        <article className='info'>
            <div id='info0'>
                <ChatBot/>
            </div>
            {popupwin}
        </article>
    );
}

export default InfoArticle;