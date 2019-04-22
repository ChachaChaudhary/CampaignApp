import React, { Component } from 'react';
import TopHeader from './topHeader';
import MainContent from './mainContent';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.changeLanguage=this.changeLanguage.bind(this);
  }
  changeLanguage(lang){
    this.props.changeLanguage(lang);
  }
  render() {
    return (
      <div>
      <TopHeader onLangChange={this.changeLanguage}></TopHeader>
      <MainContent></MainContent>
</div>  );
  }
}

export default App;
