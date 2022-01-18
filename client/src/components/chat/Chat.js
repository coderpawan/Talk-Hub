import { useContext, useState,useEffect } from "react";
import { UserContext } from "../../UserContext";
import { useParams } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Messages from "./messages/Messages";
import Input from './input/Input'
import './input/input.css';
import './chat.css'
import Navbar from '../Navbarsw'
let socket;

const Chat = () => {
    const ENDPT = 'localhost:5000';
    const { user, setUser } = useContext(UserContext)

    const { room_id, room_name } = useParams();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    

   useEffect(() => {
        socket = io(ENDPT);
        socket.emit('join', ({name:user.name,room_id, user_id: user._id }))
        // console.log(room_id,room_name);
    }, [])

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]);
        })
    }, [messages])

    useEffect(() => {
        socket.emit('get-messages-history', room_id)
        socket.on('output-messages', messages => {
            setMessages(messages)
        })
    }, [])

    

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            console.log(message);
            socket.emit('sendMessage', message, room_id,user, () => {
                setMessage('');
            });
        }


    }
    


    return (
        <div>
            <Navbar user={user}/>
        
        <div className="outerContainer">
            <div className="container">
            <Messages messages={messages} user_id={user._id}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} room_id={room_id} user={user} setMessages={setMessages}/>
            </div>
         
        </div>
        </div>
    )
}

export default Chat
