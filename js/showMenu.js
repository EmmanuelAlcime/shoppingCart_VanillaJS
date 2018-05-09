;(function(){
  'use strict';
  function findUpTag(el, tag) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tag)
            return el;
    }
    return null;
}
   // get elements
  function handleMouseOut(){setTimeout(()=>{dropDown.style.display ="none";},5000);}
  function handleMouseEnter(){
  	dropDown.style.transition = "all ease-in 0.4s";
    dropDown.style.display ="block";
    if(cartObj.length === 0 ){
      dropDown.style.height = "5em";   
      if(dropDown.childElementCount  === 1 && dropDown.childElementCount <= 1){
      var paragraph = Object.assign(document.createElement("p"),{
      	 className: 'cartPCount',
      	 innerHTML:  cartObj.length +" items"
      }); 
      dropDown.appendChild(paragraph);
    }
   }
   else if(cartObj.length > 0){
   	  dropDown.style.height = "auto"; 
   	  var menuItemsTotal = shoppingCart._subTotal();
   	  if(dropDown.childElementCount === 1){
         var uList = Object.assign(document.createElement("ul"),
         {id: 'menuOderList'});
         for(var i = 0 ; i < cartObj.length; i++){
         	 uList.innerHTML += "<li>"+"<div class='menuItemsListH'><div class='imgMenuItems'><div class='menuItemImage'>"+"<img src='img/"+cartObj[i].img+"'>"+"</div></div>"+"<div class='menuItemsInfor'><div class='menuItemName'>"+cartObj[i].name+"</div>"+"<div class='menuItemPrice'>"+cartObj[i].qty+"x"+cartObj[i].price+"</div>"+"<div class='menuItemsremoveButton'><button class='menuItemsBtn'>remove</button></div></div></div></li>";
         }
         var totalPrice = Object.assign(document.createElement("div"),{
         	 id:"menuItemsTotal",
         	 innerHTML: "<div class='oimenu'><div class='menuItemsTotalDiv'>Total:</div><div class='menuItemsTotalDivPrice' id='SubTotal'>$"+parseFloat(menuItemsTotal.noVAT)+"</div></div><div class='menuItemsViewCart'><button>View Cart</button></div><div class='menuItemsCheckOut'><button>Check Out</button></div>"
         });
         console.log(menuItemsTotal.noVAT);
         uList.appendChild(totalPrice);
         dropDown.appendChild(uList);
         var getButtons = new removeItemsLi();
  	     getButtons._init();
   	  }
    }
  }
  var dropDown = document.getElementById("CartMenu");
  var tri = document.getElementById("triangle");
  var link = document.getElementById("cartLink");
  dropDown.addEventListener("mouseover", handleMouseEnter, true);
  tri.addEventListener("mouseover", handleMouseEnter, false);
  setTimeout((e)=>{ dropDown.addEventListener("mouseover", handleMouseOut, true);},100);
  link.addEventListener("mouseover", handleMouseEnter, true);
  //link.addEventListener("mouseout", handleMouseOut, true);

  function removeItemsLi(){
  	      var btnContainers = document.getElementsByClassName("menuItemsremoveButton");
  	      var _uL = document.getElementById("menuOderList");
  	      var btn = this;
  	      btn._bindItems = function(btnContainers){
  	   	  var buttons = btnContainers.getElementsByClassName('menuItemsBtn')[0];
  	   	  var item = cartObj;
  	   	  buttons.addEventListener('click',(e)=>{         
             var li = findUpTag(e.target, "LI");
             var addSelected = li.classList.add("selected");
             if(li) _uL.removeChild(li);
                shoppingCart._removeItem(item);
                const SubTotal = document.getElementById("SubTotal");   
                const TotalFromCart = document.getElementById('SubTotal').innerHTML;
             if(item.qty > 1){
                _w = (item.qty * item.price);
                var prie = parseFloat(TotalFromCart) - _w;
                SubTotal.innerHTML = shoppingCart._createDecimal(prie,2);
             }
             else if(item.qty === 1){
                var prie = parseFloat(TotalFromCart) - item.price;
                SubTotal.innerHTML = shoppingCart._createDecimal(prie,2);
             }
             if(_uL.childNodes.length > 0 && cartObj.length === 0){
             	  _uL.innerHTML = "";
             	     var paragraph = Object.assign(document.createElement("p"),{
      	             className: 'cartPCount',
      	             innerHTML:  cartObj.length +" items"
                   }); 
                  _uL.appendChild(paragraph);
             	  console.log(_uL.childElementCount);
                  shoppingCart._emptyCart();

              }

  	   	   });
  	     };
  	   btn._init = function(){
  	   	  for(var i = 0; i < btnContainers.length; i++){
  	   	  	this._bindItems(btnContainers[i]); // wait 4 seconds
  	   	  }
  	   };
  }
})();