import React from 'react';
import { Header, MainSection } from "./components";
import './App.css';

class App extends React.Component {
  constructor(props)
  {
    super(props);
  }

  render() {
    return (
      <div id="App">
        <Header/>
        <MainSection/>
      </div>
    );
  }
}

export default App;
