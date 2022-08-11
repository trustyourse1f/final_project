import 'assets/CSS/AboutUs.css';

function AboutUs(props) {
    return (
        <section id="section-au">
            <article class="aboutus-article">
            <div className="about_company">
                <img src="/Images/1-logo.png"/>
                <div><div>Petmily는 1500만 반려인을 위한<br/>
                    AI기반으로 반려동물 증상 데이터로 질병을 예측하는 서비스와<br/>
                    지역근처의 동물병원을 시각화하고 스마트 예약 서비스를<br/>
                    제공하는 플랫폼 입니다.
                </div></div>
            </div>
            <div className="about_crew">
                <div className="crew">
                    <div><span>강창훈</span></div>
                    <img src="/Images/dr_cat0.jpg"/>
                </div>
                <div className="crew">
                    <div><span>류성빈</span></div>
                    <img src="/Images/dr_puppy0.jpg"/>
                </div>
                <div className="crew">
                    <div><span>심재용</span></div>
                    <img src="/Images/dr_puppy1.jpg"/>
                </div>
                <div className="crew" onClick={e => {e.currentTarget.lastChild.src="/Images/horror0.jpg"}}>
                    <div><span>이진우</span></div>
                    <img src="/Images/dr_cat1.jpg"/>
                </div>
                <div className="crew">
                    <div><span>전승훈</span></div>
                    <img src="/Images/dr_puppy2.jpg"/>
                </div>
                <div className="crew">
                    <div><span>전혜지</span></div>
                    <img src="/Images/dr_cat2.jpg"/>
                </div>
            </div>
            </article>
        </section>
    );
}

export default AboutUs;