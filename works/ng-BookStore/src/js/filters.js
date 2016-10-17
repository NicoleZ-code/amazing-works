
/**
*  loginModule
*
* Description
*/
var loginModule = angular.module('LoginMoudle', []);
	loginModule.controller('loginController', function($scope, $http){
		$scope.userInfo = {
			"email":"abc@163.com",
			"password":"123456"
		}
	});


/**
*  registerModule
*
* Description
*/
var registerModule = angular.module('RegisterMoudle', []);
	registerModule.controller('registerController', function($scope, $http,$filter){
		// $scope.userInfo = {
		// 	"email":"",
		// 	"password":"",
		// 	"password2":""
		// }
	});
