using MCMAIP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
//using System.Web.Http;
//using System.Web.Http.Routing;

namespace MCMAIP.Controllers
{
    public class NewsController : Controller
    {
        //
        // GET: /News/
        MCMAIPEntities storeDB = new MCMAIPEntities();

        public ActionResult Index()
        {
            return View();
        }


        //[Route("a/video")]
        public ActionResult GetNews(int count)
        {
            var news = GetTopSellingNews(count);

            return Json(news, JsonRequestBehavior.AllowGet);

        }

        private List<News> GetTopSellingNews(int count)
        {
            // Group the order details by album and return
            // the albums with the highest count
            SampleData sd = new SampleData();
            //sd.InitializeDatabase(storeDB);
            sd.SeedData(storeDB);
            return storeDB.NewsList
                .OrderByDescending(a => a.Id)
                .Take(count)
                .ToList();
        }

        //
        // GET: /News/Detail/5

        public ActionResult Detail(int id)
        {
            SampleData sd = new SampleData();
            sd.SeedData(storeDB);
            var news = storeDB.NewsList.Single(a => a.Id == id);
            return View(news);
        }

        //
        // GET: /News/Search/5
        [Authorize(Roles = "Admin")]
        public ActionResult Search()
        {
            var newsList = GetTopSellingNews(10);

            return View(newsList);
        }

        //
        // POST: /News/Search/5

        [HttpPost]
        public ActionResult Search(String title)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                var newlist = storeDB.NewsList.Single(a => a.Title == title);
                return View(newlist);
            }
        }

        //
        // GET: /News/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /News/Search/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
