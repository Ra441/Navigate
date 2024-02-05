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
//-------------------------------Customer Management Section---------------------------------------------------*/
var dataList=[];
var idList=[];
var cNo=0;
var tbody= document.getElementById('tbody1');
function addItemsToTblRow(Email, Phonenumber)
{
   
    let row= document.createElement('tr');
    let tc0= document.createElement('td');
    let tc1= document.createElement('td');
    let tc2= document.createElement('td');

    dataList.push([Email,Phonenumber]);

    tc0.innerHTML=++cNo;
    tc1.innerHTML=Email;
    tc2.innerHTML=Phonenumber;
  
    tc1.classList+="email";
    tc2.classList+="phoneNo";

    tc1.id= "emailid";
    tc2.id="phonenumber"
    row.setAttribute("id",cNo+1);
    row.appendChild(tc0);
    row.appendChild(tc1);
    row.appendChild(tc2);

    //We created this div for the buttons of control panel
    var controlDiv=document.createElement('controlBtns');

    controlDiv.innerHTML ='<button id="deleteRecBtn" type="button" class="btn btn-primary my-2 mx-1" onclick="FillData('+cNo+')">Delete Account</button>';
    // controlDiv.innerHTML +='<button id="blockIdBtn" type="button" class="btn btn-primary my-2 mx-1" onclick="FillData('+cNo+')">Block</button>';
    // controlDiv.innerHTML +='<button id="unBlockIdBtn" type="button" class="btn btn-primary my-2 mx-1" onclick="FillData('+cNo+')">UnBlock</button>';
    

    controlDiv.style.display="flex";

    row.appendChild(controlDiv);

    tbody.appendChild(row);
}
function addAllItems(Alldata){

    tbody.innerHTML="";

    Alldata.forEach(element => {
        addItemsToTblRow(element.Email,element.Phonenumber);
    });
}
var i=0;
function getAllDataOnce()
{
    const dbref=ref(db);
    document.getElementById('tbody1').innerHTML='';
    cNo=0;
  
    get(child(dbref,"customerInfo")).then((snapshot)=>{
        var customerList=[];
       
        snapshot.forEach(childSnapshot=>{
            idList.push(childSnapshot.key);
            customerList.push(childSnapshot.val());
        });

       addAllItems(customerList);

    });
}
window.onload=getAllDataOnce();


window.FillData=(index)=>
{
   --index;
    remove(ref(db, "customerInfo/"+idList[index]))
        .then(()=>{
            alert("Data deleted succesfully!");
            location.reload();
        })
        .catch((error)=>{
            alert("Data is not deleted! , error"+error);
        });
 
}
