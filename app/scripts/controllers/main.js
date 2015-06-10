'use strict';

/**
 * @ngdoc function
 * @name angularMaterialTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularMaterialTestApp
 */
angular.module('angularMaterialTestApp')
  .controller('MainCtrl', function ($scope, $timeout) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    this.model= {};
    this.fastTableModel = {};
    this.reactTableModel = {};
    var that = this;
    var startTime = null; 
   
    $scope.generateData = function(rows, cols) {
      var data = new Array(rows);
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          if (j === 0) {
            data[i] = new Array(cols);
          }
          data[i][j] = 'R' + i + 'C' + j;
        }
      }
      that.data = data;
    };
    
    $scope.renderDirect = function() {
      startTime = new Date();
      that.tableType = 'direct';
      that.fastTableModel.data = that.data;
      $timeout(function() {
        that.model.renderTime = new Date() - startTime;
      });
    }
    
    $scope.renderAngular = function() {
      startTime = new Date();
      that.model.data = that.data;
      that.model.renderTime = null;
      that.tableType = 'angular';
      $timeout(function() {
        that.model.renderTime = new Date() - startTime;
      });
    }
 
     $scope.renderReact = function() {
      startTime = new Date();
      that.tableType = 'react';
      that.reactTableModel.data = that.data;
      $timeout(function() {
        that.model.renderTime = new Date() - startTime;
      });
    }  
    
  })
  .directive('fastTable', function() {
    return {
      link: function(scope, element, attrs) {
        // compile template
        var template = _.template(
           document.getElementById("tableTemplate" ).innerHTML
        );
        
        scope.$watch(attrs.model, function(model) {
          if (model) {
            var wrapper = {
              rows: model
            }
            element.html(template(wrapper));
          }
        })
      }
    }
  })
  .directive('reactTable', function() {
    return {
      link: function(scope, element, attrs) {

        var data;
        
        scope.$watch(attrs.model, function(model) {
          // build column metadata
          if (model) {
            data = model;
            
            var reactTable = React.createElement(ReactTable, props);
            console.log(React.renderToString(reactTable));
            React.render(reactTable, element[0]);      
          }
        })
       
        var colGetter = function() {
            // build col metadata
            var colDefs = [];
            if (data && data.length > 0) {
              var firstRow = data[0];
              for (var i = 0; i < firstRow.length; i++) {
                var col = {
                  name: 'col' + i
                }
                colDefs.push(col);
              }
            }
            
            return colDefs;
        };
        
        var rowGetter = function(index) {
          return data[index];
        };
        
        var rowsCount = function() {
          return data.length;
        }
        
        var props = {
          colGetter: colGetter,
          rowGetter: rowGetter,
          rowsCount: rowsCount,
          rowHeight: 25,
          tableWidth: 500,
          tableHeight: 500
        };
      }
    }
  });
