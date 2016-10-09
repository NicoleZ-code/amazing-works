# ASP.NET MVC 
### Asp.Net WebForm 的优缺点
优点：  
（1）入门简单，过度平滑  
（2） 快速开发  
（3） 控件  
（4） 事件驱动  
缺点：  
 （1）代码架构 简单平铺直叙 ,逻辑集中  
 （2）不利于单元测试  
 （3）ViewState 保存网页状态 ，性能问题，太大了  
 （4）重用性 维护性差   
 （5）对HTML缺少控制   
 （6）不适合团队开发

## - LINQ 
- - select 
- - add 
- - update
- - delete
- - join  
- - into, new ,let
> MSDN https://code.msdn.microsoft.com/101-LINQ-Samples-3fb9811b     
  
## MVC

Model 数据模型  
View 页面展示  
Controller 逻辑控制  

-  ASP.NET MVC 的框架默认使用“约定胜于配置”的原则
在 ASP.NET MVC 中使用了下面的一些基本的命名约定
文件夹 功能
－/Controllers 控制器接受来自浏览器的请求，进行处理，然后向用户返回回应
－/Views 视图文件夹保存用户界面的模板
－/Models 这个文件夹定义处理的数据
－/Content 我们的图片，CSS 以及其他任何的静态内容放在这里
－/Scripts 放置脚本文件
－/App_Data 数据库文件 

- ### 控制器 Controller

> 控制器是MVC应用程序的“指挥员”，它精心紧密地编排用户、模型对象和视图的交互。同时控制器还负责响应用户输入，操纵正确的模型对象，然后选择合适的视图显示给用户以作为对用户最初输入的响应。


```
graph LR
Controller-->响应URL请求

```
 - - 带参数 url+ ？name=
 - - 默认参数 Controller/ID 
 - - 自定义控制器
 > 在一般应用中，控制器通过URL被调用，然后执行自定义的代码并返回一个视图，但复杂应用中可以自定义控制器。




- ### 视图 View

> 视图的职责是向用户提供页面。（1）检查由控制器提交的模型对象（2）将其内容转换为HTML格式（为主）

:)  View  ——> Controller 传递数据
控制器的 Action 方法通过返回的 ActionResule 可以传送模型对象给视图。

- - **ViewData 和 ViewBag**  
    ViewData ["Axx"] 与ViewBag.Axxx用法相同，但值不互等。  
    ViewBag 是前者的动态分装  

```
//动态值不能作为参数传递给扩展方法，必须指定具体类型
  @Html.TextBox("Name",(string)View.Bag.Axxx)     
  = @Html.TextBox("Name",ViewData ["Axx"]) 
```
- - **强类型视图**
 
3种方法迭代  
（1）  
Controller
```
public ActionResult List(){
    var albums = new List<Album>();
    for(int i=0; i<10; i++){
        albums.Add(new Album { Title = "Product" + i });
    }
    ViewBag.Album = album;
    return View();
}
 
```
View
```
<ul>
@ foreach (Album a in (ViewBag.Album as IEnumerable<Album>)){
    <li>@a.Title</li>
}
</ul>
```
（2）dynamic关键字
```
<ul>
@ foreach (dynamic a in ViewBag.Album ){
    <li>@a.Title</li>
}
//没法用智能提示@a.
</ul>
```

（3）@model  
Controller View()重载
```
 ...
 return View(album)
```
View 

```
//必须输入完模型类型的全限定类型名
@model IEnumerable<MVCApplication1.Models.Album>
<ul>
@ foreach (Album a in Model ){
    <li>@a.Title</li>
}
or
@using MVCApplication1.Models
@model IEnumerable<Album>
...
建议在View 目录下的web.config 中添加
<add namespace = "MVCApplication1.Models" />
```
- - **视图特定模型**
```
//Controller
public class MyModel{
    ...
}
//View
@model MyModel
```
- - **添加视图**  
   自定义基架视图

- - **Razor视图引擎**  

```
- HTML Helpers

- Html.BeginForm //同步Ajax搜索
- 通过 Ajax.BeginForm //实现 异步Ajax

- @HTML.ActionLink ->//a标签带地址 url变 ,跳转动作 @HTML.ActionLink("Add to cart", "AddToCart", "ShoppingCart", new { id = Model.AlbumId }, "")//跳转传参数
- @HTML.Action -> //url 直接跳转
- @HTML.Content("~/xxx.js") //将应用程序相对路径转换为绝对路径
```


(1)布局 

```
@RenderBody() //占位符，用来标记使用这个布局的视图将渲染它们的主要内容的位置。

@RenderSection("Footer")

@section Footer{
    This is the <strong>Footer</strong>.
}
@section //语法为布局中定义的一个节指定内容

```
(2)模板Razor 委托 

