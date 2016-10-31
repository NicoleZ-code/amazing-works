using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MCMAIP.Models;

namespace MCMAIP.Controllers
{
    public class NewsController : Controller
    {
        MCMAIPEntities storeDB = new MCMAIPEntities();
        //
        // GET: /News/Index

        public ActionResult Index()
        {
            // Get most popular news
            var newsList = GetTopSellingNews(10);
  
            return View(newsList);
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

        //
        // GET: /News/Details/5

        public ActionResult Details(int id)
        {
            var news = new News{Id = id};
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
