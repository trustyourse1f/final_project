import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Reservation from './Reservation';
import { setNull } from 'reduxapp/feature/selected_info';
import './ChatBot.css';

function ChatBot(props) {
    const dispatch = useDispatch();
    const [chatlog, setChatlog] = useState([]);
    const [reqval, setReqval] = useState([]);
    const selected_info = useSelector(state => state.selectedInfo.value);
    const changed_info = useSelector(state => state.selectedInfo.changed_val);

    if(changed_info === 1) {
        chatlog.push(<div className='botmessage'>
                        <Reservation name={selected_info.name} HospitalID={selected_info.HospitalID}/>
                     </div>);
        dispatch(setNull());
    }

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            console.log(reqval);
        }
    }
    
    return (
        <div className='chatwin'>
            <div className='chatwrapper'>
                <div className='chatscreen'>
                    {chatlog}
                </div>
            </div>
            <div className="textinput_box">
                <input type="text" value={reqval} onChange={(e) => {setReqval(e.target.value);}} onKeyPress={handleKeyPress}/>
            </div>
        </div>
    );
}

export default ChatBot;