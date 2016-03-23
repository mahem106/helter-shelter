'use strict';

var app = angular.module('PetApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: 'html/home.html', controller: 'homeCtrl' })

  $urlRouterProvider.otherwise('/');
});
