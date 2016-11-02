
/**
 * 用户管理模块 －注册 登陆
 *  
 */
var userManageMoudle = angular.module('UserManageMoudle', []);
/**
*  用户管理服务
*  @type {[type]}
*/
userManageMoudle.factory('userListService', ['$http',function($http) {
        var doRequest = function(username, path) {
            return $http({
                method: 'GET',
                url: 'data/userInfo.json'
            });
        }
        return {
            userList: function(username) {
                return doRequest(username, 'userList');
            }
        };
    }
]);

/**
*  登录loginController
*  @type {[type]}
*/
userManageMoudle.controller('loginController', function($scope, $http,$location,$state,userListService){
    $scope.userInfo = {
        "email":"",
        "password":""
    };
    $scope.submit = function(isValid){
        if(isValid){
            //$http 异步验证用户名密码是否正确
            // 如何控制登录成功跳转 ui-sref="booklist({bookType:0})"
            //$location.toXXXX = booklist({bookType:0});
            $http.get("data/userInfo.json")
                .success(function(response){
                    for (var i = 0; i < response.length; i++) {
                        if($scope.userInfo.email == response[i].email && $scope.userInfo.password == response[i].password){
                            //$location.path("/booklist");
                            $state.go("booklist",{bookType:0});
                            //$state.go("booklist({'bookType':0})");
                            /*
                             Could not resolve 'booklist({bookType:0})' from state 'index'
                             */
                            console.log("$location-"+$location)
                            console.log($location)
                            console.log("$state-"+$state)
                            console.log($state)
                            return ;
                        }
                    }
                    
                })
                .error(function(){
                    console.log("$http error")
                });
            
        }
    }
    
});


/**
*  注册registerController
*  @type {[type]}
*/
userManageMoudle.controller('registerController', function($scope, $http,$state,userListService){
    $scope.userInfo = {
        "email":"",
        "password":"",
        "password2":""
    };
    $scope.$watch("userInfo.password2",function(){
        //console.log($scope.userInfo["password"],$scope.userInfo["password2"])
        //underfined underfined
        if($scope.userInfo["password"]!=$scope.userInfo["password2"]){
            $scope.info = "两次密码不一致";//慕课网还有一种directive的方法
        }
    });
    $scope.register = function(isValid){
        if(isValid){
            //$http 异步验证用户名密码是否存在
            //nodejs 是否能操作写入文件
            $http.get("data/userInfo.json")
                .success(function(response){
                    for (var i = 0; i < response.length; i++) {
                        if($scope.userInfo.email == response[i].email && $scope.userInfo.password == response[i].password){
                            $scope.info = "用户已存在";
                        }else{
                            console.log("注册成功！")
                            //$state.go("index");
                        }
                    }
                    
                })
                .error(function(){
                    console.log("$http error")
                });
        }
    }
    
});