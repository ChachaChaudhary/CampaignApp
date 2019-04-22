import React, { Component } from 'react';
import CampaignTable from './campaignTable';
import { FormattedMessage } from 'react-intl';

class MainContent extends Component {
  constructor(props){
    super(props);
    this.addActiveClass=this.addActiveClass.bind(this);
    this.showCompaigns=this.showCompaigns.bind(this);
    this.filterCampaignData=this.filterCampaignData.bind(this);
    this.addNewCampaign=this.addNewCampaign.bind(this);
    this.state={
      activeCampaign:"live",
      filteredData:[],
      allCampaignData:[]
    };
    var me=this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      me.setState({allCampaignData:JSON.parse(this.response)});
      me.filterCampaignData('live');
    }
  };
  xhttp.open("get", "campaignData.json", true);
  xhttp.send();
  
  }
  addNewCampaign(newCampaign){
    this.state.allCampaignData.push(newCampaign);
  }

  render() {
    return (
      <main className="fullWidth flexBox centerAlignBox columnBox mainContent">
      <div className="contentTitle font30">
      <FormattedMessage
  id="Main.titleOne"
  defaultMessage="Manage"
/>
<span className="bold">
<FormattedMessage
  id="Main.titleTwo"
  defaultMessage=" Campaigns"
/>
</span></div>
      <div className="fullWidth flexBox centerJustifyBox bold font14">
      <a className={`btn relativeElement flexBox centerAlignBox centerJustifyBox fluidWidth20 centerAlign ${this.addActiveClass("upcoming")}`} onClick={this.showCompaigns} href='#upcoming'>
      <FormattedMessage
  id="Main.upcomingCampaigns"
  defaultMessage="UPCOMING CAMPAIGNS"/>
  </a>
      <a className={`btn relativeElement flexBox centerAlignBox centerJustifyBox fluidWidth20 centerAlign ${this.addActiveClass("live")}`} onClick={this.showCompaigns} href='#live'>
      <FormattedMessage
  id="Main.liveCampaigns"
  defaultMessage="LIVE CAMPAIGNS"/></a>
      <a className={`btn relativeElement flexBox centerAlignBox centerJustifyBox fluidWidth20 centerAlign ${this.addActiveClass("past")}`} onClick={this.showCompaigns} href='#past'>
      <FormattedMessage
  id="Main.pastCampaigns"
  defaultMessage="PAST CAMPAIGNS"/></a>
      </div>
      <CampaignTable data={this.state.filteredData} type={this.state.activeCampaign} addCampaign={this.addNewCampaign}></CampaignTable>
      </main>
        );
  }
  addActiveClass(activeCampaign){
    return activeCampaign === this.state.activeCampaign ? 'btn-active':'';
  }
  showCompaigns(event){
    var currentCampaign=event.currentTarget.hash.replace('#','');
     this.setState({activeCampaign:currentCampaign} );
     this.filterCampaignData(currentCampaign);

  }
  getDateWithZeroTime(date){
     date.setHours(0);
     date.setMinutes(0);
     date.setSeconds(0);
     return date;
  }
  sortByDateField(sortOptions, a, b) {
    var x = new Date(a[sortOptions.sortByField]);
    var y = new Date(b[sortOptions.sortByField]);

    return ((x - y) * sortOptions.sortOrder);

};
  filterCampaignData(currentCampaign){
      var filteredData=[];
      var currentDate=this.getDateWithZeroTime(new Date()).getTime();
      switch(currentCampaign){
        case 'upcoming':
              filteredData=this.state.allCampaignData.filter(function(item){
                 return new Date(item.date).getTime()>=(currentDate+(24*60*60*1000));
              }); 
              filteredData.sort(this.sortByDateField.bind(this, { sortByField: 'date', sortOrder: 1 }));

              break;  
              case 'live':
              filteredData=this.state.allCampaignData.filter(function(item){
                 return new Date(item.date).getTime()>=currentDate && new Date(item.date).getTime()<(currentDate+(24*60*60*1000));
              }); 
              break;  
              case 'past':
              filteredData=this.state.allCampaignData.filter(function(item){
                 return new Date(item.date).getTime()<currentDate;
              }); 
              filteredData.sort(this.sortByDateField.bind(this, { sortByField: 'date', sortOrder: -1 }));
              break;  
              default:
              break;
            }
     this.setState({filteredData:filteredData})
  }
}

export default MainContent;
