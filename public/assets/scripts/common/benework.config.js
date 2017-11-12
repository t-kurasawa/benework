(function() {
  'use strict';

  angular
    .module('benework')
    .config(config);

  function config($locationProvider, $stateProvider) {
    var html5Config = {
      enabled: true,
      requireBase: false
    };
    var topState = {
      name: 'top',
      url: '/#top',
      templateUrl: '/assets/scripts/components/top/top.html',
      controller: 'topController as tc'
    };
    var userState = {
      name: 'user',
      url: '/#user?uid',
      templateUrl: '/assets/scripts/components/user/user.html',
      controller: 'userController as uc'
    };
    var benefitState = {
      name: 'benefit',
      url: '/#benefit?bid',
      templateUrl: '/assets/scripts/components/benefit/benefit.html',
      controller: 'benefitController as bc'
    };

    $locationProvider.html5Mode(html5Config);
    // $locationProvider.hashPrefix('!');
    $stateProvider.state(topState);
    $stateProvider.state(userState);
    $stateProvider.state(benefitState);
  }
}());
