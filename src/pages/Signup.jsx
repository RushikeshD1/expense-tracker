import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db, provider, setDoc } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; 

const Signup = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const signUpWithEmail = async() => {

    if (name.trim() === "" || email.trim() === "" || password.length < 3) {
      toast.error(
        "Please provide all fields or enter password more than 3 length",
      );
      return;
    }

    setLoading(true);

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const user = result.user;
            await createDoc(user);
            navigate("/dashboard")
            toast.success("User created");
            setLoading(false);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
        }
    };

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
                console.log("user", user)
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

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-125 p-4 border border-gray-200 rounded-md flex flex-col gap-4 shadow-md">
        <h2 className="">
          Signup on{" "}
          <span className="text-blue-700 font-semibold">Expenses Tracker</span>
        </h2>
        <div className="w-full">
          <h3>Name</h3>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 outline-none border border-gray-400 rounded-sm"
          />
        </div>
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
          onClick={signUpWithEmail}
          disabled={loading}
          className={`w-full border border-blue-400 p-2 transition-all duration-200 items-center align-middle flex justify-center rounded-sm ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "border border-blue-400 hover:bg-blue-600 hover:text-white cursor-pointer"
          }`}
        >
          {loading ? "Loading..." : "Signup with Email and Password"}
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
          Signup with google
        </button>
        <Link to={"/login"} className="hover:underline hover:text-blue-600">
          Have an account already? click here
        </Link>
      </div>
    </div>
  );
};

export default Signup;