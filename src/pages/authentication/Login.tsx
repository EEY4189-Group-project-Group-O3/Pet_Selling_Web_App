import React, { useState } from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

import catsDogs from "../../assets/Rectangle 3.png"
import dogImg from "../../assets/Ellipse 1.png"

import "./test.css"
const Login = () => {

    return (
        <div className="w-full h-screen overflow-hidden relative" style={{ background: "#FFDF9E" }}>
            <section className='mt-[300px] ml-[100px]'>
                <h1 className='font-bold text-6xl uppercase'>Your Pet</h1>
            </section>

            <div className="z-30 relative">
                <SignInForm />
            </div>

            <div className='absolute bottom-0'>
                <img src={catsDogs} alt="" className='z-10' />
            </div>

            <div className='absolute bottom-0 right-0'>
                <img src={dogImg} alt="" className='z-20' />
            </div>
        </div>

    )
}

export default Login