import React from 'react';
import authService from './api-authorization/AuthorizeService';
import DayForecast from './DayForecast';


export class FiveDayForecast extends React.Component {

    constructor() {
        super();
        // Initialise state
        this.state = {
            loading: true,
            forecastRetrievedDate: '',
            dayForecasts: []
        };
    }

    componentDidMount() {
        this.fetchWeatherData();
    }

    async fetchWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch('WeatherForecast', {
            headers: !token ? {} : {'Authorization' : `Bearer ${token}`}
        });
        const data = await response.json();
        this.setState({
            dayForecasts: data,
            forecastRetrievedDate: Date.now(),
            loading: false,
        });
    }

    render() {
        let content;
        if(this.state.loading) {
            content = <p>Loading weather forecast, please wait...</p>
        } else {
            content = this.state.dayForecasts.consolidated_weather.map((f) => <DayForecast
                forecast = {f} />
            );
        }

        return(
            <div>
                <h1>Forecast retrieved at {this.state.forecastRetrievedDate}</h1>
                {content}
            </div>
        );
    }
}

export default FiveDayForecast;