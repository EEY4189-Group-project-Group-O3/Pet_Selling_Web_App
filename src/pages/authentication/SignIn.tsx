import { useState } from "react";
import { axios_instance } from "../../connection/client";
import { useUserContext } from "../../context/useUserContext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const SignIn = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const response = await axios_instance.post("user/token/", {
        username: username,
        password: password,
      });

      const token = response.data.access;

      // Set token in localStorage
      localStorage.setItem("token", token);

      // Update user context
      setUser({
        access_token: token,
      });

      try {
        const profileResponse = await axios_instance.get("user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.setItem("user", JSON.stringify(profileResponse.data));
        window.dispatchEvent(new Event("authChange"));
        navigate("/");
      } catch (profileError) {
        console.error("Failed to get user profile", profileError);
        setError("Could not fetch user profile");
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response?.data?.detail ||
          "Login failed. Please check your credentials."
      );
      console.error("Login failed", error);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 w-[400px] ml-[100px] mt-5  rounded-md z-30 relative p-6 border border-gray-200 shadow-lg">
      <h2 className="text-white font-bold text-4xl mb-2">Sign In</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
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
            required
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
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            className="login-btn flex justify-center items-center gap-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}{" "}
            {loading && <Spinner color="teal.500" />}
          </button>
        </div>
      </form>

      <div className="mt-2 text-white">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-[#ebb961] cursor-pointer">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default SignIn;
