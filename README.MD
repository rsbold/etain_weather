# Etain exercise
ASP.Net MVC / React project to display the next 5 days weather forecast for Belfast

## Dev environment
Visual Studio Code 1.50.1

## Project creation
Project was created using the react template, with options set to use individual authentication and a local database.

Command:

dotnet new react --auth Individual --use-local-db -o etain

This creates an ASP.Net MVC project with controllers, default authentication, and a react client.

## Create database schema
dotnet ef database update

## MVC/Back-end
### Calling the Metaweather API
I elected to create a static class, MetaweatherClient, to handle interactions with the Metaweather API.  Static because I believe that repeatedly instantiating HttpClient can lead to problems.

The GetForecast method in MetaweatherClient calls the Metaweather Locate API asynchronously.  When the API returns data we first ensure we got a success status code in the 200 range.  Then we check we got an object, and that the content type is 'application/json'.  

We then read the response as a stream, then we try to asynchronously deserialize the stream into a Forecast object.  When the async deserialize operation has completed, we return the populated Forecast object.

### Forecast models
The Forecast and DayForecast classes are used to hold data deserialized from the JSON data returned by the API.  Forecast is really just a wrapper for a list of DayForecast objects.  Property names in Forecast and DayForecast do not currently follow .Net conventions (they are snake_case not PascalCase), this is to enable the deserialization from JSON.  I think there are options to map .Net PascalCase property names to JSON snake_case names but I need to investigate this further.

### WeatherForecastController
Inherits from ControllerBase.  ILogger gets injected by dependency injection but I'm not really using it in this example.

The controller has one async action named Get.  This calls the MetaweatherClient's GetForecast method asynchronously and waits for a Forecast object to be returned.  When the controller receives the forecast object, it simply returns it to the caller.

## React/Front-end

Created two components:

### DayForecast
This component is responsible for rendering a single day's forecast.  All the day's forecast data is currently passed in via props.  This compoennt has no state, no user interaction.  Could probably be a function component rather than a class but I'm more used to writing class components.  

This is a very simple component at the moment, need to work on the presentation and including all relevant props.

### Forecast
This component represents a forecast consisting of a number of day forecasts.  At the moment it renders a heading and a list of DayForecast components.

This component is responsible for calling the Get method on the WeatherForecastController.  The fetchWeatherData method gets the authentication token from the authService, and if it's present sets it as the Authorization header on the request.  We call the controller action asynchronously.  When we get the response back from the controller, we set it as the component's dayForcasts state, and we also set the forecastRetrievedDate and loading to false.  This causes the component to re-render, removing the "please wait" message and instead rendering a list of DayForecast components.

## Client side routing
In App.js I've added an AuthorizeRoute with path of /weather, which causes the FiveDayForecast to be rendered.


