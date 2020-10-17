import React from 'react';
import authService from './api-authorization/AuthorizeService';
import DayForecast from './DayForecast';
import { Button } from 'react-bootstrap';

export class FiveDayForecast extends React.Component {

    constructor() {
        super();
        // Initialise state
        this.state = {
            loading: true,
            forecastRetrievedDate: '',
            dayForecasts: []
        };
        this.fetchWeatherData = this.fetchWeatherData.bind(this);
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
            content = <div>Loading, please wait...</div>
        } else {
            content = this.state.dayForecasts.consolidated_weather.map((f) => <DayForecast
                key = {f.id}
                forecast = {f} />
            );
        }

        const retrievedDate = new Date(this.state.forecastRetrievedDate).toLocaleDateString('en-GB');
        const retrievedTime = new Date(this.state.forecastRetrievedDate).toLocaleTimeString('en-GB');
        return(
            <div>
                <h1>Belfast forecast retrieved at {retrievedDate} {retrievedTime}</h1>
                <Button onClick={this.fetchWeatherData}>Refresh</Button>
                {content}
            </div>
        );
    }
}

export default FiveDayForecast;