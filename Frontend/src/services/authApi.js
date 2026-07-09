import api from "./axios"

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function register({ name, email, password }) {
    try {
        const response = await api.post('/auth/register', {
            name, email, password
        })
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
        }
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/auth/login", {
            email, password
        })
        if (response.data.token) {
            localStorage.setItem("token", response.data.token)
        }
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export async function logout() {
    try {
        const response = await api.post("/auth/logout")
        localStorage.removeItem("token")
        return response.data
    } catch (err) {
        localStorage.removeItem("token")
    }
}

export async function getMe() {
    try {
        const response = await api.get("/auth/profile")
        return response.data
    } catch (err) {
        console.log(err)
        throw err;
    }
}