
/**
*  loginModule
*
* Description
*/
var loginModule = angular.module('LoginMoudle', []);
	loginModule.controller('loginController', function($scope, $http){
		$scope.userInfo = {
			"email":"",
			"password":""
		}
		//$http 异步验证用户名密码是否正确
		
	});


/**
*  registerModule
*
* Description
*/
var registerModule = angular.module('RegisterMoudle', []);
	registerModule.controller('registerController', function($scope, $http,$filter){
		$scope.userInfo = {
			"email":"",
			"password":"",
			"password2":""
		}
		//$http 异步验证用户名密码是否存在
	});
