import React from 'react';


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
        // TODO: Add temperatures, wind speed/direction, weather icon etc.
        return(
            <div>
                <h2>{this.props.applicable_date}</h2>
                <p>
                    {this.props.weather_state_name}
                </p>
            </div>
        );

    }
}

export default DayForecast;