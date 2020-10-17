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
        const applicableDate = new Date(this.props.forecast.applicable_date).toLocaleDateString('en-GB');
        const imgSource = 'https://www.metaweather.com/static/img/weather/png/' + this.props.forecast.weather_state_abbr + '.png';
        return(
            <div>
                <div>&nbsp;</div>
                <Card>
                    <Card.Header>
                        <h2>{applicableDate} - {this.props.forecast.weather_state_name}</h2>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col lg={2}>
                                <img src={imgSource} alt='weather icon' width='64' height='64' />
                            </Col>
                            <Col lg={3}>
                                <div class="lead">
                                    Temp: {this.props.forecast.the_temp.toFixed()}&deg;C
                                </div>
                                <div>
                                Min: {this.props.forecast.min_temp.toFixed()}&deg;C
                                Max: {this.props.forecast.max_temp.toFixed()}&deg;C 
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div>
                                    Wind direction: {this.props.forecast.wind_direction_compass}
                                </div>
                                <div>
                                    Wind speed: {this.props.forecast.wind_speed.toFixed()}
                                </div>
                            </Col>
                            <Col lg={3}>
                                Air pressure: {this.props.forecast.air_pressure.toFixed()}<br />
                                Humidity: {this.props.forecast.humidity.toFixed()}<br />
                                Visibility: {this.props.forecast.visibility.toFixed()}<br />
                                Predictability: {this.props.forecast.predictability.toFixed()}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        );

    }
}

export default DayForecast;