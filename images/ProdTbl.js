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
        location.replace('home.html');
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

/*--------------------------- Product Management Section---------------------------*/
var dataList=[];
var sNo=0;
var tbody= document.getElementById('tbody1');
function addItemsToTblRow(pId, pName, pCateg, pWeight,pQuantity, pPrice, pSale, pBrand,pSupp, pblock, pRack, pShelf)
{
   
    let row= document.createElement('tr');
    let tc0= document.createElement('td');
    let tc1= document.createElement('td');
    let tc2= document.createElement('td');
    let tc3= document.createElement('td');
    let tc4= document.createElement('td');
    let tc5= document.createElement('td');
    let tc6= document.createElement('td');
    let tc7= document.createElement('td');
    let tc8= document.createElement('td');
    let tc9= document.createElement('td');
    let tc10= document.createElement('td');
    let tc11= document.createElement('td');
    let tc12= document.createElement('td');

    dataList.push([pId,pName,pCateg,pWeight,pQuantity,pPrice,pSale,pBrand,pSupp,pblock,pRack,pShelf]);

    tc0.innerHTML=++sNo;
    tc1.innerHTML=pId;
    tc2.innerHTML=pName;
    tc3.innerHTML=pCateg;
    tc4.innerHTML=pWeight;
    tc5.innerHTML=pQuantity;
    tc6.innerHTML=pPrice;
    tc7.innerHTML=pSale;
    tc8.innerHTML=pBrand;
    tc9.innerHTML=pSupp;
    tc10.innerHTML=pblock;
    tc11.innerHTML=pRack;
    tc12.innerHTML=pShelf;

    tc1.classList+="pid";
    tc2.classList+="pname";
    tc3.classList+="pcategory";
    tc4.classList+="pweight";
    tc5.classList+="pQuantity";
    tc6.classList+="pprice";
    tc7.classList+="psale";
    tc8.classList+="pbrand";
    tc9.classList+="psupp";
    tc10.classList+="pblock";
    tc11.classList+="prack";
    tc12.classList+="pshelf";


    row.appendChild(tc0);
    row.appendChild(tc1);
    row.appendChild(tc2);
    row.appendChild(tc3);
    row.appendChild(tc4);
    row.appendChild(tc5);
    row.appendChild(tc6);
    row.appendChild(tc7);
    row.appendChild(tc8);
    row.appendChild(tc9);
    row.appendChild(tc10);
    row.appendChild(tc11);
    row.appendChild(tc12);
    //We created this div for the buttons of control panel
    var controlDiv=document.createElement('controlBtns');

    controlDiv.innerHTML ='<button id="editRecBtn" type="button" class="btn btn-primary my-2 mx-1" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillData('+sNo+')">Edit Record</button>';
    controlDiv.innerHTML+='<button id="deleteRecBtn" type="button" class="btn btn-primary my-2 mx-1" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillData('+sNo+')">Delete Record</button>';

    controlDiv.style.display="flex";

    row.appendChild(controlDiv);

    tbody.appendChild(row);
}

//------------------- Function to fetch Data in Table---------------------------------------------//

function addAllItems(Alldata){
    sNo=0;
    tbody.innerHTML="";

    Alldata.forEach(element => {
        addItemsToTblRow(element.pId,element.pName,element.Pcategory,element.weight,element.pQuantity,element.Pprice,element.PsalePercent,element.Pbrand,element.supplierId,element.PblockId,element.PrackNo,element.PshelfNo);
    });
}

function getAllDataOnce()      //This function gets data from database in "productsList"
{
    const dbref=ref(db);
    document.getElementById('tbody1').innerHTML='';
    sNo=0;
    get(child(dbref,"StoreDatabase")).then((snapshot)=>{
        var productsList=[];

        snapshot.forEach(childSnapshot=>{
            productsList.push(childSnapshot.val());
        });
        addAllItems(productsList);
    });
}
window.onload=getAllDataOnce();

//--------------------------This section for getting selected data through search type in table------------------------------------------//

var searchBar=document.getElementById("searchBar");
var searchBtn=document.getElementById("searchBtn");
var searchCategory=document.getElementById("selectionCategory");
var tbody=document.getElementById("tbody1");


function searchItems(Category) //This function search data by approximation
{
    var filter= searchBar.value.toUpperCase(); //This is because if admin writes up/low case mix letters in search bar then this should be converted to upper case for check
    var tr= tbody.getElementsByTagName("tr");  //This is getting all rows record in tr variable
    var categFound;
    for (let i = 0; i < tr.length; i++)
    {
        var td=tr[i].getElementsByClassName(Category); // Searching every low element of the specified category
        for (let j = 0; j < td.length; j++) 
        {
            if(td[j].innerHTML.toUpperCase().indexOf(filter)>-1) //Converting cell element to upcase and then comparing with the filter value
            {
                    categFound=true;
            }
        }    
        if(categFound)
        {
            tr[i].style.display="";
            categFound=false;
        }
        else
        {
            tr[i].style.display="none";
        }
    }
}
function searchItemsByExactValue(Category) //This function search data by exact value
{
    var filter= searchBar.value.toUpperCase(); //This is because if admin writes up/low case mix letters in search bar then this should be converted to upper case for check
    var tr= tbody.getElementsByTagName("tr");  //This is getting all rows record in tr variable
    var categFound;
    for (let i = 0; i < tr.length; i++)
    {
        var td=tr[i].getElementsByClassName(Category); // Searching every low element of the specified category
        for (let j = 0; j < td.length; j++) {
            if(td[j].innerHTML.toUpperCase()==filter) //Converting cell element to upcase and then comparing with the filter value
            {
                    categFound=true;
            }
        }    
        if(categFound)
        {
            tr[i].style.display="";
            categFound=false;
        }
        else
        {
            tr[i].style.display="none";
        } 
    }
}
searchBtn.onclick=function()
{
    if(searchBar.value==""){
        searchItemsByExactValue("pid");
    }
    else if(searchCategory.value==1)
    {
        searchItemsByExactValue("pid");
    }
    else if(searchCategory.value==2)
    {
        searchItems("pname");
    }
    else if(searchCategory.value==3)
    {
        searchItems("pcategory");
    }
    else if(searchCategory.value==4)
    {
        searchItemsByExactValue("pblock");
    }
}

