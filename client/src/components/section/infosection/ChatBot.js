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
    const [autoComplete, setAutoComplete] = useState([]);
    const [autoSemaphore, setAutoSemaphore] = useState([0]);

    function searchautocomplete() {
        if(searchStr === '') {
            setAutoComplete([]);
        } else {
            autoSemaphore[0] += 1;
            let prev = autoSemaphore[0];
            search_symptoms(searchStr).then(res => {
                let tmp = [];
                res.data.map((item, index) => {
                    let clckevent = (e) => {
                        let symptarget = document.getElementsByClassName(item.code);
                        if(postData.symptoms.has(item.code)) {
                            Array.from(symptarget).forEach((el) => {
                                el.style.backgroundColor = null;
                            });
                            postData.symptoms.delete(item.code);
                            postData.symptomInfo.delete(item.info);
                        } else {
                            Array.from(symptarget).forEach((el) => {
                                el.style.backgroundColor = '#a6a6a6';
                            });
                            postData.symptoms.add(item.code);
                            postData.symptomInfo.add(item.info);
                        }
                    }

                    if(postData.symptoms.has(item.code)) {
                        tmp.push(<button className={item.code} key={`${index}`} onClick={clckevent} style={{backgroundColor: '#a6a6a6'}}>
                            {item.info}</button>);
                    } else {
                        tmp.push(<button className={item.code} key={`${index}`} onClick={clckevent}>{item.info}</button>);
                    }
                });

                if(autoSemaphore[0] <= prev) {
                    setAutoComplete(tmp);
                }
            });
        }
    }

    useEffect(() => {
        if(chatPhase === 3) {
            searchautocomplete();
        }
    }, [searchStr]);

    useEffect(() => {
        let target = document.getElementsByClassName('symptom-autocomplete')[0];
        if (autoComplete.length === 0) {
            target.style.height = '0';
            document.getElementsByClassName('chatwrapper')[0].style.height = 'inherit';
        } else {
            target.style.height = '180px';
            document.getElementsByClassName('chatwrapper')[0].style.height = '475px';
        }
    }, [autoComplete])

    function resetChat() {
        postData.species = '';
        postData.symptoms = new Set();
        postData.symptomInfo = new Set();
        chatlog.splice(0, chatlog.length);
        let a = document.querySelector('.system-btn-table > input')
        a.value = '';
        a.disabled = true;
        setAutoComplete([]);
        setChatPhase(0);
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
                        chatlog.push(<div className="rightalign"><div className="usermessage">{item}</div></div>);
                        setChatPhase(2);
                    }
                    return (<button onClick={clckevent} key={`${index}`}>{item}</button>)
                })}
            </div>);
            setChatPhase(1);
        })
    } else if(chatPhase==2) {
        document.querySelector('.system-btn-table :nth-child(2)').disabled = false;
        chatlog.push(<div className='botmessage'>증상을 선택해주세요
                        {'(선택한 증상이 많을수록 더 정확한 진단이 가능합니다.)'}</div>);
        get_symptoms().then(res => {
            chatlog.push(<div className="botmessage choice-container">
                {res.data.map((item, index) => {
                    let clckevent = (e) => {
                        let containerTarget = e.target.parentElement.getElementsByClassName('symptoms-container')[0];
                        if(containerTarget.style.display === 'block') {
                            containerTarget.style.display = 'none';
                            e.target.style.backgroundColor = null;
                        } else {
                            containerTarget.style.display = 'block';
                            e.target.style.backgroundColor = '#a6a6a6';
                        }
                    };

                    return (<div className='category-container'>
                                <button onClick={clckevent} key={`${index}`}>{item.category}</button>
                                <div className='symptoms-container' style={{display: 'none'}}>
                                    {item.symptoms.map((item1, index1) => {
                                        let clckevent2 = (e) => {
                                            let symptarget = document.getElementsByClassName(item1.code);
                                            if(postData.symptoms.has(item1.code)) {
                                                Array.from(symptarget).forEach((el) => {
                                                    el.style.backgroundColor = null;
                                                });
                                                postData.symptoms.delete(item1.code);
                                                postData.symptomInfo.delete(item1.info);
                                            } else {
                                                Array.from(symptarget).forEach((el) => {
                                                    el.style.backgroundColor = '#a6a6a6';
                                                });
                                                postData.symptoms.add(item1.code);
                                                postData.symptomInfo.add(item1.info);
                                            }
                                        };

                                        if(postData.symptoms.has(item1.code)) {
                                            return (<button id={item1.code} key={`${index1}`} onClick={clckevent2}style={{backgroundColor: '#a6a6a6'}}>
                                                {item1.info}</button>);
                                        } else {
                                            return (<button className={item1.code} key={`${index1}`} onClick={clckevent2}>{item1.info}</button>);
                                        }
                                    })}
                                </div>
                            </div>);
                })}
            </div>);

            let clckevent = (e) => {
                if(postData.symptoms.size > 0) {
                    document.querySelector('.system-btn-table :nth-child(2)').disabled = true;
                    chatlog.pop();
                    chatlog.pop();
                    chatlog.push(<div className="rightalign"><div className="usermessage">
                        선택증상:
                        <ul>
                            {Array.from(postData.symptomInfo).map((item, index) => {
                                return(<li key={`${index}`}>{item}</li>);
                            })}
                        </ul>
                    </div></div>);
                    setChatPhase(8);
                }
            };

            chatlog.push(<div className="botmessage choice-container">
                <button onClick={clckevent}>진단하기</button>
            </div>);
            setChatPhase(3);
        })
    } else if(chatPhase==8) {
        chatlog.push(<div className='botmessage'>해당결과는 공공데이터포털-동물질병데이터를 기반으로 제공되는 단순참고 정보입니다.
                                                정확한 진단은 동물병원 방문 및 수의사 진료 후 확인해주세요</div>);
        chatlog.push(<div className='botmessage'>예측되는 질병은 다음과 같습니다.<br/>
                    {'(순서는 우선순위와 관계없습니다.)'}</div>);
        
        dispatch(setSymptomsAnimaltype({
            Symptom: Array.from(postData.symptomInfo).join(', '),
            AnimalType: postData.species}));
        
        post_predictDisease(Array.from(postData.symptoms), postData.species).then(res => {
            chatlog.push(<div className='botmessage'>
                <ul>
                    {res.data.map((item, index) => {
                        return(<li key={`${index}`}>{item}</li>)
                    })}
                </ul>
            </div>);
            chatlog.push(<div className='botmessage'>증상이 저장되었습니다.<br/>
                저장된 증상정보는 예약 시 활용이 가능합니다</div>);
            setChatPhase(9);
            setAutoComplete([]);
        })
    }
    useEffect(() => {
        let ele = document.getElementsByClassName('chatscreen')[0];
        ele.scrollTop = ele.scrollHeight;
    }, [chatPhase]);
    
    return (
        <div className='chatwin'>
            <div className='chatwrapper'>
                <div className='chatscreen'>
                    {chatlog}
                </div>
            </div>
            <div className='symptom-autocomplete symptoms-container'>
                {autoComplete}
            </div>
            <div className='system-btn-table'>
                <button onClick={resetChat}>처음으로</button>
                <input type='text' placeholder='증상 검색' onChange={(e) => {setSearchStr(e.target.value)}} disabled/>
            </div>
        </div>
    );
}

export default ChatBot;