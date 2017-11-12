(function() {
  'use strict';

  angular
    .module('benework')
    .controller('topController', topController);

  function topController($state) {
    var vm = this;

    vm.benefitDetail = benefitDetail; 

    function benefitDetail(bid) {
      console.info(bid);
      $state.go('benefit', {
        bid: bid
      });
    }
    
  }
}());
