import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_symptomCategory, get_symptoms, get_species, post_predictDisease } from 'jslib/symptomdisease_api';
import { setSymptomsAnimaltype } from 'reduxapp/feature/selected_info';
import 'assets/CSS/ChatBot.css';

function ChatBot(props) {
    const dispatch = useDispatch();
    const [chatlog, setChatlog] = useState([]);
    const [chatPhase, setChatPhase] = useState(0);
    const [postData, setPostData] = useState({
        species: '',
        symptoms: new Set(),
        symptomInfo: new Set()
    });

    function resetChat() {
        postData.species = '';
        postData.symptoms = new Set();
        chatlog.splice(0, chatlog.length);
        setChatPhase(0);
    }

    if(chatPhase==0) {
        chatlog.push(<div className="botmessage">
            증상이 포함된 질병을 알려주는 petmily 질병 예측 서비스를 이용해주셔서 감사합니다.<br/>
            우리 아이의 질병이 무엇인지 알아보기 위해 아래의 질문에 답변해주세요.
        </div>);
        chatlog.push(<div className='botmessage'>어떤 아이인가요?</div>);
        get_species().then(res => {
            chatlog.push(<div className="botmessage">
                {res.data.map((item, index) => {
                    let clckevent = (e) => {
                        let pa = e.target.parentElement;
                        pa.style.display='none';
                        postData.species = item;
                        chatlog.push(<div className="usermessage">{item}</div>);
                        setChatPhase(2);
                    }
                    return (<button onClick={clckevent} key={`${index}`}>{item}</button>)
                })}
            </div>);
            setChatPhase(1);
        })
    } else if(chatPhase==2) {
        chatlog.push(<div className='botmessage'>증상종류를 선택해주세요</div>);
        get_symptomCategory().then(res => {
            chatlog.push(<div className="botmessage">
                {res.data.map((item, index) => {
                    let clckevent = (e) => {
                        let pa = e.target.parentElement;
                        pa.style.display='none';
                        postData.symcat = item;
                        chatlog.push(<div className="usermessage">{item}</div>);
                        setChatPhase(4);
                    }
                    return (<button onClick={clckevent} key={`${index}`}>{item}</button>);
                })}
            </div>);
            setChatPhase(3);
        })
    } else if(chatPhase==4) {
        chatlog.push(<div className='botmessage'>증상을 선택해주세요</div>);
        get_symptoms(postData.symcat).then(res => {
            chatlog.push(<div className="botmessage">
                {res.data.map((item, index) => {
                    let clckevent = (e) => {
                        if(!postData.symptoms.has(item.code)) {
                            postData.symptoms.add(item.code);
                            postData.symptomInfo.add(item.info);
                            e.target.style.backgroundColor = '#10e910';
                        } else if(postData.symptoms.has(item.code)) {
                            postData.symptoms.delete(item.code);
                            postData.symptomInfo.delete(item.info);
                            e.target.removeAttribute("style");
                        }
                    };
                    return (<button onClick={clckevent} key={`${index}`}>{item.info}</button>);
                })}
                <button onClick={(e) => {
                    chatlog.push(<div className="usermessage">
                        <ul>
                            {Array.from(postData.symptomInfo).map((item, index) => {
                                return (<li key={`${index}`}>{item}</li>);
                            })}
                        </ul>
                    </div>)
                    e.target.parentElement.style.display = 'none';
                    setChatPhase(6);
                }}>선택 완료</button>
            </div>);
            setChatPhase(5);
        });
    } else if(chatPhase==6) {
        chatlog.push(<div className='botmessage'>증상을 더 선택하시겠습니까? 아니면 질병예측을 하시겠습니까?</div>);
        chatlog.push(<div className='botmessage'>
            <button onClick={e => {
                e.target.parentElement.style.display='none';
                setChatPhase(2);
            }}>추가 증상 선택</button>
            <button onClick={e => {
                e.target.parentElement.style.display='none';
                setChatPhase(8);
            }}>질병예측</button>
        </div>);
        setChatPhase(7);
    } else if(chatPhase==8) {
        chatlog.push(<div className='botmessage'>예측되는 질병은 다음과 같습니다.</div>);
        dispatch(setSymptomsAnimaltype({
            Symptom: Array.from(postData.symptomInfo).join(', '),
            AnimalType: postData.species}));
        post_predictDisease(Array.from(postData.symptoms), postData.species).then(res => {
            chatlog.push(<div className='botmessage'>
                <ol>
                    {res.data.map((item, index) => {
                        return(<li key={`${index}`}>{item}</li>)
                    })}
                </ol>
            </div>);
            chatlog.push(<div className='botmessage'>증상이 저장되었습니다.</div>);
            setChatPhase(9);
        })
    }
    
    return (
        <div className='chatwin'>
            <div className='chatwrapper'>
                <div className='chatscreen'>
                    {chatlog}
                </div>
            </div>
            <div className='system-btn-table'>
                <button onClick={resetChat}>reset</button>
            </div>
        </div>
    );
}

export default ChatBot;