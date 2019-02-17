var app = angular.module("todo", []);

app.controller('mainCtrlr', ['$scope','addService', function ($scope,addService) {
	var scope = $scope;
	window.scope = scope;
	scope.list = [];

	scope.addItem = function(){
		if(scope.item.name.length > 0){
			scope.list = addService.add({'name':scope.item.name});
			scope.item.name = '';
		}else{
			alert("Please enter a value");
		}
	}
	scope.delete = function(idx){
		addService.delete(idx);
	}
	// scope.update = function(idx){
	// 	addService.update(idx);
	// }
}])

app.service('addService', [function () {
	var list = [];

	this.add = function(item){
		  list.push(item)
		  return list;
	}

	this.delete = function(idx){
		scope.list.splice(idx,1);
	}

	// this.update = function(idx){
	// 	scope.item.name = scope.list[idx].name;
	// }
}])