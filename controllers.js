// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
  $scope.cityName = cityService.city;
  $scope.$watch('cityName', function () {
     cityService.city = $scope.cityName;
  });
  $scope.submit = function() {
    $location.path("/forecast");
  };

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
  $scope.cityName = cityService.city;
  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI =
  $resource('http://api.openweathermap.org/data/2.5/forecast/daily',
  {callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}});

  $scope.weatherResult = $scope.weatherAPI.get({ APPID: '3f9f60bc733ed53d0116606cfd9e5d74', q: $scope.cityName, cnt: $scope.days, units: 'metric' }); //request params according to API
  console.log($scope.weatherResult);
  $scope.convertToDate = function(dt) { return new Date(dt * 1000); };
}

]);
