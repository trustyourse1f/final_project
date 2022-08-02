import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { get_symptomCategory, get_symptoms, get_species, post_predictDisease, search_symptoms } from 'jslib/symptomdisease_api';
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

    const [searchStr, setSearchStr] = useState('');

    function resetChat() {
        postData.species = '';
        postData.symptoms = new Set();
        chatlog.splice(0, chatlog.length);
        setChatPhase(0);
    }

    function tablelistmapping(data) {
        let result = []
        for(let i=0; i<data.length; i+=2) {
            let clckevent1 = (e) => {
                if(!postData.symptoms.has(data[i].code)) {
                    postData.symptoms.add(data[i].code);
                    postData.symptomInfo.add(data[i].info);
                    e.target.style.backgroundColor = '#10e910';
                } else if(postData.symptoms.has(data[i].code)) {
                    postData.symptoms.delete(data[i].code);
                    postData.symptomInfo.delete(data[i].info);
                    e.target.removeAttribute("style");
                }
            };
            let i1 = (<td><button onClick={clckevent1} key={`${i}`}>{data[i].info}</button></td>);

            let i2 = (<td></td>);

            if(i+1 < data.length) {
                let clckevent2 = (e) => {
                    if(!postData.symptoms.has(data[i + 1].code)) {
                        postData.symptoms.add(data[i + 1].code);
                        postData.symptomInfo.add(data[i + 1].info);
                        e.target.style.backgroundColor = '#10e910';
                    } else if(postData.symptoms.has(data[i + 1].code)) {
                        postData.symptoms.delete(data[i + 1].code);
                        postData.symptomInfo.delete(data[i + 1].info);
                        e.target.removeAttribute("style");
                    }
                }
                i2 = (<td><button onClick={clckevent2} key={`${i+1}`}>{data[i+1].info}</button></td>);
            }

            result.push(<tr>
                {i1}
                {i2}
            </tr>);
        }

        return result;
    }

    if(chatPhase==0) {
        chatlog.push(<div className="botmessage">
            증상이 포함된 질병을 알려주는 petmily 질병 예측 서비스를 이용해주셔서 감사합니다.<br/>
            우리 아이의 질병이 무엇인지 알아보기 위해 아래의 질문에 답변해주세요.
        </div>);
        chatlog.push(<div className='botmessage'>어떤 아이인가요?</div>);
        get_species().then(res => {
            chatlog.push(<div className="botmessage choice-container">
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
            chatlog.push(<div className="botmessage choice-container">
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
            chatlog.push(<div className="botmessage choice-container">
                <table>
                {tablelistmapping(res.data)}
                </table>
                <div className="submitbtn-container">
                    <div className="searchbox">
                        <input type="text" placeholder='증상 검색' onChange={(e) => {
                            setSearchStr(e.target.value);
                        }}/>
                        <button>검색</button>
                    </div>
                    <button onClick={(e) => {
                        chatlog.push(<div className="usermessage">
                            <ul>
                                {Array.from(postData.symptomInfo).map((item, index) => {
                                    return (<li key={`${index}`}>{item}</li>);
                                })}
                            </ul>
                        </div>)
                        e.target.parentElement.parentElement.style.display = 'none';
                        setChatPhase(6);
                    }}>선택 완료</button>
                </div>
            </div>);
            setChatPhase(5);
        });
    } else if(chatPhase==6) {
        chatlog.push(<div className='botmessage'>증상을 더 선택하시겠습니까? 아니면 질병예측을 하시겠습니까?</div>);
        chatlog.push(<div className='botmessage choice-container'>
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
        chatlog.push(<div className='botmessage'>해당결과는 공공데이터포털-동물질병데이터를 기반으로 제공되는 단순참고 정보입니다.
                                                정확한 진단은 동물병원 방문 및 수의사 진료 후 확인해주세요</div>);
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