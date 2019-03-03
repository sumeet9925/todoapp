var app = angular.module("todo", []);

app.controller('mainCtrlr', ['$scope','addService', function ($scope,addService) {
	var scope = $scope;
	window.scope = scope;
	
	if(!localStorage.getItem("data")){
		localStorage.setItem("data", "[]");
	}else{
		var data = localStorage.getItem("data");
		scope.data = JSON.parse(data);
	}

	
	scope.addItem = function(){
		if(scope.item.name.length > 0){
			scope.list = addService.add({'name':scope.item.name, 'update':false});
			addService.localStorageUpdate();
			scope.item.name = '';
		}else{
			alert("Please enter a value");
		}
		
		
	}
	scope.delete = function(idx){
		addService.delete(idx);
		addService.localStorageUpdate();
	}
	scope.edit = function(idx){
		addService.edit(idx);
		addService.localStorageUpdate();
	}
	scope.update = function(idx){
		addService.update(idx);
		addService.localStorageUpdate();
	}

	scope.$watch(function(){
		return localStorage.getItem('data');
	}, function(newData, oldCodes){
		scope.data = JSON.parse(newData);
	});

}])

app.service('addService', [function () {
	
	var _list = localStorage.getItem("data");
	
	var list = JSON.parse(_list) || [];

	this.add = function(item){
		list.push(item)
		return list;
	}

	this.delete = function(idx){
		list.splice(idx,1);
		return list;

	}
	this.edit = function(idx){
		list[idx].update = true;
		return list;
	}
	this.update = function(idx){
		list[idx].name = scope.item.name;
		list[idx].update = false;
		return list;
	}

	this.localStorageUpdate = function(){
		localStorage.setItem("data", JSON.stringify(scope.list))	
	}
}])