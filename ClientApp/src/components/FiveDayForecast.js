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
            // API returns 6 days worth of forecasts by default but the spec calls for
            // us to display only 5 days.  Use array slice function to limit the number
            // of day forecasts we render.
            content = this.state.dayForecasts.consolidated_weather.slice(0, 5).map((f) => <DayForecast
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
                <span className='float-right'>Forecast data provided by metaweather.com</span>
                {content}
            </div>
        );
    }
}

export default FiveDayForecast;