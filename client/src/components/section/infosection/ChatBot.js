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

    function searchautocomplete() {
        if(searchStr === '') {
            setAutoComplete([]);
        } else {
            search_symptoms(searchStr).then(res => {
                console.log(res.data);
                let tmp = [];
                res.data.map((item, index) => {
                    let clckevent = (e) => {
                        if(!postData.symptoms.has(item.code)) {
                            postData.symptoms.add(item.code);
                            postData.symptomInfo.add(item.info);
                        }
                    }
                    tmp.push(<button key={`${index}`} onClick={clckevent}>{item.info}</button>);
                });
                setAutoComplete(tmp);
            });
        }
    }

    useEffect(() => {
        if(chatPhase === 3) {
            searchautocomplete();
        }
    }, [searchStr]);

    function resetChat() {
        postData.species = '';
        postData.symptoms = new Set();
        postData.symptomInfo = new Set();
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
        chatlog.push(<div className='botmessage'>증상을 선택해주세요</div>);
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
                                            if(postData.symptoms.has(item1.code)) {
                                                e.target.style.backgroundColor = null;
                                                postData.symptoms.delete(item1.code);
                                                postData.symptomInfo.delete(item1.info);
                                            } else {
                                                e.target.style.backgroundColor = '#a6a6a6';
                                                postData.symptoms.add(item1.code);
                                                postData.symptoms.add(item1.info);
                                            }
                                        };
                                        return (<button key={`${index1}`} onClick={clckevent2}>{item1.info}</button>);
                                    })}
                                </div>
                            </div>);
                })}
            </div>);

            let clckevent = (e) => {
                chatlog.pop();
                chatlog.pop();
                chatlog.push(<div className="usermessage">
                    <ul>
                        {Array.from(postData.symptomInfo).map((item, index) => {
                            return(<li key={`${index}`}>{item}</li>);
                        })}
                    </ul>
                </div>)
                setChatPhase(8);
            };

            chatlog.push(<div className="botmessage choice-container">
                <button onClick={clckevent}>진단하기</button>
            </div>);
            setChatPhase(3);
        })
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
            <div className='system-btn-table'>
                <button onClick={resetChat}>초기화</button>
                <div className='symptom-searchbox'>
                    <input type='text' placeholder='증상 검색' onChange={(e) => {setSearchStr(e.target.value)}}/>
                </div>
            </div>
            <div className='symptom-autocomplete'>
                {autoComplete}
            </div>
        </div>
    );
}

export default ChatBot;