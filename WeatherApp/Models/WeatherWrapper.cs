using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.Web.Script.Serialization;

namespace WeatherApp.Models
{
    public class WeatherWrapper
    {
        private readonly string dsKey = "a65049349aa4d90bfca3ccd8a6c27b7a";
        private readonly string googleKey = "AIzaSyDlOHl9DL3xZhgs5-DkYfhXtt2PjWFwUjo";
        private static HttpClient _client = new HttpClient();

        public string Location { get; set; }
        public string Day { get; set; }
        public double? Temperature { get; set; }
        string Forecast { get; set; }
        double Wind { get; set; }
        double Humidity { get; set; }
        double Percipitation { get; set; }

        //public Object GetWeatherForecast()
        //{
        //    string dsUrl = String.Format("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${0}/${latitude},${longitude}?exclude=minutely,alerts,flags", dsKey);
        //    //synchronous client
        //    var client = new WebClient();
        //    var content = client.DownloadString(dsUrl);
        //    var serializer = new JavaScriptSerializer();
        //    var jsonContent = serializer.Deserialize<Object>(content);
        //    return jsonContent;
        //}









        public async Task<WeatherWrapper> Currently(string Location = null,
                                            double? Temperature = null,
                                            string Forecast = null,
                                            double? Wind = null,
                                            double? Humidity = null,
                                            double? Percipitation = null)
        {
            string requestDSUrl = String.Format("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${0}/${latitude},${longitude}?exclude=minutely,alerts,flags", dsKey);
            string requestGoogleUrl = String.Format("https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${2}", "", "", googleKey);

            var urlDS = new Uri(requestDSUrl);
            var urlGoogle = new Uri(requestGoogleUrl);

            var responseDS = await _client.GetAsync(urlDS);
            var responseGoogle = await _client.GetAsync(urlGoogle);

            string json;
            using (var content = responseDS.Content)
            {
                json = await content.ReadAsStringAsync();
            }

            WeatherWrapper weatherWrapper = JsonConvert.DeserializeObject<WeatherWrapper>(json);
            return weatherWrapper;

        }
        //public static HttpClient ApiClient { get; set; } = new HttpClient();

        //public string Key { get; set; }
        //public string Latitude { get; set; }
        //public string Longitude { get; set; }
        //public string Location { get; set; }

        //currently and daily
    }
}