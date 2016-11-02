//请尝试把BookListCtrl中加载书籍列表数据的部分抽出来作为一个服务,
//共用add &detail 改为动态的 共享数据



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
