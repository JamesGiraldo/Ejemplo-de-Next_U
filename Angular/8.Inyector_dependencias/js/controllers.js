'use strict';

var realTempAppControllers = angular.module('realTempAppControllers', []);
realTempAppControllers.controller('TempController', function($scope, Temp){
	$scope.tempInCelcius = 0.0;
	$scope.resultInFahrenheit = 0.0;
	$scope.resultInKelvin = 0.0;

	$scope.convertTemperatures = function() {
		$scope.resultInFahrenheit = Temp.celciusToFahrenheit($scope.tempInCelcius);
		$scope.resultInKelvin = Temp.celciusToKelvin($scope.tempInCelcius);
	}
});
