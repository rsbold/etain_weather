using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;
using etain.Models;

// Author: Rob Bold 16/10/2020
// A static class for querying Metaweather.com and deserializing
// the returned JSON into a Forecast object.

namespace etain.WeatherClient
{
    public static class MetaweatherClient
    {
        // Our HttpClient - should be created once at start of application
        // and re-used.  Apparently causes problems when repeatedly instantiated.
        // This is also why this class is static.
        private static HttpClient httpClient;

        // URI for the service we're going to call.
        const string BaseUri = "https://www.metaweather.com/api/location/";

        // Belfast is 44544.  It might change or maybe we'll want to know
        // the forecast for other places so have kept this separate from 
        // the BaseUri.  In reality this would be supplied as a route parameter
        const string LocationId = "44544";

        // Static constructor instantiates HttpClient.
        // TODO: There are some options we can set on HttpClient, possibly set these
        // up here?
        static MetaweatherClient()
        {
            httpClient = new HttpClient();
        }

        public static async Task<Forecast> GetForecast()
        {
            string uri = $"{BaseUri}{LocationId}";

            System.Diagnostics.Debug.WriteLine($"URI to be queried is {uri}");

            // Call GetAsync and get a reference to the task.
            var responseTask = httpClient.GetAsync(uri);

            // Await the result of the responseTask.
            var response = await responseTask;

            // Make sure we got a 200 OK response (or at least a response in the 200 range).
            response.EnsureSuccessStatusCode();

            // Make sure the response content is an object and content type is JSON.
            if(response.Content is object && 
                response.Content.Headers.ContentType.MediaType == "application/json")
            {
                // We've got a response with some content and the header says it's JSON.
                // Read it as a stream.
                var responseStream = await response.Content.ReadAsStreamAsync();

                // Now try to deserialize the response into a Forecast object.
                // NB Forecast object contains a list of DayForecast objects.
                // Property names on these classes match property names on the 
                // returned JSON object (all lowercase, snake case) so mapping
                // happens automatically.
                // TODO: I think there's a way to map lowercase, snake case JSON
                // property names to PascalCase .Net property names.  Investigate this.
                try{
                    return await JsonSerializer.DeserializeAsync<Forecast>(
                        responseStream,
                        new JsonSerializerOptions { IgnoreNullValues = true });
                }
                catch(JsonException jsonException)
                {
                    System.Diagnostics.Debug.WriteLine("JSON Exception");
                    System.Diagnostics.Debug.WriteLine(jsonException.Message);
                }
            }
            else
            {
                System.Diagnostics.Debug.WriteLine("Response was invalid, cannot be deserialized.");
            }
            return null;
        }
    }
}