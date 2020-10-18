using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

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

    // Used JsonPropertyName decorators so we can use PascalCase
    // for .net property names (following convention) and 
    // snake_case for json property names (also following convention).
    
    public class Forecast
    {
        [JsonPropertyName("consolidated_weather")]
        public IEnumerable<DayForecast> DayForecasts {get;set;}

        public Forecast()
        {
            DayForecasts = new List<DayForecast>();
        }
    }
}