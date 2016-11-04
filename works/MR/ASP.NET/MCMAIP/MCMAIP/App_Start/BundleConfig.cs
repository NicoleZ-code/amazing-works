using System.Web;
using System.Web.Optimization;

namespace MCMAIP
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery-{version}.js"
                       ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/css/cssCommon.css",
                "~/Content/css/cssUi.css"
                 ));


        }
    }
}