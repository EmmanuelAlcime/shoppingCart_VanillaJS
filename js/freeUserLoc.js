
var freeIpGEO = {};
freeIpGEO.getGEO = function(){
       var xhr = new XMLHttpRequest();
       var address = "https://freegeoip.net/json/";
       xhr.open("GET", address);
       xhr.responseType = 'json';
       xhr.send();
       xhr.onload = function(){
         if(xhr.readyState == 3){
             document.getElementById("pla").innerHTML = "Loading....";
         }
        else if(xhr.readyState == 4 && xhr.status == 200){
           var userLoc = xhr.response;
           renderCountry(userLoc);
        }
      };
}
var thisDiv = document.getElementById("pla");
var renderCountry = function(rest){
       thisDiv.appendChild(Object.assign(document.createElement("div"),{
          id: "countryHolder",
          width: "100%",
          height: "3em",
          innerHTML: "<img src='img/"+rest.country_code+".png'><p>  yes we ship to "+rest.country_name+"</p>"
     }));
};
freeIpGEO.getGEO();
