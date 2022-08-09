import "assets/CSS/Legend.css";

function LegendArticle() {
    return (
        <article className='legend'>
            <ul>
                <li><img src="/Images/m_b.png"/><span>일반 병원</span></li>
                <li><img src="/Images/m_r.png"/><span>응급 병원</span></li>
                <li><img src="/Images/1-store.png"/><span>애완용품점</span></li>
                <li><img src="/Images/1-hotel.png"/><span>호텔</span></li>
                <li><img src="/Images/1-parking.png"/><span>주차</span></li>
                <li><img src="/Images/1-scissors.png"/><span>미용</span></li>
                <li><img src="/Images/red_siren.png"/><span>가까운 응급병원 찾기</span></li>
            </ul>
        </article>
    );
}

export default LegendArticle;