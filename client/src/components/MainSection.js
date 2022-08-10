import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MapArticle, InfoArticle, LegendArticle, AboutUs, ReservationHost } from './section';
import 'assets/CSS/MainSection.css';

class MainSection extends React.Component {
    render() {
        return (
            <>
            <Routes>
                <Route path="/reservationhost/" element={<ReservationHost/>}></Route>
                <Route path="/aboutus/" element={<AboutUs/>}></Route>
                <Route path="/" element={<section id="section">
                        <InfoArticle/>
                        <MapArticle/>
                        <LegendArticle/>
                    </section>}></Route>
            </Routes>
            </>
        );
    }
}

export default MainSection;