import { User } from 'oidc-client';
import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    
    return (
      <div>
        <h1>Belfast Weather</h1>
        <p>Log in to see the weather forecast for Belfast for the next five days.</p>
        <p>Weather forecast data provided by metaweather.com</p>
      </div>
    );
  }
}
