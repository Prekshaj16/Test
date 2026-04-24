import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.accessToken) {
                    localStorage.setItem("isAuth", "true");
                    localStorage.setItem("user", JSON.stringify(data)); 
                    navigate("/dashboard");

                } else {
                    alert("Invalid credentials");
                }
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">

            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">

                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    Welcome back
                </h2>
                <p className="text-center text-gray-500 text-sm mb-8">Login in to continue</p>

                <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-3  text-[16px]border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-3 border text-[16px] border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="mt-1 bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-700 active:bg-gray-900 transition duration-200 font-semibold tracking-wide text-sm"
                    >
                        Sign in
                    </button>

                </div>

            </div>

        </div>
    );

}

export default Login;