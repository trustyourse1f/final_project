import { useState, useEffect } from 'react';
import 'assets/CSS/ChatBot.css';

function ChatBot(props) {
    const [chatlog, setChatlog] = useState([]);
    const [reqval, setReqval] = useState([]);

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