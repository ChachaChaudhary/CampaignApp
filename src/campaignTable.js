import React, { Component } from 'react';
import CampaignPopUp from './campaignPopUp';
import DatePicker from "react-datepicker";
import CalendarContainer from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormattedMessage } from 'react-intl';
class CampaignTable extends Component {
  constructor(props){
    super(props);
    this.getFormattedDateAndDays=this.getFormattedDateAndDays.bind(this);
    this.showPopup=this.showPopup.bind(this);
    this.hidePopup=this.hidePopup.bind(this);
    this.scheduleAgain=this.scheduleAgain.bind(this);
    this.showScheduler=this.showScheduler.bind(this);
    this.hideScheduler=this.hideScheduler.bind(this);
    this.state={
      selectedData:null,
      rescheduleIndex:null
    };
  }
  getDateWithZeroTime(date){
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
 }
 showPopup(event){
  var dataIndex=parseInt(event.currentTarget.dataset.index,10);
   this.setState({selectedData:this.props.data[dataIndex]});
 }
 hidePopup(){
  this.setState({selectedData:null});
 }
 showScheduler(event){
  var dataIndex=parseInt(event.currentTarget.dataset.index,10);
  this.setState({rescheduleIndex:dataIndex});
  event.stopPropagation();
 }
 scheduleAgain(scheduleDate){
  var newCampaign={};
  newCampaign.name=this.props.data[this.state.rescheduleIndex].name;
  newCampaign.imgUrl=this.props.data[this.state.rescheduleIndex].imgUrl;
  newCampaign.countries=this.props.data[this.state.rescheduleIndex].countries;
  newCampaign.date=scheduleDate;
  this.props.addCampaign(newCampaign); 
  this.hideScheduler();
  alert('Campaign got scheduled');
 }
 hideScheduler(){
  this.setState({rescheduleIndex:null});
 }
  getFormattedDateAndDays(date){
    date = new Date(date);
    var currentDate=this.getDateWithZeroTime(new Date()).getTime();
    var formattedDate=date.getFullYear()+'-'+(date.getMonth()<9?'0':'')+(date.getMonth()+1)+'-'+(date.getDate()<10?'0':'')+date.getDate();
    var days='';
    switch(this.props.type){
      case 'upcoming':
            days= Math.floor((date.getTime()-currentDate)/(24*60*60*1000));
            days=days +' day'+ (days>1?'s':'')+' to go';
            break;  
            case 'live':
            days='Today';
            break;  
            case 'past':
            days= Math.ceil((currentDate-date.getTime())/(24*60*60*1000));
            days=days +' day'+ (days>1?'s':'')+' ago';
          break;  
            default:
            break;
          }
      return(
<div className="flex-2 campaignColumn">
      <div>{formattedDate}</div>
             <div>{days}</div>
      </div>
      ); 
     }
  render() {
    var campaignsItems = this.props.data.map(function(item,index) {
          return (
           <div className="flexBox campaignDataRow" key={index} data-index={index} onClick={this.showPopup}>
           {this.getFormattedDateAndDays(item.date)}
           <div className="flex-5 campaignColumn flexBox">
           <img src={`./images/${item.imgUrl}`} alt={item.name} className="campaignLogo"></img>
           <div className="campaignCellData fluidWidth80">
           <div className="campaignName">{item.name}</div>
           <div>{item.countries.join(',')}</div>
           </div>
           </div>
           <div className="flex-1 columnBox campaignColumn flexBox centerAlignBox centerJustifyBox">
           <div className="flexBox centerAlignBox centerJustifyBox viewPricingIcon bold">$<span>+</span></div>
           <div className="centerAlign font10 viewPricingText">
           <FormattedMessage
  id="table.viewPricing"
  defaultMessage="VIEW PRICING"/>
           </div>
           </div>
           <div className="flex-3 campaignColumn flexBox centerAlignBox centerJustifyBox actionItems">
           <div className="centerAlign">
           <img src='./images/file.png' alt="csv"></img>
           <div>CSV</div>
           </div>
           <div className="centerAlign actionItemSpacing">
           <img src='./images/bars-graph.png' alt="report"></img>
           <div> 
             <FormattedMessage
  id="table.report"
  defaultMessage="REPORT"/>
  </div>
           </div>
           <div className="centerAlign actionItemActive" data-index={index} onClick={this.showScheduler}>
           <img src='./images/calendar.png' alt="schedule again"></img>
           <div>  <FormattedMessage
  id="table.scheduleAgain"
  defaultMessage="SCHEDULE AGAIN"/></div>
           </div>
           </div>
           </div>)
  }.bind(this));
    return (<div className="fluidWidth80 campaignsContainer">
           <div className="flexBox campaignHeader">
           <div className="flex-2 campaignColumn">
           <FormattedMessage
  id="table.date"
  defaultMessage="DATE"/></div>
           <div className="flex-5 campaignColumn">
           <FormattedMessage
  id="table.campaign"
  defaultMessage="CAMPAIGN"/>
  </div>
           <div className="flex-1 campaignColumn">
           <FormattedMessage
           id="table.view"
           defaultMessage="VIEW"/>
           </div>
           <div className="flex-3 campaignColumn">
           <FormattedMessage
           id="table.actions"
           defaultMessage="ACTIONS"/>
           </div>
           </div>
           {campaignsItems}
           <CampaignPopUp data={this.state.selectedData}
          onClose={this.hidePopup}>
        </CampaignPopUp>
        {
        this.state.rescheduleIndex!==null && (
            <DatePicker
                minDate={new Date()}
                selected={new Date(this.props.data[this.state.rescheduleIndex].date)}
                onChange={this.scheduleAgain}
                withPortal
                inline 
                showDisabledMonthNavigation 
                showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    >  <div className="centerAlign calenderButtonContainer"><button onClick={this.hideScheduler}>
        <FormattedMessage
           id="table.cancel"
           defaultMessage="Cancel"/>
  </button></div>
</DatePicker>
        )
    }
      </div>
        );
  }
 
}

export default CampaignTable;

