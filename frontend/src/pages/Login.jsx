import React, {useState} from "react"
import {Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
// import { useCookies } from "react-cookie";


const Login = () => {

    // const [cookies, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
  
    // useEffect(() => {
    //   // Only clear stale token on the initial render
    //   if (cookies.token === undefined || cookies.token === "undefined") {
    //     console.log("Clearing stale undefined token...");
    //     removeCookie("token", {   httpOnly: true,       
    //         // sameSite: "none",      
    //         // secure: false,         
    //         path: "/", });
    //   }
    // }, [cookies, removeCookie]);

    // console.log("Cookies after at /tempting to remove ON FRONTEND:", cookies);

  
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
                "https://workout-tracker-px08.onrender.com/login",
                {
                    ...inputValue,
                },
                { withCredentials: true}
            )

            console.log(data)

            const { success, message } = data
            if(success) {
                // console.log("SUCESS")
                // console.log("Cookies after attempting to remove FROM BACKEND:", cookies);
                handleSuccess(message)

                // console.log("GOING TO HOME")
                navigate("/home")
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