(3)指定部分视图 PartialView()

(4) 数据注解和验证


```
[Required] //非空
[DataType(DataType.Password)] //显示type="password"
[Display(Name = "Current password")]//显示编辑注解
 public string OldPassword { get; set; }

[Required]
[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
[DataType(DataType.Password)] //控制长度 自定义错误消息
[Display(Name = "New password")]
public string NewPassword { get; set; }

[DataType(DataType.Password)]
[Display(Name = "Confirm new password")]
[Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")] //比较相等
public string ConfirmPassword { get; set; }

...more
Range(,) 范围 Range(typeof(Decimal),"0.00","49.99") Range(typeof(Date),start ,end )
[RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}",
            ErrorMessage = "Email is is not valid.")] //正则表达式
Remote //以利用服务器的回调函数执行客户端的验证逻辑
。。。
自定义验证逻辑
ex MAX~
```
    
    
- ###   模型 Model

## Entity Framework 
> NuGet工具 安装EF6  
> 对象关系映射框架

（0）创建数据模型 sql脚本 -> DB -> Model

（1）code first   new/Link old
- 升级数据库 Migration
- - tools-> console-> 
```
- Enable-Migration
- Add-Migration XXname
- Update-Database
```
//实际操作
－SampleDate.cs /Blogingcontext.cs 上下文类( 这个类的名称必须与数据库连接串的名称一致,这个类将反映 Entity Framework 数据库的上下文，用来处理创建，读取，更新
和删除的操作)
－ console 程序main 中
```
using(var ctx = new Blogingcontext()){
	ctx.Blogs.Add(new Blog{Id = "" , name="" })
}
```

```
Global.asax
System.Data.Entity.Database.SetInitializer(new MCMAIP.Models.SampleData());
//But MusicStore项目里没这句话 vs2013, 官方pdf里有
```

（2）model first  new  model->db/class 


（3）database first 

### 三步骤
1. 实现模型类
2. 为控制器和视图构建基架（创建Controller and View）
3. 选择数据库初始化策略


## ASP.NET MVC Ajax
### 三种Ajax方法
 
 0. HTML.BeginForm() 同步方法 非AJax
 1. Ajax.BeginForm 异步AJax －》 解析为<form></form>
 2. Ajax.ActionLink 异步链接
 3. Client Validatation  input 验证


## 成员资格，授权和安全性 

