import React from 'react'
import SignInForm from "./SignIn";
import catsDogs from "../../assets/Rectangle 3.png";
import dogImg from "../../assets/Ellipse 1.png";
import "./test.css";

const Login = ({ setToken }: { setToken: (token: string) => void }) => {
    return (
        <div className="w-full h-screen overflow-hidden relative" style={{ background: "#FFDF9E" }}>
            <section className='mt-[300px] ml-[100px]'>
                <h1 className='font-bold text-6xl uppercase'>Your Pet</h1>
            </section>

            <div className="z-30 relative">
                <SignInForm setToken={setToken} />
            </div>

            <div className='absolute bottom-0'>
                <img src={catsDogs} alt="Cats and Dogs" className='z-10' />
            </div>

            <div className='absolute bottom-0 right-0'>
                <img src={dogImg} alt="Dog" className='z-20' />
            </div>
        </div>
    )
}

export default Login;
