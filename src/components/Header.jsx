import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';


const Header = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/")
            toast.success("User logout successfully")
        }).catch((error) => {
            toast.error("Error while logout")
        });
    }

  return (
    <div className='py-2 px-8 items-center flex justify-between align-middle bg-blue-400 text-white'>
        <h1>Expenses Tracker</h1>
        <p onClick={handleLogout}>Logout</p>
    </div>
  )
}

export default Header