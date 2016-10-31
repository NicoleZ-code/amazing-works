using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MCMAIP.Models;

namespace MCMAIP.Controllers
{
    public class HomeController : Controller
    {

         MCMAIPEntities storeDB = new MCMAIPEntities();

        // GET: /Index/


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Indexs()
        {
            // Get most popular news
            var news = GetTopSellingNews(10);

            return View(news);
        }

        private List<News> GetTopSellingNews(int count)
        {
            // Group the order details by album and return
            // the albums with the highest count

            return storeDB.NewsList
                .OrderByDescending(a => a.Id)
                .Take(count)
                .ToList();
        }

    }
}
