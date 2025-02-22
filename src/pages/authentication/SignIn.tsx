import { axios_instance } from "../../connection/client";
import { useUserContext } from "../../context/useUserContext";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const { setUser } = useUserContext();
    const navigate = useNavigate();



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await axios_instance.post('user/token/', {
                username: username,
                password: password
            });

            const token = response.data.access;
            localStorage.setItem("token", token);
            setUser({
                access_token: token,
            })

            axios_instance.get('user/profile',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate("/")

            }).catch((error) => {
                console.error("Failed to get user profile", error)
            })
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="bg-black bg-opacity-50 w-[400px] ml-[100px] mt-5 h-[500px] rounded-md z-30 relative p-6 border border-gray-200 shadow-lg">
            <h2 className="text-white font-bold text-4xl mb-2">Sign In</h2>
            <form onSubmit={handleSubmit} className="text-black ">
                <div className="mb-4">
                    <label className="block text-white text-sm mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex justify-center">

                    <button className="login-btn" type="submit">
                        Login
                    </button>
                </div>
            </form>

            <div className="mt-2 text-white">
                Don't have an account? <a href="/sign-up" className="text-[#ebb961] cursor-pointer" >Sign Up</a>
            </div>
            {/* onClick={() => navigate('sign-up')} */}

            <div className="flex flex-col mt-6 space-y-4">
                {/* <button className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md">
                    Login with Facebook
                </button>
                <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Login with Google
                </button> */}
            </div>
        </div>
    );
};

export default SignIn;
