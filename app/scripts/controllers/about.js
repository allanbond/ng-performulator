'use strict';

/**
 * @ngdoc function
 * @name angularMaterialTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularMaterialTestApp
 */
angular.module('angularMaterialTestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
