import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class CampaignPopUp extends Component {
  constructor(props){
    super(props);
    this.getFormattedDate=this.getFormattedDate.bind(this);
  }
  
  getFormattedDate(date){
    date = new Date(date);
    var formattedDate=date.getFullYear()+'-'+(date.getMonth()<9?'0':'')+(date.getMonth()+1)+'-'+(date.getDate()<10?'0':'')+date.getDate();
      return formattedDate; 
     }
  render() {
    if(!this.props.data) {
      return null;
    }
    return (<div className="popupOverlay flexBox centerAlignBox centerJustifyBox ">
           <div className="popup">
           <div className="centerAlign popupTitle relativeElement">
           <FormattedMessage
           id="popup.campaignDetails"
           defaultMessage="Campaign Details"/>
           <button className="absoluteElement closeButton" onClick={this.props.onClose}>X</button>
          </div>
          <div className="poopupContent centerAlign">
          <img src={`./images/${this.props.data.imgUrl}`} alt={this.props.data.name}></img>
          <div>
            <FormattedMessage
           id="popup.campaignName"
           defaultMessage="Campaign Name"/> : {this.props.data.name}</div>
          <div>  
            <FormattedMessage
           id="popup.campaignDate"
           defaultMessage="Campaign Date"/> : {this.getFormattedDate(this.props.data.date)}</div>
          <div>  
            <FormattedMessage
           id="popup.campaignCountries"
           defaultMessage="Campaign Countries"/> : {this.props.data.countries.join(',')}</div>
            </div>
           </div>
      </div>
        );
  }
 
}

export default CampaignPopUp;
