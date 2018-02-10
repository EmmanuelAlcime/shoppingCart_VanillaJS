
 
/*
  Emmanuel Alcime      
  emmanuelalcime54@gmail.com    
  multiple countDown timers in javascript         
*/
 
  function productHandler(){ 
    var request = new XMLHttpRequest();
    var requestURL = "shoeInvetory.json";
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        if(request.readyState == 4 && request.status == 200){
             const availList = request.response;
             availList.products.forEach(function(_key){
                salesTimer( _key.sales, _key.price);
           });
        }
     };
   }

 
function salesTimer(_date,price){
  
    var holder = document.getElementsByClassName("itemTimer"); 
         // set date were counting down to
    var countDownDate = new Date(_date).getTime();
         // update time every second 
    var x =  setInterval(function(){ 
    var now = new Date().getTime();  
       // Find the distance between dates
    var distance = countDownDate - now;

    var days =    Math.floor( distance /(1000 * 60 * 60 * 24));
    var hours =   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) /(1000 *60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000); 
     
    var _createBinding = function(paragraphsContainer){
    var _p = paragraphsContainer.getElementsByClassName("timerHolder")[0];
    _p.innerHTML = (" starts   in " + days + " days " + hours + ":" + minutes + ":" + seconds); 
    };

    var _init = function(){
         for(var i = 0; i < holder.length; i++ ){
            _createBinding(holder[i]);
        }
    };

    _init();
    if(distance < 0 || distance === undefined ){
        document.getElementById("shoe-price").style.textDecoration="overline";
        clearInterval(x);
        var salesPrice = parseInt(price) * (1 - .2);
        var _pN = document.getElementsByClassName("itemTimer");
        _pN.append(document.createTextNode(parseFloat(salesPrice)));   
    }                                    
  },2000);
}
  




