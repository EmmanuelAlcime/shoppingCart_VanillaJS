



// first find items in cart
var _nValue,
   _countries,
   _xhr ,
   _storage = localStorage;
var quantity = document.getElementsByClassName("quantityHolder"); 
var buttons = document.getElementsByClassName("buttonHolder");


function _fillCountryList(){
     var _places = document.getElementById("countrySelect");
     var _countryList = 'countryList.json';
     var _xhr = new XMLHttpRequest();
     _xhr.open("GET",_countryList);
     _xhr.responseType = 'json';
     _xhr.send();
     _xhr.onload = function(){
        if(_xhr.readyState == 4 && _xhr.status == 200){
          var _countries = _xhr.response;
           for(var i = 0; i < _countries.length; i++){
              var _options = document.createElement("option");
              _options.setAttribute("value", _countries[i].name.toString());
              _options.appendChild(document.createTextNode(_countries[i].name));
              _places.appendChild(_options);
           }  
        }
     }
}

function _getStateOrProvince(val){
  console.log(val);
  if(val == "United States"){
        document.getElementById("Territory").style.display =  "none";
        document.getElementById("Department").style.display= "none  ";
       document.getElementById("State").style.display= "block";
       document.getElementById("Zip").style.display= "block";
        _callForST("state");
  }
  else if(val == "Canada"){
      document.getElementById("State").style.display= "none";
      document.getElementById("Department").style.display= "none";
      document.getElementById("Territory").style.display =  "block";
      document.getElementById("Zip").style.display= "block";
       _callForST("territory");
  } 
  else if(val == "Haiti"){
       document.getElementById("Territory").style.display =  "none";
       document.getElementById("State").style.display= "none";
       document.getElementById("Zip").style.display= "none";
       document.getElementById("Department").style.display= "block";
      _callForST("Haiti");  
  }

  else if(val !=="United States" || val !=="Canada"){
       document.getElementById("Territory").style.display =  "none";
       document.getElementById("State").style.display= "none";
       document.getElementById("Zip").style.display= "none";
  }

}

function _callForST(SorT){
  var selectPlace;
  if(SorT === "state"){
    selectPlace = document.getElementById("ST");
  }
  else if(SorT === "territory"){
    selectPlace = document.getElementById("TR");
  }
  else if(SorT === "Haiti"){
    selectPlace = document.getElementById("DP");
  }

  var _fileName = SorT+".json";
  console.log(_fileName);
  var _req = new XMLHttpRequest();
  _req.open("GET",_fileName);
  _req.responseType = "json";
  _req.send();
  _req.onload = function(){
     var sorTResponse = _req.response;
     if (_req.readyState == 4 && _req.status == 200) {
        for(var i = 0; i < sorTResponse.length; i++){
           var placeHolder = document.createElement("option");
           placeHolder.setAttribute("value", sorTResponse[i].name);
           placeHolder.appendChild(document.createTextNode(sorTResponse[i].name));
           selectPlace.appendChild(placeHolder);

        }
     }
  }
}

function _animateLeft(element){
    var _div = document.getElementById("'"+element+"'");
    var pos = 0;
    var id = setInterval(frame, 3000);
    var frame = function(){
      
  };
}



function nextStep(){
   var _step;
   document.getElementById("billing_info") .addEventListener("submit",
     function(e){
        console.log(e);
   });

   document.getElementById("nextStep").innerHTML="Loading...";
   // check form elements fields have all been filled out
   //if(){}
   setInterval(cardInfo(),5000);
   document.getElementById("paymentHolder")
   .style.display="none";

}


function cardInfo(){
  document.getElementById("paymentHolder").style.display="none";
   document.getElementById("cardInformation")
   .style.display="block";
}

function stepToCheckOut(){
  setInterval(checkout(),5000);
  document.getElementById("cardInformation")
   .style.display="none";
}


function checkout(){
   document.getElementById("insideCart")
   .style.display ="block";
}


