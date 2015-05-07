'use strict';

/**
 * @ngdoc function
 * @name angularMaterialTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMaterialTestApp
 */
angular.module('angularMaterialTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    this.model= {};
    
    var generateData = function(rows, cols) {
      var data = new Array(rows);
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          if (j === 0) {
            data[i] = new Array(cols);
          }
          data[i][j] = 'R' + i + 'C' + j;
        }
      }
      return data;
    };
    
    var that = this;
    $scope.render = function() {
      that.model.data = generateData(that.model.rows, that.model.cols);  
    }
    
    this.model.data = generateData(10, 5);
  });
