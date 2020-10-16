using System;

namespace etain.Models
{
    // This represents a single day's forecast from metaweather.com.
    // JSON data returned from api is named in snake_case.
    // We'll name properties in PascalCase as per C# standards.

    public class DayWeatherForecast
    {
        public string Id{get;set;}
        public DateTime ApplicableDate {get;set;}

        public string WeatherStateName {get;set;}
        public string WeatherStateAbbr {get;set;}
        
        public double MinTemp {get;set;}
        public double MaxTemp {get;set;}
        public double CurrentTemp {get;set;}
        
        public double WindSpeed {get;set;}
        public string WindDirectionCompass {get;set;}
        public double WindDirectionBearing {get;set;}
        
        public double AirPressure {get;set;}
        public double Humidity {get;set;}
        public double Visibility {get;set;}
        public int Predictability {get;set;}
    }
}