function _buildCartItems (){
      var mainDiv = document.getElementById("myCart");
      var uL = document.getElementById("shopping");
      var sub = document.getElementById("total");
      var total = shoppingCart._subTotal();
      sub.innerHTML = "<div id ='totalDiv'><p>Total:</p></div><div id='TotalPrice'><p> $"+shoppingCart._createDecimal(total.noVAT,1)+"</p></div>"; 
      var sub = document.getElementById("totalWithVat").innerHTML = "<div><p>With Vat 7.5%</p></div><div id='TotalWithTax'><p> $"+ shoppingCart._createDecimal(total.aliva_VAL,1) +"</p></div>";
      document.getElementById("subTotal").innerHTML =  "<div><p>SubTotal:</p></div><div id='subT'><p> $"+shoppingCart._createDecimal(total.withVAT,1)+"</p></div>";
      var cartItems = cartObj;
      for (var i = 0; i < cartItems.length; i++) {
           var li = document.createElement("li");
           li.setAttribute("class","cartItems");
           var div1 = document.createElement("div");
           div1.setAttribute("id","itemImg");
           div1.setAttribute("class","iImg");
           var div2 = document.createElement("div");
           div2.setAttribute("id","itemINFO");
           div2.setAttribute("class","iINFO");
           li.appendChild(div1);
           li.appendChild(div2);
           var img = document.createElement("img");
           img.setAttribute("src","img/"+ cartItems[i].img);
           img.setAttribute("alt",cartItems[i].img);
           img.setAttribute("class","checkOutImg");
           div1.appendChild(img);
           var spanH3 = document.createElement("span");
           spanH3.setAttribute("class","h1Holder");
           var h3 = document.createElement("h3");
           h3.appendChild(document.createTextNode(cartItems[i].name));
           h3.setAttribute("id","sName");
           spanH3.appendChild(h3);
           div2.appendChild(spanH3);
           var spanQuan = document.createElement("span");
           var minusHolder = document.createElement("div");
           minusHolder.setAttribute("class","input-group-button");
           var minusButton = document.createElement("button");
           minusButton.setAttribute("class","decrease dec");
           var iEl = document.createElement("i");
           iEl.setAttribute("class","fa fa-minus");
           iEl.setAttribute("aria-hidden","true");
           minusButton.appendChild(iEl);
           minusHolder.appendChild(minusButton);
           spanQuan.appendChild(minusHolder);
           var input = document.createElement("input");
           input.setAttribute("value",cartItems[i].qty);
           input.setAttribute("class","quanCount inp");
           spanQuan.appendChild(input);

           var plusHolder = document.createElement("div");
           plusHolder.setAttribute("class","input-group-button");
           var plusButton = document.createElement("button");
           plusButton.setAttribute("class","increase inc");
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
           p.setAttribute("class","Sprices");
           p.appendChild(document.createTextNode("$"+cartItems[i].price));
           spanPrice.appendChild(p);
           var spanButton = document.createElement("span");
           spanButton.setAttribute("class","buttonHolder");
           var button = document.createElement("button");
           var iTag = document.createElement("i");
           iTag.setAttribute("class","fa fa-trash");
           iTag.setAttribute("aria-hidden","true");
           button.setAttribute("class","_i23_remove");
           button.appendChild(iTag);
           button.setAttribute("onclick","shoppingCart._removeItem("+cartItems[i].id+")");
           spanButton.appendChild(button); 
           div2.appendChild(spanButton);
           uL.appendChild(li);   
       }
       init();
   }
    function shipping(val){
      console.log(val);
    }

    function createBindings(quantityContainer,cartitems,buttonContainer){
    var quantityAmount  = quantityContainer.getElementsByClassName("quanCount")[0];
    var increase = quantityContainer.getElementsByClassName("increase")[0];
    var decrease = quantityContainer.getElementsByClassName("decrease")[0];
    var _ul = document.getElementById("shopping");
    var _li = document.getElementsByClassName("cartItems");
    var _removeLi = buttonContainer.getElementsByClassName("_i23_remove")[0];
    var item = cartitems;


     _removeLi.addEventListener('click',function(e){
       var _w;
       _ul.removeChild(_li[0]);
       const total = shoppingCart._subTotal();
       console.log("removed from cart item:  "+ item.name);
       shoppingCart._removeItem(item);
       const SubTotal = document.getElementById("subTotal");   
       const TotalFromCart = document.getElementById('subTotal').innerHTML;
       if(item.qty > 1){
          _w = (item.qty * item.price);
          SubTotal.innerHTML = parseInt(TotalFromCart) - _w;
       }
       else if(item.qty === 1){
          document.getElementById("subT").innerHTML = "<p>"+parseInt(TotalFromCart) - item.price+"</p>";
          return total;
       }

       if(_li.length  < 1){
          //document.getElementById("totalWithVat").innerHTML = ;
          shoppingCart._emptyCart();
          window.location = "index.html";
          return total;
       }
    });

    increase.addEventListener('click', function(e){
         increaseValue(e, quantityAmount, item);
    });

    decrease.addEventListener('click',function(e){
         decreaseValue(e,  quantityAmount, item);
    });
  }

   function init(){
    for (var i = 0; i < quantity.length; i++) {
         createBindings(quantity[i],cartObj[i],buttons[i]);
    }
  }

   function increaseValue(event, quantityAmount, item){ 
    value = parseInt(quantityAmount.value,10);
    value = isNaN(value) ? 0 : value;
    value++;
    item.qty = value;
    console.log(item);
    const total = shoppingCart._subTotal();
    quantityAmount.value = value;
    document.getElementById("TotalPrice").innerHTML ="<p>"+ shoppingCart._createDecimal(total.noVAT,1) + "</p>";
    document.getElementById("TotalWithTax").innerHTML = "<p>" + shoppingCart._createDecimal(total.aliva_VAL,1) + "</p>";
    document.getElementById("subT").innerHTML=  "<p>" + shoppingCart._createDecimal(total.withVAT,1) + "</p>";  
    // update memory
    shoppingCart._setLocalData("NETSHOPCART_USERCART", JSON.stringify(cartObj));
    return total;
  }

   function decreaseValue(event, quantityAmount, item){
    value = parseInt(quantityAmount.value, 10);
    value = isNaN(value) ? 0 : value;
    if(value > 0) value--;
    item.qty = value;
    console.log(item);
    const total = shoppingCart._subTotal();
    quantityAmount.value = value;
    document.getElementById("TotalPrice").innerHTML ="<p>"+ shoppingCart._createDecimal(total.noVAT,1) + "</p>";
    document.getElementById("TotalWithTax").innerHTML = "<p>" + shoppingCart._createDecimal(total.aliva_VAL,1) + "</p>";
    document.getElementById("subT").innerHTML=  "<p>" + shoppingCart._createDecimal(total.withVAT,1) + "</p>";
    // update memory
    shoppingCart._setLocalData("NETSHOPCART_USERCART", JSON.stringify(cartObj));
    return total.noVAT;
  }