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
            city: '',
            forecastRetrievedDate: '',
            sun_rise: '',
            sun_set: '',
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
            city: data.title,
            sun_rise: data.sun_rise,
            sun_set: data.sun_set,
            dayForecasts: data,
            forecastRetrievedDate: Date.now(),
            loading: false,
        });
    }

    render() {

        const retrievedDate = new Date(this.state.forecastRetrievedDate).toLocaleDateString('en-GB');
        const retrievedTime = new Date(this.state.forecastRetrievedDate).toLocaleTimeString('en-GB');

        const sunrise = new Date(this.state.sun_rise).toLocaleTimeString('en-GB');
        const sunset = new Date(this.state.sun_set).toLocaleTimeString('en-GB');

        let content;
        let title;
        if(this.state.loading) {
            title = <h1>Loading please wait...</h1>
            content = <div>Loading, please wait...</div>
        } else {
            title = <div>
                <h1>{this.state.city} forecast retrieved at {retrievedDate} {retrievedTime}</h1>
                <div>Sunrise: {sunrise}, sunset: {sunset}</div>
            </div>
            // API returns 6 days worth of forecasts by default but the spec calls for
            // us to display only 5 days.  Use array slice function to limit the number
            // of day forecasts we render.
            content = this.state.dayForecasts.consolidated_weather.slice(0, 5).map((f) => <DayForecast
                key = {f.id}
                forecast = {f} />
            );
        }

        
        return(
            <div>
                {title}
                <Button onClick={this.fetchWeatherData}>Refresh</Button>
                <span className='float-right'>
                    Forecast data provided by <a href='https://www.metaweather.com'>metaweather.com</a>
                </span>
                {content}
            </div>
        );
    }
}

export default FiveDayForecast;