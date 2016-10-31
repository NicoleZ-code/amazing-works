using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MCMAIP.Models
{
    public class News
    {
        public int Id { get; set; }
        /**public System.DateTime DateCreated { get; set; }*/
        public String DateCreated { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string Decs { get; set; }
        
    }
}