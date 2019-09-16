using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WeatherApp.Models;

namespace WeatherApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //public async Task<ActionResult> Weather()
        //{
        //    var weatherWrapper = new WeatherWrapper();
        //}


        //public JsonResult GetWeather()
        //{
        //    WeatherWrapper weatherWrapper = new WeatherWrapper();
        //    return Json(weatherWrapper.GetWeatherForecast(), JsonRequestBehavior.AllowGet);
        //}
    }
}