/**
 * 这里是书籍目录展示模块
 * @type {[type]}
 */
var bookTypeModule = angular.module("BookTypeModule", []);
bookTypeModule.controller('BookTypeCtrl', function($scope){
    
    $scope.bookTypes = [{
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
bookTypeModule.directive('', ['', function(){
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