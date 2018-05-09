 

/*
DEVELOPER: Emmanuel Alcime   
DESCRIPTION: shopping cart script

*/



 var cartObj = null;

 var cartCI = -1;



shoppingCart = {

  

  _getLocalData: function(_name){

      return localStorage.getItem(_name);

  },
  _setLocalData: function(_name, _value){

      if(_value != null){

         localStorage.setItem(_name, _value);

      }else{

         localStorage.remove(_name);
    }  
  },
  _init: function(){
      cartObj = new Array();
      cartCI = 0;

     // Check in browser memory if there are saved carts   
     if(this._getLocalData('NETSHOPCART_USERCART') !=null){
        cartCI = this._getLocalData('NETSHOPCART_USERCART_CI');
        cartObj = JSON.parse(this._getLocalData("NETSHOPCART_USERCART"));
        console.log(cartObj);
        if(cartObj.length){this._showCart();}

     }  

     else{
         var visualCart =  document.getElementById("cart-count");
         visualCart.style.display="block"; 
         visualCart.innerHTML = 0;
         console.log("\t[CART-v2] Cart is empty! ");

     }  

  },



  _addToCart: function(id,name,qty,size,price,img){  
     var vat = 7.5;     
     if(isNaN(qty)){
        return false;
      }

     qty = parseFloat(qty);
     if(!(qty > 0 )){
        alert("insert positive value ");
        return -1;
     }
    //make new row 
     var newRow = new Object();
     newRow['id'] = id;
     newRow['name'] = name;
     newRow['img'] = img;
     newRow['qty'] = qty;
     newRow['size'] = size;
     newRow['price'] = price;
     newRow['vat'] = parseFloat(vat);
    for(var x in cartObj){  
       for( item in cartObj[x]){
          if(cartObj[x].id === id){
           // show error modal  
           console.log("product already in cart"); 
              var message = document.getElementById("warning");
              message.style.display = "block";
               message.style.border ="thin solid red";
              message.innerHTML = "Item Already in Cart!";
              setTimeout(function(){  message.style.display = "none";}, 3000); 
           return  false;
          }
        }
     }
    if(cartObj[0] == null || cartObj.length  > -1){
              var message = document.getElementById("warning");
              message.style.display = "block";
              message.style.border ="thin solid green";
              message.innerHTML = "Item Added to Cart";
              setTimeout(function(){  message.style.display = "none";}, 3000);
    } 
     cartObj[cartCI++] = newRow;
     this._setLocalData('NETSHOPCART_USERCART', JSON.stringify(cartObj));
     this._setLocalData('NETSHOPCART_USERCART_CI', cartCI);
     if(cartObj.length){this._showCart();}

  },



  _getCartCount: function(){
    var itemInCart = 0;
    for(var xr in cartObj){
        // find index of element in this routine so i didn't used  Of in iteration
        r = cartObj[xr];
       if(r==null) countinue; // remove rows - ignore  it
          itemInCart++;
        }
     return itemInCart;
  },



 _calculateShipping: function(type, qty){
   var shipping = 0;
   var speedPrice;
   
   if (type=="regular") {
      speedPrice = 3.00;
   }
   else if(type=="express"){
      speedPrice = 7.00; 
   }

   if(qty >= 2){
     shipping = 6;
   }

   if(qty >= 3 && qty <= 6){
       shipping = 8;
    }

    if(qty >=7 && qty <= 10){
        shipping = 16;
    }
    if (qty > 10) {
      shipping = 26;
    }
    return shipping + speedPrice;
  },



  _removeItem: function(rowid){
     cartObj.splice(rowid,1); 
     console.log(rowid);
    // update memory
     this._setLocalData("NETSHOPCART_USERCART", JSON.stringify(cartObj));
     this._showCart();
  },

  _updateCart: function(rowIndex, newQty){

      if(isNaN(newQty)){

        return false; 

     }

      newQty = parseFloat(newQty);

      if(!(newQty > 0)){

         console.log("insert positive value ");

         return -1;

     }

     // update cart 

     cartObj[rowIndex]["qty"] = newQty;



    // update memory

     this._setLocalData("NETSHOPCART_USERCART", JSON.stringify(cartObj));

  },

  

  _subTotal: function(){

        var useVat = true;

        var cartValueWOV  = 0.0; // with Out vat

        var cartValueWV   = 7.5; // with VAT %

        var cartValueV    = 7.5; // VAT % Charges

      for(var r of cartObj){

         if(r==null) continue;

            var price  =  parseFloat(r["price"]);

            var vat  =  parseFloat(r['vat']);

            var qty    =  parseFloat(r['qty']);

             /// continue

            var rowWithVat = (price + ((price * vat)) / 100) * qty;

            var rowWithOutVat = price * qty;

            var rowWithAliva = ((price * vat) / 100) * qty; 

            cartValueWOV  = cartValueWOV +  rowWithOutVat;

            cartValueWV   = cartValueWV  +  rowWithVat;

            cartValueV    = cartValueV   +  rowWithAliva;

      }

           var cartValueObj = new Object();

           cartValueObj['noVAT']     = cartValueWOV;

           cartValueObj['withVAT']   = cartValueWV;

           cartValueObj['aliva_VAL'] = cartValueV;

           return cartValueObj;  

   },



  _emptyCart: function(){
      localStorage.clear();
      this._hideCart();
      if(window.location.href.indexOf('cart') !== -1){
         var div = document.getElementById("myCart");
      for(var i =0; i < div.childNodes.length; i++){
           div.removeChild(div.childNodes[i]);
         if(div.childNodes.length > 0){
             div.removeChild(div.childNodes[i]);
             document.getElementById("lastDiv").style.display="none";
          }
        }
          var p = document.createElement("p");
          p.innerHTML="Cart Empty";
          p.setAttribute("class","no-items");
          div.appendChild(p);
         }
          var visualCart =  document.getElementById("cart-count");
          visualCart.style.display="block"; 
          visualCart.innerHTML = 0;
       }, 

  

  _createDecimal: function(num, places){

    var n = num.toFixed( places );

    return n;

  },

 

  _showCart: function(){

    var visualCart =  document.getElementById("cart-count"); 

    if(this._getCartCount() !== null){

       visualCart.style.display="block";

       return visualCart.innerHTML= this._getCartCount();

    }  

  },

  _hideCart: function(){
     var visualCart =  document.getElementById("cart-count"); 
     visualCart.style.display="none";
  }

};













