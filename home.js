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
