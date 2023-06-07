import AuthContext from './AuthContext';
import { useState } from "react";


const AuthState = (props) => {
    const host = "http://localhost:5000"
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [role, setRole] = useState(null)

    const login = async (email, password) => {
        const response = await fetch(`${host}/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const responseData = await response.json();

        if (responseData.statusCode === 200) {
            localStorage.setItem('cmb_token', responseData.data.token)
            localStorage.setItem('role', responseData.data.role)
        }

        setToken(responseData.data.token)
        setisLoggedIn(true)
        setRole(responseData.data.role)
    }

    const logout = async () => {

        // const response = await fetch(`${host}/v1/auth/login`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        // const responseData = await response.json();

        // if (responseData.statusCode === 200) {
        //     localStorage.setItem('cmb_token', responseData.data.token)
        // }
        localStorage.clear()
        setToken("")
        setisLoggedIn(false)
        setRole("")
    }

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, token, role }}>
            {props.children}
        </AuthContext.Provider>
    )
}



export default AuthState;