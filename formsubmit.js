window.onload = init;

function init() {
   document.forms[0].onsubmit = function() {
      if (this.checkValidity()) alert("Data passes initial validation tests");
      return false;
   }
   
   document.getElementById("Malaysian").onclick = turnOnMalaysian;  
   document.getElementById("Foreign").onclick=turnOnForeign;  
}

function turnOnMalaysian() {
   document.getElementById("identity").disabled=false; 
   document.getElementById("IC_no").disabled=false;  
   document.getElementById("passport_no").disabled=true; 
}

function turnOnForeign() {
   document.getElementById("identity").disabled=true; 
   document.getElementById("IC_no").disabled=true;
   document.getElementById("passport_no").disabled=false;
}