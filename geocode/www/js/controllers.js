angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {

  $scope.mapCreated = function(map) {

      //   var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 8,
           center: {lat: 4.465934, lng: -75.0002451}
         });
         // Variable para permitir la Geolocalización.
         var geocoder = new google.maps.Geocoder();

         document.getElementById('submit').addEventListener('click', function() {
           geocodeAddress(geocoder, map);
         });
         $scope.map = map;
alert("entra");
  };

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: ' current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function (error) {
      alert('Unable to get location: ' + error.message);
    });
  };
});
