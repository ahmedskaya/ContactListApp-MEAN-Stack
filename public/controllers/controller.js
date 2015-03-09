var ContactListApp = angular.module('ContactListApp', ['ngOrderObjectBy', 'xeditable']);
ContactListApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	var refresh = function() {
		$http.get('/contactlist').success(function(response) {
			$scope.contactlist = response;
			$scope.contactS = "";
		});
	};
	refresh();

	$scope.addContact = function() {
		$http.post('/contactlist', $scope.contactS).success(function(response) {
			refresh();
		});
	};

	$scope.remove = function(id) {
		$http.delete('/contactlist/' + id).success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		$http.get('/contactlist/' + id).success(function(response) {
			$scope.contact = response;
		});
	};

	// new update function matches the inline-edit
	$scope.update = function(data, id) {
		//$scope.user not updated yet
		angular.extend(data, {id: id});
		$http.put('/contactlist/' + $scope.contact._id, data).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = "";
	}

	// order criteria
	$scope.criteria = 'name';
    $scope.direction = false;
    $scope.setCriteria = function(criteria) {
      if ($scope.criteria === criteria) {
        $scope.direction = !$scope.direction;
      } else {
        $scope.criteria = criteria;
        $scope.direction  = false;
      }
    };

}]);﻿

// inline edit
ContactListApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});