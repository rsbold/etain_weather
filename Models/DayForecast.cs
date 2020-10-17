using System;
using System.Text.Json.Serialization;

// Author: Rob Bold, 16/10/2020
// This class represents the forecast for a single day.

namespace etain.Models
{
    public class DayForecast
    {
        public long id {get;set;}
        
        [JsonPropertyName("created")]
        public DateTime DateCreated {get;set;}
        
        [JsonPropertyName("applicable_date")]
        public DateTime ApplicableDate {get;set;}
        
        [JsonPropertyName("weather_state_name")]
        public string WeatherStateName {get;set;}

        [JsonPropertyName("weather_state_abbr")]
        public string WeatherStateAbbreviation {get;set;}
        
        [JsonPropertyName("wind_direction_compass")]
        public string WindDirectionCompass {get;set;}

        [JsonPropertyName("wind_direction")]
        public double WindDirection {get;set;}

        [JsonPropertyName("wind_speed")]
        public double WindSpeed {get;set;}
        
        [JsonPropertyName("min_temp")]
        public double MinTemperature {get;set;}

        [JsonPropertyName("max_temp")]
        public double MaxTemp {get;set;}

        [JsonPropertyName("the_temp")]
        public double TheTemp {get;set;}

        [JsonPropertyName("air_pressure")]
        public double AirPressure {get;set;}

        [JsonPropertyName("humidity")]
        public double Humidity {get;set;}

        [JsonPropertyName("visibility")]
        public double Visibility {get;set;}

        [JsonPropertyName("predictability")]
        public int Predictability {get;set;}
    }
}