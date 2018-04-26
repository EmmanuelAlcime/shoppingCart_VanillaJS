function showLoader(){
   setInterval(function(){
       document.getElementById("loading-holder").style.display="none";
       document.getElementById("hider").style.display="block";
   },3000); 
 }

/*
  function thanks to stackoverlow
  uri: https://stackoverflow.com/questions/7332179/how-to-recursively-search-all-parentnodes
*/
function findUpTag(el, tag) {
    while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName === tag)
            return el;
    }
    return null;
}

var value, quantity = document.getElementsByClassName("quantityHolder");
var buttons = document.getElementsByClassName("buttonHolder");
var cart = {
    _buildCartItems: function(){


      var mainDiv = document.getElementById("myCart");
      var uL = document.createElement("ul");
      uL.setAttribute("id","cartItemsHolder");
      uL.setAttribute("class","cartItemsHolder");
       mainDiv.appendChild(uL);
       var bottomDiv = document.createElement("div");
       bottomDiv.setAttribute("id","totalHolder");
       mainDiv.appendChild(bottomDiv);

       var lastDiv = document.createElement("div");
       lastDiv.setAttribute("id","lastDiv");
       var emptyButton = document.createElement("button");
       emptyButton.setAttribute("onclick","shoppingCart._emptyCart();");
       emptyButton.appendChild(document.createTextNode("Empty Cart"));
       lastDiv.appendChild(emptyButton);
       mainDiv.appendChild(lastDiv);
       var checkOutButton = document.createElement("button");
       checkOutButton.setAttribute("onclick","cart.checkOut();");
       checkOutButton.appendChild(document.createTextNode("Check Out"));
      lastDiv.appendChild(checkOutButton);
       var firstSpan = document.createElement("span");
       var Pgraph = document.createElement("p");
       Pgraph.appendChild(document.createTextNode("Total:"));
       firstSpan.appendChild(Pgraph);
       bottomDiv.appendChild(firstSpan);
       var secondSpan = document.createElement("span");
       secondSpan.setAttribute("id","SubTotal");
       var SubTotal = shoppingCart._subTotal();
       secondSpan.appendChild(document.createTextNode(shoppingCart._createDecimal(SubTotal.noVAT,2)));
       bottomDiv.appendChild(secondSpan);
       if(cartObj.length === 0){
           mainDiv.innerHTML ="<p class='no-items'>No Items in Cart <b>"+ cartObj.length +"</b><p>"; 
       }else{

      var cartItems = cartObj;
      for (var i = 0; i < cartItems.length; i++) {
           var li = document.createElement("li");
           li.setAttribute("class","cartItems");
           var div1 = document.createElement("div");
           div1.setAttribute("id","itemImg");
           var div2 = document.createElement("div");
           div2.setAttribute("id","itemINFO");
           li.appendChild(div1);
           li.appendChild(div2);
           var img = document.createElement("img");
           img.setAttribute("src","img/"+ cartItems[i].img);
           img.setAttribute("alt",cartItems[i].img);
           img.setAttribute("class","cartImg");
           div1.appendChild(img);
           var spanH3 = document.createElement("span");
           spanH3.setAttribute("class","h1Holder");
           var h3 = document.createElement("h3");
           h3.appendChild(document.createTextNode(cartItems[i].name));
           spanH3.appendChild(h3);
           div2.appendChild(spanH3);
           var _sizeHolder = document.createElement("span");
           _sizeHolder.setAttribute("class","_sizeHolder");
          var _sizeText = document.createElement("p");
          _sizeText.appendChild(document.createTextNode("size: "+cartItems[i].size));
          _sizeHolder.appendChild(_sizeText);
          div1.appendChild(_sizeHolder);

           var spanQuan = document.createElement("span");
           var minusHolder = document.createElement("div");
           minusHolder.setAttribute("class","input-group-button");
           var minusButton = document.createElement("button");
            minusButton.setAttribute("class","decrease");
           var iEl = document.createElement("i");
           iEl.setAttribute("class","fa fa-minus");
           iEl.setAttribute("aria-hidden","true");
           minusButton.appendChild(iEl);
           minusHolder.appendChild(minusButton);
           spanQuan.appendChild(minusHolder);
           var input = document.createElement("input");
           input.setAttribute("value",cartItems[i].qty);
           input.setAttribute("class","quanCount");
           spanQuan.appendChild(input);

           var plusHolder = document.createElement("div");
           plusHolder.setAttribute("class","input-group-button");
           var plusButton = document.createElement("button");
           plusButton.setAttribute("class","increase");
           var pEl = document.createElement("i");
           pEl.setAttribute("class","fa fa-plus");
           pEl.setAttribute("aria-hidden","true");

           plusButton.appendChild(pEl);
           plusHolder.appendChild(plusButton);
           spanQuan.appendChild(plusHolder);
           spanQuan.setAttribute("class","quantityHolder");
           div2.appendChild(spanQuan);
           var spanPrice = document.createElement("span");
           spanPrice.setAttribute("class","spanPrice");
           div2.appendChild(spanPrice);
           var p = document.createElement("p");
           p.appendChild(document.createTextNode("$"+cartItems[i].price));
           spanPrice.appendChild(p);
           var spanButton = document.createElement("span");
           spanButton.setAttribute("class","buttonHolder");
           var button = document.createElement("button");
           var _iGlyph = document.createElement("i");
           _iGlyph.setAttribute("class","fa fa-trash");
           _iGlyph.setAttribute("aria-hidden","true");
           button.appendChild(_iGlyph);
           button.setAttribute("class","removeButtons");
           button.setAttribute("id","rem");
           spanButton.appendChild(button); 
           div2.appendChild(spanButton);
           uL.appendChild(li);   
       }
     }
     this.init();
   },
  createBindings: function(quantityContainer ,cartItem,buttonContainer){
    var quantityAmount  = quantityContainer.getElementsByClassName("quanCount")[0];
    var increase = quantityContainer.getElementsByClassName("increase")[0];
    var decrease = quantityContainer.getElementsByClassName("decrease")[0];
    var _removeLi = buttonContainer.getElementsByClassName("removeButtons")[0];
    var _ul = document.getElementById("cartItemsHolder");
    var item = cartItem;

    _removeLi.addEventListener('click',function(e){
       var _w; 
       var li = findUpTag(e.target, "LI");
       var addSelected = li.classList.add("selected");
       if(li) _ul.removeChild(li);
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


       if(_ul.childNodes.length === 0){
          shoppingCart._emptyCart();
       }
        console.log("removed from cart item:  "+ item.name);
      
    });

    increase.addEventListener('click', function(e){
       cart.increaseValue(e, quantityAmount, item);
    });

    decrease.addEventListener('click',function(e){
      cart.decreaseValue(e, quantityAmount, item);
    });
  },
  init: function(){
    for (var i = 0; i < quantity.length; i++) {
      this.createBindings(quantity[i],cartObj[i],buttons[i]);
    }
  },
  increaseValue: function(event, quantityAmount,item){
    const SubTotal = document.getElementById("SubTotal");
    const TotalFromCart = document.getElementById('SubTotal').innerHTML;
    value = parseInt(quantityAmount.value,10);
    value = isNaN(value) ? 0 : value;
    value++;
    item.qty = value;
    console.log(item);
    quantityAmount.value = value;
    SubTotal.innerHTML = parseInt(TotalFromCart) + parseInt(item.price);
    // update memory
    shoppingCart._setLocalData("NETSHOPCART_USERCART", JSON.stringify(cartObj));
  },
  decreaseValue: function(event, quantityAmount,item){
    const SubTotal = document.getElementById("SubTotal");
    const TotalFromCart = document.getElementById('SubTotal').innerHTML;
    Total = parseInt(TotalFromCart);
    value = parseInt(quantityAmount.value, 10);
    value = isNaN(value) ? 0 : value;
    if(value <= 1){ 
       value = 1;
    }else if(value > 1){
      value--;
      quantityAmount.value = value;
      item.qty = value;
      SubTotal.innerHTML= (parseInt(Total) - parseInt(item.price));
    }
    
    // update memory
     shoppingCart._setLocalData("NETSHOPCART_USERCART", JSON.stringify(cartObj));
  },

  checkOut: function(){
     window.location ="checkOut.html";
  }
};


