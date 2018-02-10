(function($){
    'use strict';
   
    var freeIpGEO = {};
    freeIpGEO.getGEO = function(){
       var xhr = new XMLHttpRequest();
       var address = "freegeoip.net/json/";
       xhr.open("GET", address);
       xhr.responseType = 'json';
       xhr.send();
       xhr.onload = function(){
         var userLoc = xhr.response;
         console.log(userLoc);
         return userLoc;
      };
    }
})();