import { useEffect, useState } from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {

    const navigate = useNavigate();
    const { workouts, dispatch} = useWorkoutsContext()
    const [cookies, removeCookie] = useCookies([])
    const [username, setUsername] = useState("")

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') //since react does not recognize this locally, it proxies it to localhost:4000
            const json = await response.json() //array of workout objects

            if(response.ok) { //dont do if there is some error with the response
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }

        }

        const verifyCookie = async () => {
            if(!cookies.token) {
                navigate("/login")
            }
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                { withCredentials: true}
            )

            const { status, user } = data 
            
            setUsername(user)
            console.log(username)

            if(!status) {
                removeCookie("token")
                navigate("/login")
            }
        }

        fetchWorkouts()
        verifyCookie()
    }, [dispatch, username, cookies, navigate, removeCookie]) //empty dependecncy array makes it first once on first render (2nd arg)


    return (
        <div className="home">
            <div className="workouts">
            <h4>
          Displaying workouts for <span>{username}</span>
        </h4>
                {workouts && workouts.map((workout) => (
                   // <p key={workout._id /*bc must be unique*/}>workout.title</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                )) }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home