
import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'

import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleLogin({email,password})
            navigate('/')
        } catch (err) {
            console.error("Login failed:", err)
        }
    }

    if(loading){
        return (<main className="flex min-h-screen items-center justify-center">
    <h1 className="text-2xl font-bold">Loading...</h1>
</main>)
    }


    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
            Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Email
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
                Login
            </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
                to="/register"
                className="font-medium text-blue-600 hover:underline"
            >
                Register
            </Link>
        </p>
    </div>
</main>
       
    )
}

export default Login