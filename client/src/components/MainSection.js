import React from 'react';
import { MapArticle, InfoArticle, LegendArticle } from './section';
import 'assets/CSS/MainSection.css';

class MainSection extends React.Component {
    render() {
        return (
        <section id="section">
            <InfoArticle/>
            <MapArticle/>
            <LegendArticle/>
        </section>
        );
    }
}

export default MainSection;