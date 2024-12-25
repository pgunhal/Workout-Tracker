import React, {useState} from "react"
import {Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

const Login = () => {

    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })

    const { email, password } = inputValue
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue, 
            [name]: value,
        })
    }

    const handleError = (err) =>
        toast.error(err, {
            position: "bottom-left"
        })

    const handleSuccess = (msg) =>
        toast.success(msg, {
            position: "bottom-right"
        })
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                {
                    ...inputValue,
                },
                { withCredentials: true}
            )

            console.log(data)

            const { success, message } = data
            if(success) {
                handleSuccess(message)
                setTimeout(() => {
                    navigate("/home")
                }, 1000)
            } else {
                handleError(message)
            }
        } catch (err) {
            console.log(err)
        }

        setInputValue({
            ...inputValue,
            email: "",
            password: "",
        })
    }

    return (
        <div className="form_container">
            <h2>Login Account</h2>
            <form onSubmit={handleSubmit}>
                <div>          
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={handleOnChange}
                    />
                </div>
                <div>          
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
                    New user? <Link to={"/signup"}>Sign up</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login