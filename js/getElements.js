 
 
  function requestProducts(){ 
    var request = new XMLHttpRequest();
    var requestURL = "shoeInvetory.json";
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function(){
        if(request.readyState == 4 && request.status == 200){
         var shoeInfo = request.response;
         for( shoes in shoeInfo){
            for( shoeList in shoeInfo[shoes]){
               CreateList(shoeInfo[shoes][shoeList].id,shoeInfo[shoes][shoeList].img, shoeInfo[shoes][shoeList].name, shoeInfo[shoes][shoeList].year ,shoeInfo[shoes][shoeList].price,shoeInfo[shoes][shoeList].sales);    
               
            }
             // salesTimer(shoeInfo[shoes][shoeList].id ,shoeInfo[shoes][shoeList].sales, shoeInfo[shoes][shoeList].price);
          }    
        }else if(request.readystate == 0){
           document.getElementById("itemsList").innerHTML= "<li>Loading....</li>";
        }
     };
   }

 
 
  
  