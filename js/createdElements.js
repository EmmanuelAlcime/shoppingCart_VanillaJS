function showLoader(){
   setInterval(function(){
       document.getElementById("loading-holder").style.display="none";
       document.getElementById("hider").style.display="block";
   },3000);
 
}


 function CreateList(id,im,name,year,price,sales){
              
            if(id === undefined){}else{
               var uL = document.getElementById("itemsList");

              // create elements on json load
              var li = document.createElement("li");

              li.setAttribute("class","items");
              uL.appendChild(li);
              var a = document.createElement("a");
              a.setAttribute("href", "item.html?id="+id);
              a.setAttribute("class","item-link");
              li.appendChild(a);
              var img = document.createElement("img");
              img.setAttribute("src","img/"+im);
              img.setAttribute("class","shoe-img");
              a.appendChild(img);
              var div = document.createElement("div");
              div.setAttribute("class","list-holder");
              a.appendChild(div);
              var h3 = document.createElement("h3");
              h3.setAttribute("class","shoe-title");
              h3.appendChild(document.createTextNode(name));
              div.appendChild(h3);
              var span1 = document.createElement("span");
              span1.setAttribute("class","shoe-year");
              span1.appendChild(document.createTextNode("original release date "+ year));
              div.appendChild(span1);
              var span2 = document.createElement("span");
              span2.setAttribute("class","shoe-price");
              span2.setAttribute("id","shoe-price");
              span2.appendChild(document.createTextNode("Price  $"+price));
              div.appendChild(span2);
              var onSale = document.createElement("div");
              onSale.setAttribute("class","itemTimer");
              var paragraphs = document.createElement("p");
              paragraphs.setAttribute("class","timerHolder");
              onSale.appendChild(paragraphs);
              div.appendChild(onSale);
              
               
             
            }    
          }// end of create Elements
           

