import { useDispatch } from 'react-redux'
import {setNotify} from "../redux/slices/notifySlice";
import {AxiosError} from "axios";
import {useState} from "react";
import { useNavigate } from 'react-router-dom'
import { createAccount } from '../services/apiServices'

const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [handle, setHandle] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const onSubmit = async () => {

        if (!handle || !password) {
            dispatch(setNotify({code: 400, message: "Missing parameters!"}))
            return
        } else if (password !== confirmPassword) {
            dispatch(setNotify({code: 400, message: "Passwords do not match!"}))
            return
        }

        try {
            await createAccount(handle, password)
            navigate('..')
        } catch (err) {
            if (err && err instanceof AxiosError) {
                dispatch(setNotify({ code: 400, message: err.response?.data.message }))
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
            }} />
            <input type="password" value={password} placeholder="Enter password" onChange={(e) => {
                setPassword(e.target.value)
            }} />
            <input type="password" value={confirmPassword} placeholder="Confirm password!" onChange={(e) => {
                setConfirmPassword(e.target.value)
            }} />
            <button type="submit">Login</button>
        </form>
    </div>
}

export default RegisterPage
