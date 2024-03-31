import { useDispatch } from 'react-redux'
import {setNotify} from "../redux/slices/notifySlice";
import {AxiosError} from "axios";
import {useState} from "react";
import { useNavigate } from 'react-router-dom'
import { login } from '../services/apiServices'

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [handle, setHandle] = useState("admin")
    const [password, setPassword] = useState("motherfucker")

    const onSubmit = async () => {

        if (!handle || !password) {
            dispatch(setNotify({code: 400, message: "Missing parameters!"}))
            return
        }

        try {
            await login(handle, password)
        } catch (err) {
            if (err && err instanceof AxiosError) {
                dispatch(setNotify({ code: 400, message: err.response?.data.message || "Connection error!" }))
            }
            else if (err && err instanceof Error) {
                dispatch(setNotify({ code: 400, message: err.message }))
            }
            console.log("Error: ", err);
        }
    };

    return <div>
        <h1>Login Page</h1>
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
        }}>
            <input type="text" value={handle} placeholder="Enter handle" onChange={(e) => {
                setHandle(e.target.value)
            }}/>
            <input type="password" value={password} placeholder="Enter password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <button type="submit">Login</button>
        </form>
    </div>
}

export default LoginPage
