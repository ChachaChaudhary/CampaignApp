import React, { Component } from 'react';

class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {lang: 'en'};

    this.handleLangChange = this.handleLangChange.bind(this);
  }

  handleLangChange(event) {
    this.setState({lang: event.target.value});
    this.props.onLangChange(event.target.value);
  }

  render() {
    return (
      <header className="topHeader fullWidth flexBox">
         <img src="./images/spotLight.png" alt="spotlight" className="logo"></img>
         <div className="title">
           <div className="font18">Spotlight</div>
           <div className="font8 rightAlign">by BlueStacks</div>
         </div>

         <div className="flex-1 rightAlign font25 beta">BETA</div>
         <select className="langSelect" value={this.state.lang} onChange={this.handleLangChange}>
           <option value="en">English</option>
           <option value="es">Español</option>
           </select>
         <div className="menuButton"><img src="./images/menu.png" alt="menu"></img>
</div>
      </header>
        );
  }
}

export default TopHeader;
