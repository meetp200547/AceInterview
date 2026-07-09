import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { login, register, logout, getMe } from "../services/authApi";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data.user)
            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ name, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ name, email, password })
            setUser(data.user)
            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])

    return { user, loading, handleRegister, handleLogin, handleLogout }
}