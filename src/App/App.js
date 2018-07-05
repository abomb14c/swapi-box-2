import React, { Component } from 'react';
import './App.css';
import {fetchCrawlData, fetchPeopleData, fetchPlanetData, fetchVehicleData} from '../utils/ApiCalls/ApiCalls';
import CrawlText  from '../CrawlText/CrawlText';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import CardSection from '../CardSection/CardSection';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      crawlText: [],
      peopleData: [],
      planetData: [],
      vehicleData: [],
      active: 'active'
    };

  }

  setPeopleData = async () => {
    try {
      const peopleData = await fetchPeopleData();

      this.setState({peopleData,
        crawlText: [],
        planetData: [],
        vehicleData: [],
        active: 'active'
      });
    } catch (error){
      throw new Error("something went wrong");
    }
  }

  setPlanetData = async () => {
    try {
      const planetData = await fetchPlanetData();

      this.setState({planetData,
        crawlText: [],
        peopleData: [],
        vehicleData:[],
        active: 'active'
      });
    } catch (error){
      throw new Error("something went wrong");
    }
  }

  setVehicleData = async () => {
    try {
      const vehicleData = await fetchVehicleData();

      this.setState({vehicleData,
        crawlText: [],
        peopleData: [],
        planetData: [],
        active: 'active'
      });
    } catch (error){
      throw new Error("something went wrong");
    }
  }

  async componentDidMount() {
    try {
      const crawlText =  await fetchCrawlData();
  
      this.setState({crawlText});

    } catch (error){
      throw new Error('something went wrong');
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo"></div>
        </header>
        <ButtonContainer 
          setPeopleData={this.setPeopleData}
          setPlanetData={this.setPlanetData}
          setVehicleData={this.setVehicleData}
        />
        {this.state.active.length &&
          <CardSection 
            people={this.state.peopleData}
            planets={this.state.planetData}
            vehicles={this.state.vehicleData}
          />
        }
        {this.state.crawlText &&
          <CrawlText crawlText={this.state.crawlText} />
        } 
      </div>
    );
  }
}

export default App;
