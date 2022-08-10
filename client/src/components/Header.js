import React from 'react';
import { Link } from 'react-router-dom';
import 'assets/CSS/Header.css';

class Header extends React.Component {
  constructor(props)
  {
    super(props);
  }
  
  render() {
    return (
        <header id="header">
          <div id="header-logo"><Link to='/'>
            <img src="/Images/1-logo.png" className="logo"/>
          </Link></div>
          <nav>
            <ul>
              <li>반려동물 분양</li>
              <li>병원 이용 후기</li>
              <li>고객센터</li>
              <li>HISTORY</li>
              <Link to="/reservationhost"><li>RESERVATION</li></Link>
              <Link to="/aboutus"><li>ABOUT US</li></Link>
            </ul>
          </nav>
        </header>
    );
  }
}

export default Header;