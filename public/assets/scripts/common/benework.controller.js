(function() {
  'use strict';

  angular
    .module('benework')
    .controller('commonController', commonController);

  function commonController() {
    var vm = this;

    vm.title = 'benework';
  }
}());
