(function() {
  'use strict';

  angular
    .module('benework')
    .controller('userController', userController);

  function userController($state,$stateParams) {
    var vm = this;

    vm.init = init;
    vm.anotheruser = anotheruser;

    var uid = $stateParams.uid;
    if(uid === undefined){
      uid = "cc08cec4-7147-44d4-b1bc-4d861ab23c5e";
    }

    vm.userdata = [];
    vm.selectedtag;
    //var uid = "cc08cec4-7147-44d4-b1bc-4d861ab23c5e";
    var uidindex;

    async function init(){
      /*
      await axios({
        method: 'get',
        url: '/assets/data/user.json'
      })
      .then(function(res) {
        vm.userdata = res.data;
      });
      */

      await firebase.database().ref('/user/').limitToFirst(8).once('value')
      .then(function(snapshot) {
          vm.userdata = snapshot.val();
          //console.info(vm.userdata);
      });

      for(var i=0; i<vm.userdata.length; i++){
        if(vm.userdata[i].user_id==uid){
          uidindex = i;
          vm.name = vm.userdata[i].title;
          //break;
        }
        //document.getElementById('data-area').insertHTML = '<h4>aa</h4>' + vm.userdata[i].title;
      }


      var nodedata = [{id:1, shape: 'circularImage', image: vm.userdata[uidindex].photo}];
      var tagdata = vm.userdata[uidindex].tags;
      var nodeIds = [];
      for(var i = 0; i < tagdata.length; i++){
        var tmp = tagdata[i]
        if(tmp.length>8){
          tmp = tmp.substr(0,7)+"…"
        }
        nodedata.push({id:i+2, label: tmp});
        nodeIds.push(i+2);
      }
      var nodes = new vis.DataSet(nodedata);

      // create an array with edges
      var edgedata = [];
      for(var i = 0; i < tagdata.length; i ++){
        edgedata.push({from: 1, to: i+2});
      }
      var edges = new vis.DataSet(edgedata);

      // create a network
      var container = document.getElementById('mynetwork');
      //var container = vm.mynetwork;

      // provide the data in the vis format
      var data = {
          nodes: nodes,
          edges: edges
      };
      var options = {
        //width: '100%',
        //height: '450px',
        edges: {
           length: 120
        },
        interaction:{hover:true},
        autoResize: true
      };

      // initialize your network!
      var network = new vis.Network(container, data, options);

      await network.on("afterDrawing", function (ctx) {
        var nodePosition = network.getPositions(nodeIds);
        var nodeNames = {};
        for(var i = 0; i < nodeIds.length; i ++){
          nodeNames[nodeIds[i]] = network.body.nodes[nodeIds[i]].options.label;
        }

        //console.info(nodeNames);
        ctx.strokeStyle = '#294475';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#A6D5F7';
        for(var i = 0; i < nodeIds.length; i ++){
          var nodeX = nodePosition[nodeIds[i]].x;
          var nodeY = nodePosition[nodeIds[i]].y;
          ctx.circle(nodeX, nodeY,70);
          ctx.fill();
          ctx.stroke();

          var count = 0;

          for(var j=0; j<vm.userdata.length; j++){
            if(vm.userdata[j].user_id == uid){
              continue;
            }

            if(vm.userdata[j].tags.indexOf(nodeNames[nodeIds[i]]) >= 0){
              var image = new Image();
              image.src = vm.userdata[j].photo;
              var imageSize = 30;
              var imageX = 5;
              var imageY = 5;
              if(count == 0){
                ctx.drawImage(image, nodeX-imageX-imageSize, nodeY-imageY-imageSize+10, imageSize, imageSize);
              }else if(count == 1){
                ctx.drawImage(image, nodeX+imageX, nodeY-imageY-imageSize+10, imageSize, imageSize);
              }else if(count == 2){
                ctx.drawImage(image, nodeX-imageX-imageSize, nodeY+imageY+10, imageSize, imageSize);
              }else{
                ctx.drawImage(image, nodeX+imageX, nodeY+imageY+10, imageSize, imageSize);
              }
              count++;
            }
            if(count>3){
              break;
            }
          }

        }
        //ctx.rect(nodePosition[nodeId].x-50,nodePosition[nodeId].y-50,100,30);
        var txtXuni = 10;
        var txtY = 40;
        ctx.fillStyle = '#294475';

        for(var i = 0; i < nodeIds.length; i ++){
          var nodeName = nodeNames[nodeIds[i]];

          var nodeX = nodePosition[nodeIds[i]].x;
          var nodeY = nodePosition[nodeIds[i]].y;
          var txtX = 0;
          for (var j = 0; j < nodeName.length; j++) {
            var c = nodeName.charCodeAt(j);
            if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
              txtX += 1
            }else{
              txtX += 2
            }
          }
          //console.info(txtX);

          if(txtX > 8){
            ctx.font = String(txtXuni*1.3) + "px Arial";
            txtX = txtX*5/1.5;
          }else{
            ctx.font = String(txtXuni*2) + "px Arial";
            txtX = txtX*5;
          }
          ctx.fillText(nodeName, nodeX-txtX, nodeY-txtY);

        }
      });

      network.on("click", function (params) {
        params.event = "[original event]";
        if(params.nodes.length == 0){
          return 0;
        }
        vm.selectedtag = network.body.nodes[params.nodes].options.label;

      });

    };

    async function anotheruser(uid) {
      //console.info(uid);
      $state.go('user', {
        uid: uid
      });
    }
  }
}());
