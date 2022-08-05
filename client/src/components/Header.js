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
          <div id="header-logo">
            <img src="/Images/1-logo.png" className="logo"/>
          </div>
          <nav>
            <ul>
              <li>반려동물 분양</li>
              <li>병원 이용 후기</li>
              <li>고객센터</li>
              <li>HISTORY</li>
              <li>RESERVATION</li>
              <li>ABOUT US</li>
            </ul>
          </nav>
        </header>
    );
  }
}

export default Header;