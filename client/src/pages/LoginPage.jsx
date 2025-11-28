import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import backgroundImage from '../../assets/images/nuts.webp';
import { useState } from 'react';
// import CustomFetch from '../../utils/CustomFetch';

export default function LoginPage() {
    const navigation = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await CustomFetch.post('/auth/login', form);
            alert("Login Successful");
            navigation('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* <Helmet>
                <title>Login - E-MART</title>
            </Helmet> */}

            <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center p-4 relative">
                {/* <div className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${backgroundImage})` }}></div> */}

                <div className="w-full max-w-md relative z-10">
                    <div className="text-center mb-8">
                        <svg className="inline-block w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <h1 className="text-3xl font-bold mt-2 text-blue-800">E-MART</h1>
                        <p className="text-blue-700 mt-1">Shop Smart. Shop Fast.</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-800">Welcome Back!</h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-blue-800">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="you@email.com"
                                            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                            onChange={handleChange}
                                        />
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-blue-800">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                                            onChange={handleChange}
                                        />
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                    </div>
                                </div>

                                <button type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                                    Sign In
                                </button>
                            </form>
                        </div>

                        <div className="px-8 py-4 bg-blue-100 text-center">
                            <p className="text-sm text-blue-800">
                                New to E-MART?
                                <Link to="/register" className="ml-1 font-semibold text-blue-600 hover:underline">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-blue-800">Exclusive Deals Await</p>
                        <div className="flex justify-center mt-2 space-x-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-3 h-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="fixed bottom-4 left-4 right-4 flex justify-between text-blue-800">
                    <Link to="/" className="hover:text-blue-600">
                        ⬅ Home
                    </Link>
                    <Link to="/shop" className="hover:text-blue-600">
                        Shop Now ➜
                    </Link>
                </div>
            </div>
        </>
    );
}
