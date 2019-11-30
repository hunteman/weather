//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "bootswatch/journal/bootstrap.css";
import "../node_modules/bootswatch/dist/sketchy/bootstrap.min.css";
import { Nav, Container, Row, Col } from "react-bootstrap";
import React, { Component } from "react";
import "./App.css";
import Tren from "./Tren";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "San Jose", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" },
  // { name: "Novosibirsk", zip: "1496747" },
  // { name: "Saint Petersburg", zip: "4171563" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Temp: {Math.floor((weatherData.main.temp-32)/1.8)}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <nav className="navbar navbar-light bg-warning border border-bottom-2 border-light">
            <div className="navbar-brand container">
              React Simple Weather App
            </div>
        </nav>
        
        <Container>
            <Row>
              <Col md={4} sm={4}>
                <h3>Select a city</h3>
                <Nav
                  className="flex-column"
                  variant="pills"
                  stacked
                  activeKey={activePlace}
                  onSelect={index => {
                    this.setState({ activePlace: index });
                  }}
                >
                  <Nav.Item>
                  {PLACES.map((place, index) => (
                    <Nav.Link key={index} eventKey={index}>{place.name}</Nav.Link>
                  ))}
                  </Nav.Item>
                </Nav>
              </Col>
              <Col md={8} sm={8}>
                <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
              </Col>
            </Row>
            <Row>
              <Tren />
            </Row>      
        </Container>
      </div>
    );
  }
}

export default App;