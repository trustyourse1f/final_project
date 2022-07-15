import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function InfoArticle(props) {
    const selected_info = useSelector(state => state.selectedInfo.value);
    let hname = null;
    let reserveContainer = [];

    if(Object.keys(selected_info).length !== 0) {
        hname = selected_info.name;
        for(let i=9; i<18; i++)
        {
            reserveContainer.push(<div><button>{`${i}시 예약`}</button></div>);
        }
    }
    
    return (
        <article>
            <h1>{hname}</h1>
            <div>
                {reserveContainer}
            </div>
        </article>
    );
}

export default InfoArticle;