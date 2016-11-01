"use strict";
/**
 * 这里是书籍目录展示模块
 * @type {[type]}
 */
var bookCatalogueModule = angular.module("BookCatalogueModule", []);
bookCatalogueModule.controller('BookCatalogueCtrl', function($scope){
    
    $scope.bookCatalogue = [{
        "bookTypeId":0,
        "bookName":'全部'
    },{
        "bookTypeId":1,
        "bookName":'计算机'
    },{
        "bookTypeId":2,
        "bookName":'金融'
    },{
        "bookTypeId":3,
        "bookName":'哲学'
    },{
        "bookTypeId":4,
        "bookName":'高端办公'
    }];

    $scope.collapse = true;

    //toggle手风琴功能
    $scope.toggle =function(){
        $scope.collapse =  !$scope.collapse;
    };
    //菜单配置
    
}); 

//封装组件 bootstrap UI,AngularUI
bookCatalogueModule.directive('', ['', function(){
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        // scope: {}, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm, iAttrs, controller) {
            
        }
    };
}]);


/**
 * 这里是书籍列表模块
 * @type {[type]}
 */
var bookListModule = angular.module("BookListModule", []);
bookListModule.controller('BookListCtrl', function($scope, $http, $state, $stateParams) {
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.books = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    //这里可以根据路由上传递过来的bookType参数加载不同的数据
    console.log($stateParams);
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',
        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true,
            width: 200
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 100
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
});



/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
    //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    //不能直接传递过去???
});

/**
 * 这里是书籍add模块  弹出框形式 添加之后可以共用 页面会展示出来
 * @type {[type]}
 */
var bookAddModule = angular.module("BookAddlModule", []);
bookAddModule.controller('BookAddCtrl', function($scope){
    
    $scope.addBook = function(){

    }
});

/**
*  验证登录loginModule
*
* Description
*/
var loginModule = angular.module('LoginMoudle', []);
loginModule.controller('loginController', function($scope, $http,$location,$state){
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
*  验证注册registerModule
*
* Description
*/
var registerModule = angular.module('RegisterMoudle', []);
registerModule.controller('registerController', function($scope, $http,$state){
    $scope.userInfo = {
        "email":"",
        "password":"",
        "password2":""
    };
    $scope.$watch("userInfo.password2",function(){
        //console.log($scope.userInfo["password"],$scope.userInfo["password2"])
        //underfined underfined
        if($scope.userInfo["password"]!=$scope.userInfo["password2"]){
            $scope.info = "两次密码不一致";
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
