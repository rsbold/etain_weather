using System;

// Author: Rob Bold, 16/10/2020
// This class represents the forecast for a single day.

namespace etain.Models
{
    public class DayForecast
    {
        //public string id {get;set;}
        public DateTime created {get;set;}
        public DateTime applicable_date {get;set;}
        
        public string weather_state_name {get;set;}
        public string weather_state_abbr {get;set;}
        
        public string wind_direction_compass {get;set;}
        public double wind_direction {get;set;}
        public double wind_speed {get;set;}
        
        public double min_temp {get;set;}
        public double max_temp {get;set;}
        public double the_temp {get;set;}

        public double air_pressure {get;set;}
        public double humidity {get;set;}
        public double visibility {get;set;}
        public int predictability {get;set;}
    }
}