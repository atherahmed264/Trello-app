import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./constants";
import Snackbar from "@mui/material/Snackbar";


export default function LoginComponent(){
    let [logIn,setIsLogin] = useState(true);
    let [email,setEmail] = useState(localStorage.getItem("email") || "");
    let [password,setPassword] = useState(localStorage.getItem("pass") || "");

    let [semail,setSEmail] = useState("");
    let [name,setName] = useState("");
    let [spassword,setSPassword] = useState("");

    const [showMsg, setShowMsg] = useState(false);
    const [displayMessage, setDisplayMessage] = useState("");

    const navigate = useNavigate();

    function snackbar(message:string){
        setDisplayMessage(message);
        setShowMsg(true);
    }
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowMsg(false);
    }

    async function login(){
        snackbar("Loggin In...");
        axios.post(API_URL+"/api/v1/user/login",{
            "userEmail":email,
            "userPass":password
        }).then(res => {

            if(res.data.token){
                setShowMsg(false);
                sessionStorage.setItem("token",JSON.stringify(res.data.token));
                localStorage.setItem("email",email)
                localStorage.setItem("pass",password)
                sessionStorage.setItem('name',res.data.data.Name);
                sessionStorage.setItem('userId',res.data.data._id)
                navigate('/home');
            }
        });
    }

    async function signUp(){
        snackbar("Signing Up...");
        axios.post(API_URL+"/api/v1/user/signup",{
            "ConfirmPassword": spassword,
            "Country": "India",
            "Email": semail,
            "Mobile": "7397434614",
            "Name": name,
            "Password": spassword,
            "UserName": name
        }).then(res => {
            setShowMsg(false)
            if(res.data.data){
                setEmail(semail);
                setPassword(spassword);
                setIsLogin(true);
            }
        });
    }
    
    return(
    <>
        <div className="min-h-screen min-w-screen flex justify-center bg-gradient-to-b from-violet-200 to-violet-400">
            {logIn ? loginDiv(setIsLogin,login,setEmail,setPassword,email,password) : signupDiv(setIsLogin,signUp,setSEmail,setName,setSPassword,semail,spassword,name)}
        </div>
        <Snackbar
        open={showMsg}
        autoHideDuration={6000}
        onClose={handleClose}
        message={displayMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
    )
}

function loginDiv(fn:stateFunction,login:any,setEmail:any,setPassword:any,email:any,password:any) {

    const handleLogin = () => {
        login()
    }
    function handleEmailInput(ev:any){
        setEmail(ev.target.value)
    }
    function handlePassInput(ev:any){
        setPassword(ev.target.value)
    }
    return (
        <div className=" p-10 m-auto bg-white rounded-md flex justify-center flex-col w-[30vw]">
            <p className="text-center text-2xl font-mono">Welcome to <span className="text-violet-800"> WorkFlo!</span></p>
            <input onInput={handleEmailInput} value={email} className="mt-5 bg-slate-200 rounded-md p-2" placeholder="Enter Your Email" type="text" />
            <input onInput={handlePassInput} value={password} className="mt-5 bg-slate-200 rounded-md p-2" placeholder="Enter Your Password" type="password" />
            <button disabled={!email || !password} onClick={handleLogin} className="mt-5 py-2 bg-violet-800 text-white rounded-md disabled:bg-violet-500 transition-all duration-250">Login</button>
            <p className="text-center mt-3 text-sm text-gray-500">Don't Have an Account? Create a <a onClick={() => fn(false)} className="text-blue-600 cursor-pointer">new account</a> </p>
        </div>
    )
}
function signupDiv(fn:stateFunction,signUp:any,setSEmail:any,setName:any,setSPassword:any,semail:any,spassword:any,name:any) {
    function handleInput(ev:any,f:any){
        f(ev.target.value)
    }
    return (
        <div className="p-10 m-auto bg-white rounded-md flex justify-center flex-col w-[30vw]">
            <p className="text-center text-2xl font-mono">Welcome to <span className="text-violet-800"> WorkFlo!</span></p>
            <input onInput={(e) => handleInput(e,setName)} value={name} className="mt-5 bg-slate-200 rounded-md p-2" placeholder="Enter Your Name" type="text" />
            <input onInput={(e) => handleInput(e,setSEmail)} value={semail} className="mt-5 bg-slate-200 rounded-md p-2" placeholder="Enter Your Email" type="text" />
            <input onInput={(e) => handleInput(e,setSPassword)} value={spassword} className="mt-5 bg-slate-200 rounded-md p-2" placeholder="Enter Your Password" type="password" />
            <button onClick={signUp} className="mt-5 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-800 transition-all duration-250 ">Sign Up</button>
            <p className="text-center mt-3 text-sm text-gray-500">Already have an account? <a onClick={() => fn(true)} className="text-blue-600 cursor-pointer">Log in</a> </p>
        </div>
    )
}
type stateFunction = (arg0: boolean) => void