var id=document.getElementById('pId');
var name=document.getElementById('pName');
var category=document.getElementById('category');
var weight=document.getElementById('weight');
var quantity=document.getElementById('quantity');
var price=document.getElementById('price');
var sale=document.getElementById('sale');
var brand=document.getElementById('brand');
var spId=document.getElementById('supId');
var block=document.getElementById('blockId');
var rack=document.getElementById('rackNo');
var shelf=document.getElementById('shelfNo');
var addRecBtn=document.getElementById('addRec'); 
var updRecBtn=document.getElementById('updateRec');
var delRecBtn=document.getElementById('deleteRec');

window.FillData=(index)=>       //This function shows data in Product Model section
{
   if(index==null)
   {
        id.value = "";
        name.value = "";
        category.value = "";
        weight.value = "";
        quantity.value="";
        price.value = "";
        sale.value = "";
        brand.value = "";
        spId.value = "";
        block.value = "";
        rack.value = "";
        shelf.value = "";
        addRecBtn.style.display='inline-block';
        updRecBtn.style.display='none';
        delRecBtn.style.display='none';
   }
   else
   {
   
    --index;
        id.value =dataList[index][0];
    
        name.value = dataList[index][1];
        category.value = dataList[index][2];
        weight.value = dataList[index][3];
        quantity.value = dataList[index][4];
        price.value = dataList[index][5];
        sale.value = dataList[index][6];
        brand.value = dataList[index][7];
        spId.value = dataList[index][8];
        block.value = dataList[index][9];
        rack.value = dataList[index][10];
        shelf.value = dataList[index][11];
        addRecBtn.style.display='none';
        updRecBtn.style.display='inline-block';
        delRecBtn.style.display='inline-block';
        
   }
  
}

updRecBtn.onclick=function()
{
    update(ref(db, "StoreDatabase/"+id.value),{
        pName: name.value,
        Pcategory: category.value,
        weight: weight.value,
        pQuantity: Number(quantity.value),
        Pprice: Number(price.value),
        PsalePercent: Number(sale.value),
        Pbrand: brand.value,
        supplierId: spId.value,
        PblockId: Number(block.value),
        PrackNo: Number(rack.value),
        PshelfNo: Number(shelf.value),
    })
    .then(()=>{
        alert("Data updated succesfully!");
        location.reload();
    })
    .catch((error)=>{
        alert("Data is not updated! , error"+error);
    });
}

addRecBtn.onclick=function()
{
    set(ref(db, "StoreDatabase/"+id.value),{
        pId:id.value,
        pName: name.value,
        Pcategory: category.value,
        weight: weight.value,
        pQuantity: Number(quantity.value),
        Pprice: Number(price.value),
        PsalePercent: Number(sale.value),
        Pbrand: brand.value,
        supplierId: spId.value,
        PblockId: Number(block.value),
        PrackNo: Number(rack.value),
        PshelfNo: Number(shelf.value),
    })
    .then(()=>{
        alert("Data is stored succesfully!");
         location.reload();
    })
    .catch((error)=>{
        alert("Data is not stored! , error"+error);
        getAllDataOnce();
        $('#exampleModalCenter').modal('hide');
    });
}

delRecBtn.onclick=function()
{
    remove(ref(db, "StoreDatabase/"+id.value))
    .then(()=>{
        alert("Data deleted succesfully!");
        location.reload();
    })
    .catch((error)=>{
        alert("Data is not deleted! , error"+error);
    });
}

// This function is to dynamically show supplier ids according to brand selected
var brandobject= document.getElementById('brand');
brandobject.onclick=function func()
{
    const dbref= ref(db);
    var s1=document.getElementById('brand');
    var s2=document.getElementById('supId');
    
    get(child(dbref,"BSTbl")).then((snapshot)=>{

        snapshot.forEach(childSnapshot=>{

            if(s1.value == childSnapshot.key )
            {
                var newOption= document.createElement("option");
                newOption.value= childSnapshot.val();
                console.log(newOption.value);
                newOption.innerHTML=childSnapshot.val();
                console.log(newOption);
                $('#supId').empty();
                s2.options.add(newOption);
            }
        });
    });
}


// This function is to dynamically show Rack Numbers according to block Id selected
var blockObject = document.getElementById('blockId');
blockObject.onclick=function func()
{
    const dbref= ref(db);
    var s1=document.getElementById('blockId');
    var s2=document.getElementById('rackNo');
    get(child(dbref,"blockData")).then((snapshot)=>{
        snapshot.forEach(childSnapshot=>{
            if(s1.value==childSnapshot.key){
                 $('#rackNo').empty();
            childSnapshot.forEach(grandChildSnapshot1=>{
                grandChildSnapshot1.forEach(grandChildSnapshot2=>{
                    var newOption= document.createElement("option");
                    newOption.value=grandChildSnapshot2.key;
                    newOption.innerHTML=grandChildSnapshot2.val();
                    s2.options.add(newOption);
                });
            });
        }
            });
    });
}