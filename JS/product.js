import {
    getDatabase, ref, get, set, child, update, remove 
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const db= getDatabase();

var productId = document.getElementById("pId");
var productName = document.getElementById("pName");
var category = document.getElementById("category");
var prodWeight = document.getElementById("weight");
var price = document.getElementById("price");
var salePercent = document.getElementById("sale");
var brand = document.getElementById("brand");
var suppId = document.getElementById("supId");
var blockId = document.getElementById("blockId");
var rackNo = document.getElementById("rackNo");
var shelfNo = document.getElementById("shelfNo");

const insertdata= document.getElementById("insertbtn");
const retrivedata= document.getElementById("fetchbtn");
const updatedata= document.getElementById("updatebtn");
const deletedata= document.getElementById("deletebtn");
//-----------------------------Insert Data ----------------------------------------//

function insertData()
{
    set(ref(db, "StoreDatabase/"+productId.value),{
        pId: productId.value,
        pName: productName.value,
        Pcategory: category.value,
        weight: prodWeight.value,
        Pprice: price.value,
        PsalePercent: salePercent.value,
        Pbrand: brand.value,
        supplierId: suppId.value,
        PblockId: blockId.value,
        PrackNo: rackNo.value,
        PshelfNo: shelfNo.value
    })
    .then(()=>{
        alert("Data is stored succesfully!");
    })
    .catch((error)=>{
        alert("Data is not stored! , error"+error);
    });
}

insertdata.addEventListener('click', insertData);

//------------------------------Retrive Data --------------------------------------------------//

function retriveData()
{
    const dbref= ref(db);
    get(child(dbref, "StoreDatabase/"+productId.value)).then((snapshot)=>{
        if(snapshot.exists()){
            productName.value=snapshot.val().pName;
            category.value= snapshot.val().Pcategory;
            prodWeight.value= snapshot.val().weight;
            price.value= snapshot.val().Pprice;
            salePercent.value= snapshot.val().PsalePercent;
            brand.value= snapshot.val().Pbrand;
            suppId.value= snapshot.val().supplierId;
            blockId.value= snapshot.val().PblockId;
            rackNo.value= snapshot.val().PrackNo;
            shelfNo.value= snapshot.val().PshelfNo;

        }
        else{
            alert('No Data Found');
        }
        }).catch((error)=>{
            alert("Data is not found! , error"+error);
        });
}
retrivedata.addEventListener('click', retriveData);
//--------------------------------UPDATE DATA ---------------------------------------------------------//

function updateData()
{
    update(ref(db, "StoreDatabase/"+productId.value),{
        pName: productName.value,
        Pcategory: category.value,
        weight: prodWeight.value,
        Pprice: price.value,
        PsalePercent: salePercent.value,
        Pbrand: brand.value,
        supplierId: suppId.value,
        PblockId: blockId.value,
        PrackNo: rackNo.value,
        PshelfNo: shelfNo.value
    })
    .then(()=>{
        alert("Data updated succesfully!");
    })
    .catch((error)=>{
        alert("Data is not updated! , error"+error);
    });
}
updatedata.addEventListener('click', updateData);

//--------------------------------DELETE DATA ---------------------------------------------------------//

function deleteData()
{
    remove(ref(db, "StoreDatabase/"+productId.value))
    .then(()=>{
        alert("Data deleted succesfully!");
    })
    .catch((error)=>{
        alert("Data is not deleted! , error"+error);
    });
}
deletedata.addEventListener('click', deleteData);