import React from "react";
function SignInForm() {


    return (
        <div className="bg-black bg-opacity-50 w-[400px] ml-[100px] mt-5 h-[500px] rounded-md z-30 relative p-6 border border-gray-200 shadow-lg">
            <h2 className="text-black text-4xl mb-6">Sign In</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-black text-sm mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-black text-sm mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none"
                        placeholder="Enter your password"
                    />
                </div>
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                    Login
                </button>
            </form>

            <div className="flex flex-col mt-6 space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md">
                    Login with Facebook
                </button>
                <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                    Login with Google
                </button>
            </div>
        </div>

    );
}

export default SignInForm;
