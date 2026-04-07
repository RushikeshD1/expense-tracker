import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db, provider, setDoc  } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; 


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const navigate = useNavigate();

  const signinWithEmail = () => {
    if (email.trim() === "" || password.length < 3) {
      toast.error(
        "Please provide all fields or enter password more than 3 length",
      );
      return;
    }
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        toast.success("User logged in!")
        setLoading(false);
        setIsUserLogged(true)
        navigate("/dashboard")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false);
        setIsUserLogged(false);
      });
  };

  const googleAuth = () => {
        setLoading(true)
        try {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                createDoc(user)
                toast.success("User authenticated")
                navigate("/dashboard")
                setLoading(false)
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(false)
            })
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
        
    }

    const createDoc = async (user) => {

        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if(!userData.exists()){
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name : user.displayName ? user.displayName : name,
                    email : user.email,
                    photoUrl : user.photoURL ? user.photoURL : "",
                    createdAt: new Date()
                });
                
            } catch (error) {
                console.log("Hello bro!")
                toast.error(error.message)
            }   
        }     
    }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-125 p-4 border border-gray-200 rounded-md flex flex-col gap-4 shadow-md">
        <h2 className="">
          Login on{" "}
          <span className="text-blue-700 font-semibold">Expenses Tracker</span>
        </h2>
        <div className="w-full">
          <h3>Email</h3>
          <input
            type="text"
            placeholder="abc@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 outline-none border border-gray-400 rounded-sm"
          />
        </div>
        <div className="w-full">
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Pass@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 outline-none border border-gray-400 rounded-sm"
          />
        </div>
        <button
          onClick={signinWithEmail}
          className={`w-full border border-blue-400 p-2 transition-all duration-200 items-center align-middle flex justify-center rounded-sm ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "border border-blue-400 hover:bg-blue-600 hover:text-white cursor-pointer"
          }`}
        >
          {loading ? "Loading..." : "Login with Email and Password"}
        </button>

        <div className="w-full flex flex-row gap-4 justify-center items-center">
          <div className="w-[46%] h-0 border-2 border-gray-800"></div>
          <h3>OR</h3>
          <div className="w-[46%] h-0 border-2 border-gray-800"></div>
        </div>

        <button
        onClick={googleAuth}
          disabled={loading}
          className={`w-full border border-blue-400 p-2 transition-all duration-200 items-center align-middle flex justify-center rounded-sm ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "border border-blue-400 hover:bg-blue-600 hover:text-white cursor-pointer"
          }`}
        >
          Login with google
        </button>
        <Link to={"/"} className="hover:underline hover:text-blue-600">
          Account not created? click here
        </Link>
      </div>
    </div>
  );
};

export default Login;