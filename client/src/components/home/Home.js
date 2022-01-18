import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useState, useEffect } from "react";
import Navbarsw from "../Navbarsw";
import RoomList from "./RoomList";
import io from 'socket.io-client';
import Welcomecon from "./Welcomecon";
let socket;

const Home = () => {

    const ENDPT = 'localhost:5000';
    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT])

    const { user, setUser } = useContext(UserContext);



    const [room, setroom] = useState("");
    const [rooms, setrooms] = useState([]);
    const submithandeler = (e) => {
        e.preventDefault();
        socket.emit('create-room', room)
        console.log(room);
        setroom("");
    }
    useEffect(() => {
        socket.on('room-created', room => {
            setrooms([...rooms, room])
        })
        
        
        // // console.log(rooms);
        // console.log("heelo");

    }, [rooms])

    useEffect(() => {
        socket.on('output-rooms', rooms => {
            setrooms(rooms);
        })

    }, [])
    return (
        <div>


            < Navbarsw user={user} />





            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome {user ? user.name : ""}</span>

                            <Welcomecon user={user} submithandeler={submithandeler} room={room} setroom={setroom}/>


                        </div>
                    </div>

                </div>

                <div className="col s6 m5 offset-1">
                    <RoomList rooms={rooms} user={user} setrooms={setrooms}/>
                </div>

            </div>
        </div>
    )
}

export default Home
