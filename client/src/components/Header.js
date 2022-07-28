import React from 'react';
import 'assets/CSS/Header.css';

class Header extends React.Component {
  constructor(props)
  {
    super(props);
  }
  
  render() {
    return (
        <header id="header">
            <h1><img src='/Images/1-logo.png'/>동물병원 예약시스템</h1>
            <nav>
              <a href="https://github.com/good-jinu/petmily" target="_blank" rel="noopener noreferrer">
                <img src="/GitHub-Mark-32px.png" className="mark" alt="github"/>
              </a>
            </nav>
        </header>
    );
  }
}

export default Header;