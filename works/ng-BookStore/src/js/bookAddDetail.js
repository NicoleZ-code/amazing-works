//请尝试把BookListCtrl中加载书籍列表数据的部分抽出来作为一个服务,
//共用add &detail 改为动态的 共享数据
bookListModule.factory('bookListService', ['$http',function($http) {
        var bookItem = {
            "bookId":"",
            "index": "",
            "name": "",
            "author": "",
            "pubTime": "",
            "price":""
        }; 
        var doRequest = function(bookId,path) {
            return $http({
                method: 'GET',
                url: path,
                data:bookId
            }); //模拟携带参数 
        }
        var addBook = function(bookItem,path){
            return $http({
                method: 'get',//post
                url: path,
                data:bookItem
            }); //模拟携带参数待修改？？？
        }
        return {
            bookInit: function(){
                return bookItem;
            },
            getBookById: function(bookId) {
                return doRequest(bookId,'data/books0.json');
            },
            addBook: function(bookItem){
                return addBook(bookItem,'data/books0.json');
            }
        };
    }
]);


/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
bookListModule.controller('BookDetailCtrl', function($scope,$stateParams,bookListService) {
    //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    //不能直接传递过去???
    $scope.bookItem =  angular.copy(bookListService.bookInit(),$scope.bookItem);  
    
    bookListService.getBookById($stateParams.bookId)
        .success(function(data){
            console.log(" get data success ")
            for(var i = 0 ; i < data.length ; i++ ){
                if(data[i].bookId==$stateParams.bookId){
                    //js对象赋值 copy
                    $scope.bookItem = angular.copy(data[i],$scope.bookItem);
                }
            }
        })
        .error(function(){
            console.log("error")
        });
});

/**
 * 这里是书籍add模块 
 * @type {[type]}
 */
bookListModule.controller('BookAddCtrl', function($scope,$state,bookListService){
    $scope.bookInfo = angular.copy(bookListService.bookInit(),$scope.bookInfo);   
    $scope.typeList = ['全部','计算机','金融','哲学','高端办公'];
    $scope.addBook = function(){
        bookListService.addBook($scope.bookInfo)
         .success(function(data){
             console.log($scope.bookInfo)
            //   console.log(data)
            alert("add success");
            //$state.go("booklist({bookType:0})"); //eror
            $state.go("booklist",{bookType:0});
         });
    };
    $scope.clearData = function(){
        $scope.bookInfo = angular.copy(bookListService.bookInit(),$scope.bookItem);  
    };
});
