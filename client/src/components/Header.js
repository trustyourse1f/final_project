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
            <nav>
              <ul>
                <li><a href="/"><img src='/Images/1-logo.png' className="logo"/></a></li>
                <li>reservation</li>
                <li>about us</li>
              </ul>
            </nav>
        </header>
    );
  }
}

export default Header;