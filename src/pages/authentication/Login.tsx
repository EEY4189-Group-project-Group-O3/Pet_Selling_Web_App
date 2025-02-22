import SignInForm from "./SignIn";
import catsDogs from "../../assets/Rectangle 3.png";
import dogImg from "../../assets/Ellipse 1.png";
import "./test.css";
// import { useEffect } from "react";
// import { useUserContext } from "../../context/useUserContext";

//TODO - Implement the useUserContext hook to redirect the user to the home page if they are already logged in
const Login = () => {
    // const user = useUserContext();
    // useEffect(() => {

    //     if (user) {
    //         window.location.href = "/"
    //     }

    // }, []);
    return (
        <div className="w-full h-screen overflow-hidden relative" style={{ background: "#FFDF9E" }}>
            <section className='mt-[300px] ml-[100px] relative z-30'>
                <h1 className='font-bold text-6xl uppercase'>Your Pet</h1>
            </section>

            <div className="z-30 relative">
                <SignInForm />
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
