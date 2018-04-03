using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApplication5.Models;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System.Text;

namespace WebApplication5.Controllers
{
    public class HomeController : Controller
    {

        DBConnect dbconnection = new DBConnect();

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Access()
        {
            return View();
        }
         public IActionResult CheckUserName(string name)
         {
             string query = String.Format("SELECT EXISTS(SELECT 1 FROM users WHERE username = '{0}')", name);

             bool exist = dbconnection.CheckUser(query);

             return Json(exist);
         }

        public IActionResult Recon()
        {
            return View();
        }
       
        public IActionResult Login([FromBody]LoginInfo user)
        {
            Debug.WriteLine("user:", user);
            string query = String.Format("SELECT username, password FROM users WHERE username = '{0}'", user.name);
            if (dbconnection.AttemptLogin(query, user.password))
            {
                Debug.WriteLine("true:");
                return Json(true);
            }
            return Json(false);
        }
        
        [HttpPost]
        public IActionResult Register([FromBody]LoginInfo user)
        {


            string query = String.Format("INSERT INTO users (username, password) VALUES ('{0}', MD5('{1}'))", user.name, user.password);
            Debug.WriteLine(query);

            dbconnection.Command(query);
            

            return View("Index");
        }
        [HttpPost]
        public IActionResult PersistStore([FromBody]StoreInfo model)
        {
            Debug.WriteLine("Name:",model);
            string query2 = String.Format("SELECT EXISTS(SELECT 1 FROM store WHERE author = '{0}')", model.id);
            string query3 = null;
            if (dbconnection.CheckUser(query2))
            {
                query3 = String.Format("UPDATE store SET state = '{0}' WHERE author = '{1}'", model.state, model.id);
            }else
            {
                query3 = String.Format("INSERT INTO store (state, author) VALUES ('{0}', '{1}')", model.state, model.id);
            }
            dbconnection.Command(query3);
            return Json(true);
        }
        [HttpPost]
        public IActionResult GetItem([FromBody]string name)
        {
            string query = String.Format("SELECT id FROM users WHERE username = '{0}'", name);
            string item = dbconnection.getId(query, name);
            return Json(item);
        }
        public IActionResult GetState([FromBody] string id)
        {
            string query = String.Format("SELECT state FROM store WHERE author = '{0}'", id);
            string state = dbconnection.getId(query, id);
            return Json(state);
        }
        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
