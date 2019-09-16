using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WeatherApp.Controllers
{
    public class WeatherWrapperController : Controller
    {
        // GET: WeatherWrapper
        public ActionResult Index()
        {
            return View();
        }
    }
}