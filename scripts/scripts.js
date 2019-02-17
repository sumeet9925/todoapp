var app = angular.module("todo", []);

app.controller('mainCtrlr', ['$scope','addService', function ($scope,addService) {
	var scope = $scope;
	window.scope = scope;
	scope.list = [];

	scope.addItem = function(){
		if(scope.item.name.length > 0){
			scope.list = addService.add({'name':scope.item.name, 'done':false});
			scope.item.name = '';
		}else{
			alert("Please enter a value");
		}
	}
}])

app.service('addService', [function () {
	var list = [];

	this.add = function(item){
		  list.push(item)
		  return list;
	}
}])