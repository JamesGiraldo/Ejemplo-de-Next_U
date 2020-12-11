'use strict';

var realTempAppServices = angular.module('realTempAppServices', []);
realTempAppServices.factory('Temp', function() {
	return{
		celciusToFahrenheit: function(temp) {
			var tempInFahrenheit = 0.0;
			var tempInCelcius = temp;
			tempInFahrenheit = tempInCelcius * (9/5) + 32;
			return tempInFahrenheit;
		},
		celciusToKelvin: function(temp) {
			var tempInKelvin = 0.0;
			var tempInCelcius = temp;
			tempInKelvin = tempInCelcius - 273.15;
			return tempInKelvin;
		}
	};
});