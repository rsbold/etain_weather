using System;
using System.Collections.Generic;

// Author: Rob Bold 16/10/2020
// Represents the JSON object returned by Metaweather.com/api/location,
// contains a list of DayForecast objects.

namespace etain.Models
{
    // The Metaweather api returns a json object with one
    // property consolidated_weather which is an array of
    // daily forecasts.  Each daily forecast is represented
    // in this code by a DayForecast object, this class
    // contains a list of DayForecast objects.

    // Note property names in Forecast and DayForecast don't
    // follow the usual .net PascalCase convention, they are
    // lower case and snake_case to match the property names
    // returned by the API.
    // TODO: I think there's a way to map PascalCase .net 
    // property names to json snake_case names, need to look
    // into this - it would be nice to be name properties in 
    // these classes according to the .net convention.
    public class Forecast
    {
        public IEnumerable<DayForecast> consolidated_weather {get;set;}

        public Forecast()
        {
            consolidated_weather = new List<DayForecast>();
        }
    }
}