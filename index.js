import { 
getAuth,
signInWithEmailAndPassword,
sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth=getAuth();
/*-------------------------------State change call when a user Not Logged in-----------------------------*/
auth.onAuthStateChanged((user)=>{
    if(user)
    {
        location.replace('home.html');
    }
});

/*------------------------------------------ Logged in call----------------------------------*/
const loginForm=document.querySelector(".loginForm");


loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=loginForm.email.value;
    const password=loginForm.password.value;

    signInWithEmailAndPassword(auth,email,password)
    .then((cred)=>
    {
        alert("User logged in successfully!:"+ cred.message);
    })
    .catch((err)=>{
        alert("User not logged in!"+ err.message);
    })
});
/*------------------------------------Reset Password-------------------------------------*/
const resetPassword=document.getElementById('resetPassword');
const resetPass=()=>{

    const email=loginForm.email.value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
    alert('Password reset email sent successfully!');
    })
    .catch((error) => {
    alert('Password Reset email Not sent!'+error);
    });
}
resetPassword.addEventListener('click',resetPass);