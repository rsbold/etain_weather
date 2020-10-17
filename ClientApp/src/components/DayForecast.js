import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

// This component displays the forecast for a single day. 
// Forecast data passed in via props, there's no state
// in this component.

// The weather data returned by the metaweather.com API
// follows this schema:
// {
//       "id": 5897546900701184,
//       "weather_state_name": "Showers",
//       "weather_state_abbr": "s",
//       "wind_direction_compass": "NNE",
//       "created": "2020-10-15T18:20:02.176414Z",
//       "applicable_date": "2020-10-15",
//       "min_temp": 8.305,
//       "max_temp": 12.665,
//       "the_temp": 12.16,
//       "wind_speed": 7.33912840449906,
//       "wind_direction": 24.82921736834681,
//       "air_pressure": 1024.5,
//       "humidity": 75,
//       "visibility": 10.333092241310744,
//       "predictability": 73
//     }

export class DayForecast extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const applicableDate = this.props.forecast.applicable_date;
        const imgSource = 'https://www.metaweather.com/static/img/weather/png/' + this.props.forecast.weather_state_abbr + '.png';
        return(
            <Card>
                <Card.Header>
                    <Col lg={3}>{applicableDate}</Col>
                    <Col lg={9}>{this.props.forecast.weather_state_name}</Col>
                </Card.Header>
                <Card.Body>
                    <img src={imgSource} alt='weather icon' width='64' height='64' />
                    <ul>
                        <li>Temperature: {this.props.forecast.the_temp}</li>
                        <li>Min temperature: {this.props.forecast.min_temp}</li>
                        <li>Max temperature: {this.props.forecast.max_temp}</li>
                        <li>Wind direction: {this.props.forecast.wind_direction_compass}</li>
                        <li>Wind speed: {this.props.forecast.wind_speed}</li>
                        <li>Air pressure: {this.props.forecast.air_pressure}</li>
                        <li>Humidity: {this.props.forecast.humidity}</li>
                        <li>Visibility: {this.props.forecast.visibility}</li>
                        <li>Predictability: {this.props.forecast.predictability}</li>
                    </ul>
                </Card.Body>
            </Card>
        );

    }
}

export default DayForecast;