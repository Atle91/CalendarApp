using WebApplication5.ClientApp.filter;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
namespace WebApplication5.Controllers
{
    [Authorize]
    public class ValueController : Controller
    {

        
        //GET: Value/Get
        [Route("api/Value")]
        [JwtAuthentication]
        public bool Get()
        {
            Debug.WriteLine("value/post");
            return true;
        }
    }
}
