import React from 'react';
import { MapArticle, InfoArticle } from './section';
import 'assets/CSS/MainSection.css';

class MainSection extends React.Component {
    render() {
        return (
        <section id="section">
            <InfoArticle/>
            <MapArticle/>
        </section>
        );
    }
}

export default MainSection;