>**《ASP.NET MVC4 高级编程》** 
>极客学院视频 URL   (http://www.jikexueyuan.com/course/828.html)

- 3种验证方式

```
1. Form Auth    Internet互联网项目
2. Windows Auth  Intranet局域网项目 IP管理
3. OpenID/OAuth 第三方登录 Facebook Google WeiXin QQ 
```
－ －  开启Windows 认证方式Windows Authentication  
 web.config 

```
 <authentication mode ="windows">
	 <deny users="?" />
 </authentication>
```
－ －
###- 授权

- 允许匿名访问某些模块
```
[AllowAnonymous]
```
- 按条件（如：角色）分权限
```
[Authorize(Roles = "Admin")] //对Controller限制或者action限制都可以
```

###- 安全性
 - ASP.NET WebForm 的保护机制

```
1. 服务器组件对显示的值和特性进行HTML编码，阻止XSS攻击。
2. 加密和验证视图状态，从而帮助阻止篡改提交的表单。
3. 请求验证（%@ Page validaterequest="true" %）截获看起来是恶意的数据，并给出警告（这是ASP.NET MVC 框架默认开启的保护）。
4. 事件验证帮助阻止注入式攻击和提交无效值
```
- 锦囊妙语
- - 永远都不要相信用户提供的任何数据。
- - 每当渲染作为用户输入而引入的数据时，请对其进行HTML编码(如果数据作为特性值显示，就应对其进行HTML特性编码 HTML-attribute-encode)。**==（Http.HtmlEncode()/server.HtmlEncode() 编码 防止参数js注入式攻击）==**
- - 考虑好网站的哪些部分允许匿名访问 ex~[AllowAnonymous]，哪些部分要求认证访问 ex~[Authorize(Roles="Admin")]。
- - 不要试图自己净化用户的HTMl输入（使用白名单或其他方法）——否则就会失败。
- - 在不需要通过客户端脚本（大部分情况下）访问cookie时，使用HTTP-only cookie。
- - 请记住，外部输入不是显示的表单域，因为它包括URL查询字符串、隐藏表单域、Ajax请求以及我们使用的外部Web服务结果等。
- - 强烈建议使用AntiXSS 库（wwww.codeplex.com/AntiXSS）。

- **注册全局授权过滤器** ? Filter? 

- HTTPS
 
```
[RequireHttps]
```


- XXS攻击  跨站脚本攻击
- HTML 编码

```
@ {
    string message = "<strong>This is blod!</strong>";
}
@Html.Raw(message)
//显示
<span><strong>This is blod!</strong></span>

Razor 视图引擎默认对输出内容采用HTML编码
```
 
 Javascript 字符串编码  
  
```
@Ajax.JavaScriptStringEncode()
```
- AnitXSS 库 NuGet 安装 

```
@using Microsoft.Security.Application

@Encoder.JavaScriptEncode(ViewBag.UserName,false)
```
-  阻止CSRF攻击  
  (1)令牌验证

```
<form action="/account/register" method="post">
    @Html.AntiForgeryToken();
...
</form>

[ValidateAntiforgeryToken]
public ActionResult Register(...)
```
   (2)幂等的GET请求  
   (3)HttpReferrer验证  
     使用ActionFilter

- 使用HttpOnly阻止Cookie盗窃
```
web.config

<httpCookies domain="" httpOnlyCookies="true" requireSSL="false"/>
```
- 重复提交  
（1）使用Bind

```
[Bind(Include="Name, Comment")]
public class Review(){...}
```
 (2)UpdateModel or TryUpdateModel
 
```
UpdateModel(review,"Review",new String[]{ "Name" , "Comment"});
```
 (3)视图模型ViewModel，避免直接绑定到数据模型，只缓存用户设置的属性来阻止攻击。
 
```
public class ReviewViewModel{
    public string Name { get; set;}
    public string Comment { get; set;}
}
```
- 阻止开放重定向攻击

```
调用RedirectToLocal()
对returnUrl 参数进行验证，调用Url.IsLocalUrl()
```

- 适当的错误报告和堆栈跟踪

```
web.config
<customError mode="Off">
 On 隐藏所有错误提示  
 RemoteOnly 向大多数用户隐藏，只向拥有服务器访问权限的用户展示
 Off 向每个用户展示详细错误提示消息
 
 PS： 自定义错误页面？
 
```
 （1）使用配置转换
 （2）在生产环境中使用Retail 部署配置
 （3）使用专门的错误日志系统 ，如ELMAH

- 总结 


威胁| 解决方法
---|---
自满 | 自我训练。假设应用程序将被黑客攻击。记住：保护好自己的数据最重要。
跨站脚本攻击（XSS） | 使用HTML编码所有内容。编码特性。记住Javascript编码。如有可能，使用AntiXSS 类。
跨站请求伪造（CSRF） |令牌验证。幂等的GET请求。HttpReferrer验证。
重复提交 |使用Bind特性显示地绑定白名单或者拒绝黑名单




## 路由

- 配置
```
Global.asax.cs

public static void RegisterRoutes(RouteCollection routes){
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

    routes.MapRoute(
        "Default", // Route name
        "{controller}/{action}/{id}", // URL with parameters
        new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
    );

}
```
- 路由约束
>允许URL段使用 正则表达式来限制路由是否匹配请求。

**Regex**类

- 路由命名

```
-定义路由 
public static void RegisterRoutes(RouteCollection routes){
    routes.MapRoute(
        name: "Test",
        url: "code/p/{action}/{id}",
        defaults: new { controller = "Section", action = "Index", id ="" }
    );
    routes.MapRoute(
        name: "Default",
        url: "{controller}/{action}/{id}",
        defaults: new { controller = "Home", action = "Index", id ="" }
    );
}
-在视图中生成一个指向每个路由的超链接
@Html.RouteLink("Test", new {controller = "section", action = "Index", id=123})
@Html.RouteLink("Default", new {controller = "Home", action = "Index", id=123})
```

```
-假设我们在路由列表的开始部分添加了 如下的页面路由，以便/aspx/SomePage.aspx页面能够处理URL/static/url:
routes.MapPageRoute("new", "static/url", "~/aspx/SomePage.aspx")
// URL 不可用

修正 
- 指定路由名称不仅可以有效避免二义性，甚至还可以在某种程度上提高性能，因为路由yi引擎可以直接定位到指定的路由，并尝试用它来生成URL。  
下面代码使用了命名参数。
@Html.RouteLink(
    linkText: "route: Test",
    routeName: "test",
    routeValues: new {controller = "section", action = "Index", id=123}
)
@Html.RouteLink(
    linkText: "route: Default",
    routeName: "default",
    routeValues: new {controller = "Home", action = "Index", id=123}
)
```
- URL精确匹配，贪婪匹配？
- 路由调试
 -- RouteDebugger


###实例－MCMAIP  DEMO 南京微软技术中心demo

－ 数据库（建立，add测试数据）
－ model ->controller  传递数据
－ controller ->view 展示数据 ，操作

github 项目地址: 





## 
MVVM ？Model View ViewModel  
分久必合合久必分 所谓框架
  
:) RESETfull 风格的Web服务交互 Angular.js