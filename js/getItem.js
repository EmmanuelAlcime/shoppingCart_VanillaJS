function showLoader(){
   setInterval(function(){
       document.getElementById("loading-holder").style.display="none";
       document.getElementById("hider").style.display="block";
   },3000); 
 }
 var getId = function(){
      var url = window.location.search;
      url = url.replace("?",'');
      var idNumber = url.split("=");
      var id = idNumber[1];
      if(id == null || id == undefined || id == 0 || id>4){
            window.location.href = "index.html";
       }else{
      showLoader();
      return parseInt(id)? id:null;
     }
  };
function getSrc(src){
  var shoePic = document.getElementById("hero-shoe");
  shoePic.src = src;
}

var number = getId();  
var findItem = function(number){
        var jsonFile = "shoeInvetory.json";
        var xhr = new XMLHttpRequest();  
        xhr.open("GET", jsonFile);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
             var items = xhr.response;
              for(var item in items){
                 for( var oneItem in items[item]){
                     if(items[item][oneItem].id.indexOf(number) !==-1){
                       createHolder(items[item][oneItem].img,
                                    items[item][oneItem].name,
                                    items[item][oneItem].price, 
                                    items[item][oneItem].sizes,
                                    items[item][oneItem].views,
                                    items[item][oneItem].colors,
                                    items[item][oneItem].id,
                                    items[item][oneItem].sales);                     

                }

              }

            }

       }else if(xhr.readyState == 3){

          document.getElementById("myItem").innerHTML="<b>Loading....</b>";

       }

     }     

  };
function getCurrentPrice(price){
  var quantityCount = document.getElementById("quantityCount");
  var currentValue = document.getElementById("shoePrice").value;
  var priceWrapper = document.getElementById("the-price");
  var newVal = currentValue * price;
  quantityCount.innerHTML = "x"+ currentValue;
  if(currentValue == 10){
     document.getElementById("warning").style.display="block";
  }else if(currentValue < 10){
    document.getElementById("warning").style.display="none"; 

  }
  return priceWrapper.innerHTML = "$ " +parseInt(newVal)+".00";
};



  var createHolder = function(sImg, name, price, sizes,views,colors,id){        
       var head = document.getElementsByTagName("head")[0];
       var meta = document.createElement("meta");
       meta.setAttribute("name","description");
       meta.setAttribute("content","online shoppingCart example this is not a real site.");
       head.appendChild(meta);
       var div = document.getElementById("myItem");
       var holderDIV = document.createElement("div"); 
       holderDIV.setAttribute("class","image-holder");
       div.appendChild(holderDIV);
       var shoe_img = document.createElement("img");
       shoe_img.setAttribute("src","img/"+ sImg);
       shoe_img.setAttribute("alt", sImg);
       shoe_img.setAttribute("id", "hero-shoe");
       holderDIV.appendChild(shoe_img);
       var bottomDiv = document.createElement("div");
       bottomDiv.setAttribute("class","bottom-div");
       holderDIV.appendChild(bottomDiv);
       for(view in views){  
              if(views.hasOwnProperty(id)){
                 var im2Color = document.createElement("img");
                 im2Color.setAttribute("src","img/"+ views[view].img);
                 im2Color.setAttribute("onclick","getSrc(this.src)");
                 im2Color.setAttribute("onmouseover","getSrc(this.src)");
                 im2Color.setAttribute("class","shoe-views");
                 bottomDiv.appendChild(im2Color);
                 console.log(views[view].img);

           }
         }
       /// second div holder
       var div2 = document.createElement("div");
       div2.setAttribute("class","info-holder");
       div.appendChild(div2);
       var h1 = document.createElement("h1");
       h1.setAttribute("class","item-title");
       h1.appendChild(document.createTextNode(name));
       document.title = "Sneakers | "+ name;
       div2.appendChild(h1);
       var span1 = document.createElement("span");
       span1.setAttribute("class","item-price-holder");
       div2.appendChild(span1);   
       var priceHolder = document.createElement("p");
       priceHolder.appendChild(document.createTextNode("price"));
       span1.appendChild(priceHolder);
       var timesPrice = document.createElement("p");
       timesPrice.setAttribute("id","quantityCount");
       timesPrice.appendChild(document.createTextNode("x1"));
       span1.appendChild(timesPrice);
       var Price = document.createElement("b");
       Price.setAttribute("id","the-price");
       Price.appendChild(document.createTextNode("$"+price));
       span1.appendChild(Price);
       var shipC = Object.assign(document.createElement("span"),{
         id:'shippingFree',
         innerHTML:'Free Shipping'
       });  
       div2.appendChild(shipC);
       var span2 = document.createElement("span");
       span2.setAttribute("class","size-holder");
       var description = document.createElement("p");
       description.setAttribute("class","description");
       description.appendChild(document.createTextNode("Size"));
       span2.appendChild(description);
       div2.appendChild(span2);
       var selectSize = document.createElement("select");
       selectSize.setAttribute("name","size");
        selectSize.setAttribute("class", "selec");
        selectSize.setAttribute("id", "selec");
       span2.appendChild(selectSize);
       var span3 = document.createElement("span");
       span3.setAttribute("class","quantity-holder");
       div2.appendChild(span3);   
       var description2 = document.createElement("p");
       description2.appendChild(document.createTextNode("Quantity"));
       description2.setAttribute("class","description2");
       span3.appendChild(description2);
       var quantities = document.createElement("select");
       quantities.setAttribute("onchange", "getCurrentPrice("+price+")");
       quantities.setAttribute("class", "selec");
       quantities.setAttribute("id", "shoePrice");
       span3.appendChild(quantities);
       var val= 10;
       while(0 < val){
         var quantityOption =  document.createElement("option");
         quantityOption.setAttribute("value", val);
         if(val === 1){
            quantityOption.setAttribute("selected", "selected");
         }
         quantityOption.appendChild(document.createTextNode(val));
         quantities.appendChild(quantityOption);
         val--;
      }
      for(size in sizes){
          var sizeOption = document.createElement("option");
          sizeOption.appendChild(document.createTextNode(sizes[size].size));
          sizeOption.setAttribute("value", sizes[size].size);
          selectSize.appendChild(sizeOption);

       } 
      var button = document.createElement("button");
      var Qty = document.getElementById("shoePrice");
      var Size = document.getElementById("selec");
      button.setAttribute("class","btn");
      button.setAttribute("id","btn");
      button.appendChild(document.createTextNode("Add To Cart"));
      div2.appendChild(button);     

      document.getElementById("btn").addEventListener('click',function(){
          shoppingCart._addToCart(id,
                                  name,Qty.options[Qty.selectedIndex].value,
                                  Size.options[Size.selectedIndex].value,
                                  price,
                                  sImg);
      });
      var para = document.createElement("p");
      para.setAttribute("id","warning");
      para.appendChild(document.createTextNode("max purchase per customer are (10) ten of pair of sneakers."));
      div2.appendChild(para);      

  };
