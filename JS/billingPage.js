import {
    getDatabase, set,ref, get, child, update, remove 
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const db= getDatabase();

//We have to import auth from firebase to verify if user is signed in AND access product page or not
import { 
    signOut, getAuth
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
    
const auth=getAuth();
    
/*-------------------------------State change call when a user Not Logged in----------------------------------*/
auth.onAuthStateChanged((user)=>{
    if(!user)
    {
        location.replace('index.html');
    }
    else{
        //..
    }
});
/*-------------------------------Logged Out Call----------------------------------*/
const logout=document.querySelector('#logoutBtn');
logout.addEventListener('click',(e)=>
{
    e.preventDefault();
    signOut(auth)
    .then(()=>{
        console.log('User Logged Out');
    });
});

/*-------------------------------Billing Manangement--------------------------------*/
var productsList=[];
var sNo=0;
var prodIdsList=[];
var table= document.getElementById('tbody1');
function getAllDataOnce()
{
    const dbref=ref(db);
    get(child(dbref,"StoreDatabase")).then((snapshot)=>{
       productsList=[];
        snapshot.forEach(childSnapshot=>{
           prodIdsList.push(childSnapshot.key);
           productsList.push(childSnapshot.val());
        });
    });
}
window.onload=getAllDataOnce();


var appendList=document.getElementById('appendList');
var decreaseQuantity=document.getElementById('createBill');

appendList.onclick=function(){
   
    var rowCount = table.rows.length;
    var cellCount = 3;
    var row = table.insertRow(rowCount);
    let i=0;
    for( ; i < cellCount; i++){
      var cell = row.insertCell(i);

      if(i == 0){
        cell.innerHTML='<input id="productId" class="productId" type="text" onchange="searchId('+sNo+')" required/>';
       
      }
      else if(i == 1)
      {
        cell.innerHTML +='<input id="productQuantity" class="prodQuantity" type="number" onchange="checkQuantity('+sNo+')" required/>';
       
      }
      else if(i==2){
        cell.innerHTML = '<input type="button" value="delete" onclick="deleteRow(this)" />';
      }
   
    }
    sNo+=1;
}

// These function are invoked after getting ID and Quantity of products to check whether Id exists or not PLUS a valid quantity
window.searchId=(sNo)=>
{
    if(prodIdsList.indexOf((table.rows[sNo].cells[0].firstChild.value).toUpperCase())<0)
    {
        table.rows[sNo].cells[0].firstChild.value="";
        alert("Invalid Product Id! Please Enter a Valid Id!");
    }
}
window.checkQuantity=(sNo)=>
{
    if( table.rows[sNo].cells[1].firstChild.value <= 0)
    {
        table.rows[sNo].cells[1].firstChild.value="";
        alert("Invalid Product Quantity! Please Enter a Valid Quantity!");
    }
}

window.deleteRow=(element)=>{

    var rowCount = table.rows.length;
    if(rowCount < 1){
      alert("There is no row available to delete!");
      return;
    }
    if(element){
      //delete specific row
      element.parentNode.parentNode.remove();
    }
    else{
      //delete last row
      table.deleteRow(rowCount-1);
    }
}
var customerListofProducts=[]; //for the list of products that were bought by the customer
decreaseQuantity.onclick=function()     //This function calculates bill for the items entered and apply sale price if applicable
{

    var rowCount = table.rows.length;
    var cellCount = 2;
    for(let i=0; i<rowCount; i++)
    {
       var prodInfo=[];
        for(let j=0; j<cellCount; j++)
        {
         prodInfo.push((table.rows[i].cells[j].firstChild.value).toUpperCase());
        }

        for(let i=0; i<productsList.length; i++)
        {
            if(productsList[i].pId==prodInfo[0])
            {
                productsList[i].pQuantity-=prodInfo[1];
                customerListofProducts.push(productsList[i]); 
    
                update(ref(db, "StoreDatabase/"+prodInfo[0]),{
                    pQuantity: Number(productsList[i].pQuantity),
                
                })
                .catch((error)=>{
                    alert("Quantity is not updated! , error"+error);
                });
            }
        }
    }
    var total=0;
    var tableInfo=[];
    for(let i=0; i<table.rows.length; i++)
    {
        for(let j=0; j<2; j++)
        {
            tableInfo.push(table.rows[i].cells[j].firstChild.value);
        }
       
        if(customerListofProducts[i].PsalePercent>0)
        {
            var originalPrice=customerListofProducts[i].Pprice;
            var salePercent=customerListofProducts[i].PsalePercent;
            var deducePrice=originalPrice*(salePercent/100);
            var newPrice=originalPrice-deducePrice;
        }
        newPrice=newPrice*tableInfo[1];
        total+=newPrice;
    }

    document.getElementById('totalBill').innerHTML=total;
    setTimeout(function(){
        window.location.reload();
     }, 10000);
}

