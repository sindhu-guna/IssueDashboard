//app.js
(
    function () {
    'use strict';
    angular
    .module('app', ['ngRoute', 'ngCookies', 'ui.bootstrap'])
    .config(config)
    .run(run);
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
    controller: 'HomeController',
    templateUrl: 'home.html',
    controllerAs: 'vm',
    })            
    .when('/register', {
    controller: 'RegisterController',
    templateUrl: 'register.html',
    controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });
    }    
    run.$inject = ['$rootScope'];
    function run(){
    console.clear();
    }
    })();