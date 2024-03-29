import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    
    return (
      <div>
        Since I've now modified App.js to remove the line AuthorizeRoute mapping
        exact path / to the FiveDayForecast component, 
        the home route ('/') now sends the user to the FiveDayForecast component, 
        but only if they're authorized.  This means this component should never be shown
        and could be deleted if desired.  I've left it in just to note the route change.
      </div>
    );
  }
}
