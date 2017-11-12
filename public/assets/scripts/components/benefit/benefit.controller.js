(function() {
  'use strict';

  angular
    .module('benework')
    .controller('benefitController', benefitController);

  function benefitController($stateParams) {
    var vm = this;

    vm.title = 'benefit';
    vm.data = [];
    vm.init = init;
    var bid = $stateParams.bid;
    console.log(bid);

    async function init(){
      
      // await firebase.database().ref('/benefit/').limitToLast(1).once('value')
      await firebase.database().ref('/benefit/'+bid+'/').once('value')
        .then(async function(snapshot) {
          vm.data = await snapshot.val();
          console.log(vm.data);
        });
    }
  }
}());
